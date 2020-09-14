FROM node:12.18.2

WORKDIR /
COPY . .

RUN npm install
CMD npm run build
EXPOSE 80