from src.w_class import Window
from src.status_data import check_status, get_status_color
import socketio
from winpty import PtyProcess
import os
from time import sleep, time
import signal
import re

## Signal handlers for sigint catch

#def delete_files():
#    """ Delete on CTRL-c """
#    os.remove('output')
#    os.remove('done')
#    exit(1)
#
#signal.signal(signal.SIGINT, handler=delete_files)

## Server Services

def spawn_shell():
    """ Spawn new shell """
    return PtyProcess.spawn('powershell.exe')

def check_sudo(cmd : str) -> str:
    """ Check sudo """
    return cmd.replace("echo $passwordForArgos | sudo -kS -p '' ", "")

def replacing_data_get(cmd : str) -> str:
    """ Replacing linux formated string into windows """
    subexp = cmd.replace('bash -c \"if [ $(($(stat -c%s ', 'If ((Get-Item ').replace(') <= 1000000)) -eq 1 ]; then cat ', ').Length -le 10000) {cat ').replace('; else echo \'File is too big\'; fi\"', '} else {echo \'file too big!\'}')
    return f'$({subexp})' if cmd != subexp else cmd

def replacing_data_set(cmd : str) -> str:
    """ Repalcing linux command for file modification """
    print(cmd)
    result = re.findall('/^bash -c \"echo \\\"\b(.+)\b\\\" > (.+)"/gm', cmd.replace('\r\n', '$[end]$').replace('\n', '$[end]$'))
    if result is not None:
        print(result)
    #return cmd.replace('bash -c \"', '$(')[0:-1]+')' if cmd.startswith('bash -c \"echo') else cmd
    return cmd

def execute_cmd(cmd : str, window_manager : Window):
    """ Execute a command sent by the remote server """
    timeout : False | True = False

    window_manager.logs.info("Command received : " + cmd)
    if "stop" == cmd:
        window_manager.logs.warning("Child process stopped : " + str(window_manager.ps.pid))
        window_manager.ps = spawn_shell()
        window_manager.logs.warning("New Child process created : " + str(window_manager.ps.pid))
        return "stopped"

    if ("timeout 10s" in cmd):
        timeout = True
        cmd = cmd.replace("timeout 10s", "")

    cmd = cmd.replace("shutdown -h now", "shutdown /s")

    # Script is already launched as admin
    cmd = check_sudo(cmd)

    cmd = replacing_data_get(cmd=cmd)

    cmd = replacing_data_set(cmd=cmd)

    cmd = cmd.replace("bash -c \"file *\"", f'python3 {window_manager.program_start_asp}/src/file.py ./')

    open(f'{window_manager.program_start_asp}/done', 'w', encoding='utf-8', errors='ignore').write('')
    open(f'{window_manager.program_start_asp}/output', 'w', encoding='utf-8', errors='ignore').write('')
    window_manager.logs.info(f'Current pwd : {os.getcwd()}')

    if timeout:
        timer_start = time()

    window_manager.logs.info(f'Command to be executed : {cmd}')

    #window_manager.ps.write(f'{cmd} 2>&1 > {window_manager.program_start_asp}/output; echo "done" > {window_manager.program_start_asp}/done\r\n')
    window_manager.ps.write(f'{cmd} *>&1 | Out-File -Encoding utf8 {window_manager.program_start_asp}/output; echo "done" > {window_manager.program_start_asp}/done\r\n')
    
    timed_out = False
    while 1:
        if os.stat(f'{window_manager.program_start_asp}/done').st_size == 14:
            break
        if timeout and time() - timer_start > 10:
            timed_out = True
            break

    if timed_out:
        return "Timed out after 10 seconds"

    window_manager.logs.success("Command finilized")
    result = open(f'{window_manager.program_start_asp}/output', 'r', encoding='utf-8', errors='ignore').read()
    window_manager.logs.info("Received data : " + str(result).replace(' ', '')[0:15] + "...")
    return result

## Socket server function

def socket_server(window_manager : Window):
    """ Socket server start function """
    proc = spawn_shell()
    window_manager.add_element(name="ps", element=proc)

    window_manager.logs.success("Starting socket server...")

    window_manager.add_element(os.getcwd(), "program_start_asp")

    sio = socketio.Client()

    ## Events

    @sio.event
    def connect():
        """ Connect to the server """
        window_manager.status = True

        window_manager.status_text.config(
            text=check_status(window_manager.status),
            fg=get_status_color(window_manager.status)
        )

        sio.emit("name", {"name" : os.popen("whoami").read()})
        window_manager.logs.success("Successfully connected to server. Waiting for instructions...")

    @sio.event
    def connect_error():
        window_manager.logs.error("Connection failed to : " + str(window_manager.url))

    @sio.event
    def message(data):
        window_manager.logs.info("(Received a message) : " + data[data["type"]])
        if (data["type"] == "msg"):
            print(data["msg"])
        elif (data["type"] == "command"):
            sio.emit("command_output", execute_cmd(data["command"], window_manager=window_manager))

    @sio.event
    def disconnect():
        """ On disconnection """
        window_manager.status = False
        window_manager.status_text.config(
            text=check_status(window_manager.status),
            fg=get_status_color(window_manager.status)
        )
        window_manager.logs.error("Server lost. Trying to reconnect...")

    while (not(sio.connected)):
        try:
            sio.connect(window_manager.url)
        except:
            window_manager.logs.warning("Server : " + window_manager.url.replace("\n", "") + " can't be reached. Trying to connect...")
        sleep(3)
