FROM node:18-alpine

WORKDIR ./

COPY package*.json ./

COPY .env ./.env

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run","siuu3"]
