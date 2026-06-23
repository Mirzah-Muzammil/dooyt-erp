# Dooyt — Developer Assessment

A frontend-first, full-stack take-home. Rebuild the **Dooyt ERP landing page**
(see `dooyt-design.pdf`) and implement the small API that powers its dynamic sections.

## What we're measuring
- **Primary (60%): Frontend / UI** — Next.js, responsiveness, fidelity to the design, components, state.
- **Secondary (30%): Backend** — correct REST APIs, validation, auth, query logic. 
**Your choice of stack: Python OR Next.js.**
- **(10%): Communication & git hygiene.**

## The design
Build the landing page in **dooyt-design.pdf**. Match layout, spacing, and responsive
behaviour as closely as you reasonably can.
Sections: Navbar · Hero · Modules · Features · Industries · CTA · Pricing
(monthly⇄annual toggle) · Testimonials · FAQ (accordion) · Footer · Request-a-Demo form.

## Part 1 — Frontend (required: Next.js + Tailwind)
1. Responsive (mobile → desktop), with a working mobile nav.
2. Modules / Industries / Plans / Testimonials / FAQs are **fetched from your API**, not hardcoded.
3. Interactive: pricing monthly⇄annual toggle (recomputes price + "15% off" badge), FAQ accordion, testimonials slider.
4. Demo form: validation, loading state on submit, success + error handling.
5. Handle loading / empty / error states gracefully.

## Part 2 — Backend (Next.js only)
Implement the contract below in Next.js Route
Handlers. Use the provided `seed.json`. In-memory or SQLite is fine.
**State which backend stack you chose in your README.**

- Base path `/api`. Auth header on protected routes: `X-Api-Key: dooyt-demo-key-2026` (JWT also accepted).
- Paginated responses use this envelope: `{ "data": [...], "page": 1, "limit": 10, "total": 42 }`.

**Public**

| Method | Path | Notes |
|---|---|---|
| GET | /api/modules | `?search=` , `?category=` |
| GET | /api/industries | |
| GET | /api/plans | `?billing=monthly\|annual` (annual = 15% off, computed server-side) |
| GET | /api/testimonials | `?page=` `&limit=` (paginated) |
| GET | /api/faqs | |
| POST | /api/demo-requests | create a lead; `fullName`+`email` required; valid email; unknown plan → 422; success → 201 |

**Protected (require the API key)**

| Method | Path | Notes |
|---|---|---|
| POST / PUT / DELETE | /api/{modules\|plans\|testimonials\|faqs}/{id} | create / update / delete |
| GET | /api/admin/demo-requests | `?status=` `&page=` `&limit=` |
| PATCH | /api/admin/demo-requests/{id} | update status (`new` / `contacted` / `closed`) |

Status codes: `201` create · `200` ok · `401` bad/missing key · `404` unknown id · `422`/`400` validation.

## Submission
- A **Git repository** (GitHub/GitLab) with atomic, readable commits.
- A **README** with: how to run frontend + backend, and which backend stack you chose.
- One repo (a single Next.js full-stack app) or two repos — both are fine.

## Time
Around **1–2 days**. We value a correct, clean, well-structured core over an unfinished sprawl.
Use Google / docs / AI tools freely — you'll be asked to explain your code afterwards.
