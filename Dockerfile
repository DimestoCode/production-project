FROM node:18-alpine

WORKDIR /docker-app

COPY package*.json .

COPY . .

RUN npm ci

EXPOSE 3000
EXPOSE 8000

CMD ["npm", "run", "start:dev"]