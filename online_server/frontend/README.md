# Frontend

## Setting up

Put the link to the **backend server** in the **.env** file this way :
```bash
REACT_APP_API_URL=https://www.example.com
```

There is two way to use the React app :
- [docker](#Docker)
- [npm](#npm)

#### ``Docker``

First, build the app:
```bash
docker build -t argos_frontend .
```

Then you can run it if needed:
```bash
docker run -dp 3000:3000 argos_frontend
```

#### ``npm``

Install dependencies:
```
npm install
```
Run the app:
```
npm run start
```

