

FROM node:18.8-alpine  as builder

WORKDIR /app
COPY package*.json ./
COPY prisma .
COPY tsconfig.json ./
COPY ./src ./src
COPY ./.env.prod .
ENV $(cat .env.prod | xargs)


RUN npm i -g prisma;

RUN npm install ;
RUN npx prisma generate
RUN npm run prev

FROM node:18.8-alpine

ENV NODE_ENV production
LABEL fly_launch_runtime="nodejs"
WORKDIR /app

RUN npm install -g npm@9.4.0

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY ./tsconfig.json .

RUN npm i -g cross-env;


EXPOSE 8000


CMD ["npm", "run", "start"]
