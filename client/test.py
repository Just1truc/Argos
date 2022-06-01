from asyncio import subprocess
import pty
import os
from sys import stdin
from time import sleep
import signal

pid, fd = pty.fork()

#def read_callback(fd):
#    data = bytes(os.popen("cat /tmp/output").read(), encoding="utf-8") # <-- this doesn't block
#
#    #data = os.read(fd, 1024)
#
#    #data = open("/proc/" + str(os.getpid()) + "/fd/1", "r").read()
#    #os.system("echo '" + data.decode("utf-8") + "' > /proc/" + os.getppid() + "/fd/" + str(fd))
#    #buffer = open("/proc/" + os.getppid() + "/fd/0", "w")
#    #buffer.write("bite")
#    #buffer.close()
#
#    #open("/proc/" + str(os.getppid()) + "/fd/0", "w").write(data.decode("utf-8"))
#
#    #os.write("/proc/" + os.getppid() + "/fd/0", b"biteee")
#    return data
#

def sHaND(yes, oui):
    return 0

if (pid == 0):
    os.system("touch /tmp/patate.sh && chmod 777 /tmp/patate.sh")
    buffer = open("/tmp/patate.sh", "w")
    # Redirect output in stdout.
    buffer.write("#!/bin/bash\n/bin/sh &> /tmp/output")
    buffer.close()
    #pty.spawn("/tmp/patate.sh", read_callback)
    pty.spawn("/tmp/patate.sh")
else:
    while (1):
        os.system("echo '' > /tmp/output")
        entry = input("input?> ")
        signal.signal(signal.SIGALRM, sHaND)
        os.write(fd, bytes(entry + " && kill -ALRM " + str(os.getpid()) + "\n", encoding="utf-8"))
        signal.pause()
        command = os.popen("cat /tmp/output").read()
        print(command)
#else:
#    while (1):
#        inputs = input("$ ")
#        os.write(fd, bytes(inputs + "\n", "utf-8"))
#        sleep(0.1)
#        length = 15
#        while (length != 800):
#            string = os.read(fd, 1024)
#            print('bite')
#            print(string.decode("utf-8"))
#            length = len(string.decode("utf-8"))
#            print(length)
