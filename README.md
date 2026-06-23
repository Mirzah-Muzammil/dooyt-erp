# Dooyt ERP Landing Page

Full-stack Next.js implementation of the Dooyt ERP landing page assessment. The app includes the marketing landing page, dynamic API-backed content models, pricing, testimonials, FAQs, and a request-a-demo lead form.

## Stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4
- Backend: Next.js Route Handlers under `/api`
- Database: SQLite with Prisma
- Validation: Zod and React Hook Form

Backend stack chosen for the assessment: **Next.js Route Handlers with Prisma + SQLite**.

## Requirements

- Node.js 20+
- npm

## Setup

For a fresh local run, use the setup script:

```bash
npm run setup-and-run
```

This command creates `.env` if needed, installs dependencies, generates the Prisma client, syncs the SQLite schema, seeds the database, and starts the development server.

Manual setup is also available:

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```bash
DATABASE_URL="file:./dev.db"
API_KEY="dooyt-demo-key-2026"
```

Prepare the database and generated Prisma client:

```bash
npx prisma db push
npx prisma generate
npx tsx prisma/seed.ts
```

The seed script loads data from [docs/seed/seed.json](docs/seed/seed.json).

## Run

If setup has already been completed, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build And Check

```bash
npm run lint
npm run build
```

`next/font` fetches Host Grotesk during production builds, so `npm run build` needs network access unless the font has already been cached.

## API

Base path: `/api`

Protected routes require this header:

```http
X-Api-Key: dooyt-demo-key-2026
```

Public routes:

- `GET /api/modules?search=&category=`
- `GET /api/industries`
- `GET /api/plans?billing=monthly|annual`
- `GET /api/testimonials?page=1&limit=10`
- `GET /api/faqs`
- `POST /api/demo-requests`

Protected routes:

- `POST /api/modules/{id}`
- `PUT /api/modules/{id}`
- `DELETE /api/modules/{id}`
- `POST /api/plans/{id}`
- `PUT /api/plans/{id}`
- `DELETE /api/plans/{id}`
- `POST /api/testimonials/{id}`
- `PUT /api/testimonials/{id}`
- `DELETE /api/testimonials/{id}`
- `POST /api/faqs/{id}`
- `PUT /api/faqs/{id}`
- `DELETE /api/faqs/{id}`
- `GET /api/admin/demo-requests?status=&page=1&limit=10`
- `PATCH /api/admin/demo-requests/{id}`

Collection create routes such as `POST /api/modules` are also kept for compatibility.

Example demo request:

```bash
curl -X POST http://localhost:3000/api/demo-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ada Lovelace",
    "email": "ada@example.com",
    "company": "Analytical Engines Ltd",
    "phone": "+91 98765 43210",
    "selectedPlan": "pro",
    "message": "Interested in a custom ERP demo."
  }'
```
