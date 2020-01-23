FROM nginx:stable
MAINTAINER Bayu Aji  "aji@alterra.id"

RUN mkdir -p /teesignr/react
RUN mkdir -p /teesignr/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /teesignr/react

WORKDIR /teesignr/react