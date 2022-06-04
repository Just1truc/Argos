# Backend

## Setting up

First thing first, you need to protect your server by changing the variables in the **.env** file:
```bash
PORT=3000
PASSWORD=Your new password
USERNAME=Your new username
SECRET=Randomly generated list of characters
```

To use the app, you have 2 possibilities :
- [**Docker**](#docker)
- [**Npm**](#npm)

#### ``Docker``

To build the app :
```bash
docker build -t argos_backend .
```

To run the app :
```bash
docker run -dp 3000:3000 argos_backend
```

#### ``npm``

To install the dependencies:
```bash
npm install
```

To run the app:
```bash
npm run start
```

