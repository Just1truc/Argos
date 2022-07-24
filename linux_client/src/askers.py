
from src.log_service import logService
import os
from getpass import getpass
import validators

########################
# IHM functions
# [Version] : linux
# 20/07/2022
########################

log_service = logService()

def checkSudoPassword(password):
    return int(os.popen(f'echo "{password}" | sudo -Sk echo " " &> /dev/null; echo $?').read())

def getSudoPassword():
    log_service.info("Argos need the password of the user to work.")
    log_service.warning("The password will not be keeped after the program stop running")
    while 1:
        password = getpass(log_service.ask_prompt("Please enter your sudo password :"))
        if (checkSudoPassword(password) == 0):
            return password
        else:
            log_service.error("Password is incorrect")
            log_service.reset_colors()

def getUrl():
    global SERVER_URL
    log_service.info("Argos need the url of the backend server to know where to connect")
    while 1:
        SERVER_URL = str(input(log_service.ask_prompt("Please enter the server url :")))
        if (validators.url(SERVER_URL) != True):
            log_service.error("This url is invalid. Please try another one")
        else:
            return SERVER_URL

def protectionCheck():
    log_service.warning(f'Argos will give total access to you computer to the person possesing the server at the url : {SERVER_URL}.')
    log_service.warning(f'The commands that are run could badly damage your computer.')
    consent = input(log_service.yesorno_prompt(f'Do you accept to give total access ?') + ' (Default : yes) ')
    if not(consent == "yes" or consent == "yes" or consent == ""):
        log_service.error("Exiting...")
        exit(1)
    else:
        return
