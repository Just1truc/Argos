
from src.logService import logService
import os
from getpass import getpass
import validators

########################
# IHM functions
# [Version] : linux
# 20/07/2022
########################

logService = logService()

def checkSudoPassword(password):
    return int(os.popen(f'echo "{password}" | sudo -Sk echo " " &> /dev/null; echo $?').read())

def getSudoPassword():
    logService.info("Argos need the password of the user to work.")
    logService.warning("The password will not be keeped after the program stop running")
    while 1:
        password = getpass(logService.ask_prompt("Please enter your sudo password :"))
        if (checkSudoPassword(password) == 0):
            return password
        else:
            logService.error("Password is incorrect")
            logService.reset_colors()

def getUrl():
    global SERVER_URL
    logService.info("Argos need the url of the backend server to know where to connect")
    while 1:
        SERVER_URL = str(input(logService.ask_prompt("Please enter the server url :")))
        if (validators.url(SERVER_URL) != True):
            logService.error("This url is invalid. Please try another one")
        else:
            return SERVER_URL

def protectionCheck():
    logService.warning(f'Argos will give total access to you computer to the person possesing the server at the url : {SERVER_URL}.')
    logService.warning(f'The commands that are run could badly damage your computer.')
    consent = input(logService.yesorno_prompt(f'Do you accept to give total access ?') + ' (Default : yes) ')
    if not(consent == "yes" or consent == "yes" or consent == ""):
        logService.error("Exiting...")
        exit(1)
    else:
        return
