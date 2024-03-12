#!/usr/bin/env bash
# scripts/run-integration.sh

# Carrega as variáveis de ambiente do arquivo .env
source .env.prod

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh

echo '🟡 - Updating branch...'
# Muda para a branch main
git checkout main

# Atualiza a branch main com as últimas alterações do repositório remoto
git pull origin main

# Muda de volta para a branch develop (ou a branch que estava antes)
git merge develop

# Faz o merge da develop com a main
git merge main

echo '🟢 - Merge concluded...'

echo '🟡 - Running migrations...'

npx prisma migrate deploy

echo '🟢 - Migrations are ready...'

echo '🟡 - Starting deployment...'

npm run deploy:prod

echo '🟢 - Deployment concluded'
