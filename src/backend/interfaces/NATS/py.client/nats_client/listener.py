# -*- coding: utf-8 -*-
"""Tornado process to subcribe to a nats broker for raw message delivery."""

from __future__ import absolute_import, print_function, unicode_literals

import argparse
import sys

import tornado.ioloop
import tornado.gen
from nats.io.client import Client as NATS

from caliopen_storage.config import Configuration
from caliopen_storage.helpers.connection import connect_storage


def show_usage():
    print("nats-sub SUBJECT [-s SERVER] [-q QUEUE]")


def show_usage_and_die():
    show_usage()
    sys.exit(1)


@tornado.gen.coroutine
def main():
    # Create client and connect to server
    nc = NATS()
    server = Configuration('global').get('nats.host')
    port = Configuration('global').get('nats.port', 4222)
    servers = ['{}:{}'.format(server, port)]

    opts = {"servers": servers}
    yield nc.connect(**opts)

    # create and register subscriber(s)
    inbound_email_sub = subscribers.InboundEmail()
    future = nc.subscribe("inboundSMTP", "",
                          inbound_email_sub.handler)
    future.result()


if __name__ == '__main__':
    # load Caliopen config
    args = sys.argv
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', dest='conffile')
    kwargs = parser.parse_args(args[1:])
    kwargs = vars(kwargs)
    Configuration.load(kwargs['conffile'], 'global')
    # need to load config before importing subscribers
    import subscribers

    connect_storage()
    main()
    tornado.ioloop.IOLoop.instance().start()
