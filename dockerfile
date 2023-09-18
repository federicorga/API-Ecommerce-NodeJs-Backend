
FROM node:16-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080


CMD ["node", "src/app.js"]

