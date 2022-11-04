

FROM node:18.8-alpine  as builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY ./src ./src

RUN npm i -g prisma;
RUN npm i ;
RUN npm i -D tsconfig-paths
RUN node -r ts-node/register/transpile-only -r tsconfig-paths/register
RUN npx prisma generate

RUN npx tsc

FROM node:18.8-alpine

ENV NODE_ENV production
LABEL fly_launch_runtime="nodejs"
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]
