#!/usr/bin/env bash

cat /etc/nginx/sites-available/default > /etc/nginx/sites-available/default.bak
envsubst '$URL' < /etc/nginx/sites-available/default.bak > /etc/nginx/sites-available/default
exec nginx -g 'daemon off;'