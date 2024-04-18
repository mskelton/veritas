#!/bin/bash

docker compose --profile test down
docker compose --profile test up
