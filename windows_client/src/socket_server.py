from src.w_class import Window
from src.status_data import check_status, get_status_color
import socketio
from winpty import PtyProcess
import os
from time import sleep, time
import signal

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

    open(f'{window_manager.program_start_asp}/done', 'w', encoding='utf-8', errors='ignore').write('')
    open(f'{window_manager.program_start_asp}/output', 'w', encoding='utf-8', errors='ignore').write('')
    window_manager.logs.info(f'Current pwd : {os.getcwd()}')

    if timeout:
        timer_start = time()

    window_manager.logs.info(f'Command to be executed : {cmd}')

    window_manager.ps.write(f'{cmd} 2>&1 > {window_manager.program_start_asp}/output; echo "done" > {window_manager.program_start_asp}/done\r\n')

    while 1:
        if os.stat(f'{window_manager.program_start_asp}/done').st_size == 14:
            break
        if timeout and time() - timer_start > 10:
            break

    window_manager.logs.success("Command finilized")
    result = open(f'{window_manager.program_start_asp}/output', 'r', encoding='utf-8', errors='ignore').read()
    window_manager.logs.info("Received data : " + result.replace(' ', '')[0:15] + "...")
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
