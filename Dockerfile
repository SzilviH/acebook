FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5000

USER node

CMD [ "npm", "start" ]
# or heroku local?
