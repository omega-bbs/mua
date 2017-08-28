FROM node:8.4

COPY . /app
WORKDIR /app

RUN ["/app/docker/run.sh"]

ENTRYPOINT ["/app/docker/entrypoint.sh"]
EXPOSE 80
