FROM node:latest

WORKDIR /server

# Install dependencies
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Environment variables
ENV PORT 3000

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]