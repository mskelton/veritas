#!/bin/bash

docker compose --profile test down
docker compose --profile test up -d

sleep 1
pnpm db:push
pnpm db:seed
