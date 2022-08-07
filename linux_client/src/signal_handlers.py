
#############################
# Signal handling functions
# [Version] : Linux
# 20/07/2022
#############################

from src.logService import logService
import signal
import os

logService = logService()

def command_end(yes, oui):
    global var
    var = "ok"

def exiting(sig, frame):
    logService.reset_colors()
    print("\n[Argos] Exiting...")
    os.kill(os.getpid(), signal.SIGTERM)