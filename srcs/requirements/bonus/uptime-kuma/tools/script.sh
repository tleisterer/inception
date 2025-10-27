#!/usr/bin/env bash
npm run setup
exec node server/server.js --host=0.0.0.0 --port=3000