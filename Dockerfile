FROM node:12.18.2

RUN npm install

CMD npm run build

WORKDIR /dist
COPY . .

EXPOSE 80