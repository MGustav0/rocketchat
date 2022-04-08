FROM node:current-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY yarn*.json ./

RUN yarn set version berry
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
