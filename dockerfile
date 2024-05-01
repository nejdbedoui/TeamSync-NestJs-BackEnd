FROM node:18-alpine

WORKDIR ./

COPY package*.json ./

COPY .env ./.env

RUN npm i --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run","siuu3"]
