FROM node:latest as builder
WORKDIR /server
COPY . .
EXPOSE 3000
RUN npm install
RUN ./downloadDependencies
FROM node:latest as launcher
COPY --from=builder /server .
CMD ["npm", "start"]