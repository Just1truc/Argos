
####################
# Argos client
# [Version] : Linux
# 20/07/2022
####################

from time import sleep
import socketio
import os

# Importing packages
from src.logService import logService
from src.askers import *
from src.signal_handlers import *

import pty
import signal

SERVER_URL=""
password=""

logService = logService()

## Cleaning output file of child process

os.system("echo '' > /tmp/.output")

## Create shell instance on fork function

var, pid, fd = None, None, None

def createForkShell():
    global pid, fd
    pid, fd = pty.fork()

    if (pid == 0):
        pty.spawn("/bin/bash")

def sendCommandToFork(entry):
    global var, pid, fd
    
    logService.info("Starting command in process : " + (str(pid)))
    
    if (entry.replace("\n", "") == "stop"):
        os.system("kill -TERM " + str(pid))
        var = "ok"
        createForkShell()
        logService.success("Successfully killed process : " + str(pid))
        return "stop"

    os.system("echo '' > /tmp/.output")

    os.write(fd, bytes(entry.replace("$passwordForArgos", password) + " &> /tmp/.output; echo ''; kill -ALRM " + str(my_pid) + "\n", encoding="utf-8"))
    # Wait for end signal
    while (var == None): continue
    logService.success("Command Executed Successfully")
    var = None
    buffer = open("/tmp/.output", "r", encoding="utf-8", errors="ignore")
    output = buffer.read()
    buffer.close()
    logService.info("Command output [" + output[:50] + "...]")
    return output

# Setting up client web socket connection

sio = socketio.Client()

## Services

def executeCommand(command):
    logService.info("Command received : " + command)
    sio.emit("command_output", sendCommandToFork(command))

## Events

@sio.event
def connect():
    sio.emit("name", {"name" : os.popen("whoami").read()})
    logService.success("Successfully connected to server. Waiting for instructions...")

@sio.event
def connect_error(data):
    logService.error("Connection failed to : " + SERVER_URL)

@sio.event
def message(data):
    logService.info("(Received a message) : " + data[data["type"]])
    if (data["type"] == "msg"):
        print(data["msg"])
    elif (data["type"] == "command"):
        executeCommand(data["command"])

@sio.event
def disconnect():
    logService.error("Server lost. Trying to reconnect...")


if __name__ == '__main__':

    createForkShell()
    password = getSudoPassword()
    SERVER_URL = getUrl()
    protectionCheck()

    var = None

    signal.signal(signal.SIGINT, exiting)

    signal.signal(signal.SIGALRM, command_end)

    my_pid = os.getpid()

    # Starting server
    while (not(sio.connected)):
        try:
            sio.connect(SERVER_URL)
        except:
            logService.warning("Server : " + SERVER_URL.replace("\n", "") + " can't be reached. Trying to connect...")
        sleep(3)
