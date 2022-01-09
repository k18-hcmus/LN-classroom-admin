FROM node:14-alpine
WORKDIR /app

COPY ./ ./

RUN npm i yarn
RUN yarn install
RUN yarn build

CMD [ "npx", "serve", "-s", "build" ]

EXPOSE 5000