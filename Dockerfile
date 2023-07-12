# syntax=docker/dockerfile:1

FROM node:16 as build

COPY . /app
WORKDIR /app

RUN npm ci && npx pkg --compress GZip --targets node16-linuxstatic-x64 lib/index.js

FROM gcr.io/distroless/static-debian11:nonroot

ARG name=prometheus-what-active-users-exporter

COPY --from=build --chown=nonroot:nonroot /app/index /bin/prometheus-what-active-users-exporter

CMD [ "/bin/prometheus-what-active-users-exporter" ]