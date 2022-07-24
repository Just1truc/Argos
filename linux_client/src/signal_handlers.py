
#############################
# Signal handling functions
# [Version] : Linux
# 20/07/2022
#############################

from src.log_service import logService
import signal
import os

log_service = logService()

def command_end(yes, oui):
    global var
    var = "ok"

def exiting(sig, frame):
    log_service.reset_colors()
    print("\n[Argos] Exiting...")
    os.kill(os.getpid(), signal.SIGTERM)