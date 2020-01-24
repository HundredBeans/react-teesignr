FROM nginx:stable
MAINTAINER Mohammad Daffa  "daffa@alterra.id"

RUN mkdir -p /teesignr/react
RUN mkdir -p /teesignr/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /teesignr/react

WORKDIR /teesignr/react