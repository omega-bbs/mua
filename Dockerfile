FROM node:8.4 as build

WORKDIR /app

COPY . /app

RUN \
  npm install && \
  NODE_ENV=production npm run build && \
  rm -rf ./node_modules && \
  NODE_ENV=production npm install

FROM node:8.4

WORKDIR /app

COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENTRYPOINT NODE_ENV=production SERVER_PORT=80 npm start
EXPOSE 80
