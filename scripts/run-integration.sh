#!/usr/bin/env bash
# scripts/run-integration.sh

# Carrega as variáveis de ambiente do arquivo .env
source .env

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose up -d database_tests

echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_TEST_URL}" -- echo '🟢 - Database is ready!'

echo '🟡 - Running migrations...'

export DATABASE_URL=$DATABASE_TEST_URL

npx prisma migrate dev --name init

npx prisma generate

echo '🟢 - Migrations are ready...'
if [ "$#" -eq  "0" ]
  then
    npx vitest run --config ./vitest.config.integration.ts
else
    npm vitest run -config ./vitest.config.integration.ts --ui
fi

docker-compose stop database_tests

docker-compose rm -f database_tests
