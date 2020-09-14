FROM node:12.18.2

WORKDIR /
COPY . .

RUN npm install
CMD vue-cli-service build
EXPOSE 80