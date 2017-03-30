FROM debian:jessie

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
postfix \
mailtools

COPY . /etc/postfix/main.cf
COPY . /etc/postfix/master.cf

