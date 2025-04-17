FROM node:23.10.0

WORKDIR /app

COPY . /app/
COPY .env.docker /app/.env

WORKDIR /app/rootquest

RUN npm install

CMD ["sh", "-c", "npm run build && npm run start"]