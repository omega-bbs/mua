FROM node:8.4

COPY . /app
WORKDIR /app

RUN npm install && \
  NODE_ENV=production npm run build && \
#  NODE_ENV=production npm prune
#  npm prune is broken, see https://github.com/npm/npm/issues/17781
  rm -rf node_modules && NODE_ENV=production npm install && \
  chmod +x /app/docker/entrypoint.sh && \
  rm -rf /root/.npm

EXPOSE 80

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["start"]
