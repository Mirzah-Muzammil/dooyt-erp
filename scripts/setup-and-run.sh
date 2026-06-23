#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Dooyt ERP setup starting..."

if [ ! -f ".env" ]; then
  cat > .env <<'ENV'
DATABASE_URL="file:./dev.db"
API_KEY="dooyt-demo-key-2026"
ENV
  echo "Created .env with local SQLite and API key defaults."
else
  echo ".env already exists; leaving it unchanged."
fi

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Syncing SQLite database schema..."
npx prisma db push

echo "Seeding database from docs/seed/seed.json..."
npx tsx prisma/seed.ts

echo "Starting development server..."
npm run dev
