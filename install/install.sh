#!/bin/sh

cp ./tratelbot.service /etc/systemd/system/tratelbot.service
mkdir /etc/systemd/system/tratelbot.service.d/
cp ./tratelbot.conf /etc/systemd/system/tratelbot.service.d/tratelbot.conf
cp ./tratelbot /usr/local/bin/tratelbot
chown root:root /etc/systemd/system/tratelbot.service /etc/systemd/system/tratelbot.service.d/tratelbot.conf /usr/local/bin/tratelbot


