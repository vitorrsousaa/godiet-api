#!/usr/bin/env bash
# scripts/run-integration.sh

# Carrega as variáveis de ambiente do arquivo .env
source .env.prod

DIR="$(cd "$(dirname "$0")" && pwd)"

echo '🟡 - Updating branch...'
git checkout main

git pull origin main

echo '🟡 - Merging changes from origin/develop...'

git merge origin/develop

echo '🟢 - Merged with develop branch'

echo '🟡 - Pushing modifications for remote branch...'

git push origin main

echo '🟢 - Application published with successfull'

echo '🟡 - Running migrations...'

dotenv -e .env.prod -- npx prisma migrate deploy

echo '🟢 - Migrations are ready'

echo '🟡 - Starting deployment...'

npm run deploy:prod

echo '🟡 - Updating develop branch...'

git checkout develop
git merge main

echo '🟢 - Deployment finished'
