#import sys, os
#from multiprocessing import Process
#from time import sleep
#
#def asyncr():
#    os.system("powershell.exe")
#
#if __name__ == '__main__':
#    p = Process(target=asyncr)
#    p.start()
#    print(os.getpid())
#    print(p.pid)
#    sleep(1)
#    sys.stdout.write('yes\n')

from winpty import PtyProcess
import os

def spawn_shell():
	return PtyProcess.spawn('powershell.exe')

def execute_cmd(cmd : str):
	global proc
	print(proc.pid)
	if (" stop " in cmd):
		proc = spawn_shell()
		return "stopped"
	os.system('echo "done" > done')
	proc.write('ls > ok\r\necho "done" > done\r\n')
	while 1:
		if os.stat('done').st_size > 0:
			break
	return open('./ok', 'r', encoding='utf-8', errors='ignore').read()

proc = spawn_shell()
execute_cmd("cmd")
