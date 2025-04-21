FROM node:23.10.0

WORKDIR /app

RUN apt-get update && \
    apt-get install -y docker.io && \
    ln -s /usr/bin/docker /usr/local/bin/docker

COPY . /app/
COPY .env.docker /app/.env

WORKDIR /app/rootquest

RUN npm install

CMD ["sh", "-c", "npm run build && npm run start"]