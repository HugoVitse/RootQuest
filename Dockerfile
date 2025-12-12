#on build sur une image et on start sur une autre plus légère
FROM node:20-alpine AS builder

WORKDIR /app

COPY rootquest/package*.json ./

RUN npm install

COPY rootquest/ ./

RUN npm run build


#starter
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/server.ts ./

COPY .env.docker ./.env

EXPOSE 3000

CMD ["npm", "start"]
