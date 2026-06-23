# Dooyt ERP Assessment - Complete Project Guide

## Project Overview

Build a pixel-perfect, responsive landing page for Dooyt ERP using Next.js and Tailwind CSS, backed by a fully functional REST API built with Next.js Route Handlers.

The project should look and feel like a production SaaS landing page while keeping the backend implementation simple and maintainable.

# Design Assets & Image Guidelines

## IMPORTANT

The folder structure will be:

docs/
├── ai/
│   └── PROJECT_GUIDE.md
│
└── design/
├── dooyt-design.pdf
└── sections/
├── hero.png
├── modules.png
├── features.png
├── industries.png
├── pricing.png
├── testimonials.png
├── faq.png
└── ...

In addition to the PDF, I may provide PNG screenshots for individual sections inside the design folder.

### Instructions for Development

1. Always use the design PDF as the primary reference.
2. If section-specific PNG files are available, use them for more accurate spacing, typography, layout, alignment, and responsive behavior.
3. Carefully compare the implementation against both the PDF and PNG references before marking a section complete.
4. Pixel-perfect implementation is preferred over creating your own design interpretation.

### Images During Development

Many images used in the design (dashboard screenshots, industry images, illustrations, mobile mockups, etc.) may not be available initially.

During development:

* Use relevant placeholder images.
* Use random high-quality stock images when necessary.
* Do NOT block development waiting for final assets.
* Build the layout exactly as designed and use temporary images until final assets are added.

### Final Assets

I may manually add images later inside:

public/images/

or

public/assets/

When real assets become available:

* Replace placeholder images without changing component structure.
* Keep image containers, aspect ratios, spacing, and responsiveness unchanged.
* Avoid hardcoding image dimensions that could break when assets are replaced.

### Image Component Rules

Use Next.js Image component for all images.

Example:

<Image
src="/images/placeholder.jpg"
alt="Section Image"
fill
className="object-cover"
/>

Keep image handling flexible so real assets can be swapped in later with minimal changes.

### Agent Development Rule

Never stop implementation because an image asset is missing.

Use placeholders, continue building the section, and focus on matching:

* Layout
* Typography
* Spacing
* Responsiveness
* Component behavior

The final images will be provided manually if needed.


---

# Goal

Deliver:

1. Responsive landing page matching the provided design
2. Dynamic content loaded from API
3. Functional backend APIs
4. Demo request form
5. Protected admin APIs
6. Proper loading, error, and empty states
7. Clean architecture and code quality

---

# Tech Stack

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* Shadcn UI
* Lucide React
* Swiper.js (Testimonials Slider)
* React Hook Form
* Zod

## Backend

Use Next.js Route Handlers.

Advantages:

* Single repository
* Faster development
* Easier deployment
* Meets assessment requirements

## Data Storage

For assessment purposes:

Option 1 (Recommended)

* seed.json
* Local JSON persistence

Option 2

* SQLite + Prisma

Recommendation:
Use SQLite + Prisma because it demonstrates backend knowledge.

---

# Folder Structure

src/
├── app/
│   ├── page.tsx
│   ├── api/
│   │   ├── modules/
│   │   ├── industries/
│   │   ├── plans/
│   │   ├── testimonials/
│   │   ├── faqs/
│   │   ├── demo-requests/
│   │   └── admin/
│   │       └── demo-requests/
│
│
├── components/
│   ├── layout/
│   ├── sections/
│   ├── pricing/
│   ├── forms/
│   ├── ui/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validation.ts
│   ├── api.ts
│
├── hooks/
│
├── types/
│
├── data/
│   └── seed.json

docs/
├── ai/
│   └── PROJECT_GUIDE.md
│
└── design/
└── dooyt-design.pdf

---

# Database Models

## Module

id
name
category
icon
description

---

## Industry

id
name
description

---

## Plan

id
name
tagline
monthlyPrice
currency
isPopular

---

## Testimonial

id
name
role
rating
quote

---

## FAQ

id
question
answer
order

---

## DemoRequest

id
fullName
email
company
phone
selectedPlan
message
status

status:

* new
* contacted
* closed

createdAt
updatedAt

---

# API Authentication

Protected routes require:

X-Api-Key: dooyt-demo-key-2026

Create middleware/helper:

lib/auth.ts

Example:

export function validateApiKey(req: Request) {
const key = req.headers.get("X-Api-Key");

return key === process.env.API_KEY;
}

---

# API Endpoints

## Public

### GET /api/modules

Filters:

?search=
?category=

---

### GET /api/industries

Returns all industries

---

### GET /api/plans

Supports:

?billing=monthly

?billing=annual

Annual pricing:

annualPrice =
(monthlyPrice * 12) * 0.85

Return:

discountPercent: 15

---

### GET /api/testimonials

Pagination:

?page=1
&limit=10

Response:

{
data: [],
page: 1,
limit: 10,
total: 3
}

---

### GET /api/faqs

Return all FAQs

---

### POST /api/demo-requests

Validation:

fullName required

email required

valid email required

unknown plan => 422

Return:

201 Created

---

# Protected Routes

Require API key.

---

POST /api/modules

PUT /api/modules/:id

DELETE /api/modules/:id

---

POST /api/plans

PUT /api/plans/:id

DELETE /api/plans/:id

---

POST /api/testimonials

PUT /api/testimonials/:id

DELETE /api/testimonials/:id

---

POST /api/faqs

PUT /api/faqs/:id

DELETE /api/faqs/:id

---

GET /api/admin/demo-requests

Filters:

status
page
limit

---

PATCH /api/admin/demo-requests/:id

Update:

new
contacted
closed

---

# UI Implementation Plan

---

## Section 1

Navbar

Features:

* Sticky navbar
* Mobile menu
* Smooth scrolling

Links:

* Features
* Benefits
* Pricing
* Testimonials
* Contact Us

CTA:

Request Demo

---

## Section 2

Hero

Contains:

* Rating badge
* Headline
* Description
* Request Demo button
* Try Free button
* Dashboard mockup image

Responsive priority:

Desktop first visual
Mobile stacked layout

---

## Section 3

Modules

Data source:

GET /api/modules

Features:

* Module tabs
* Active module state
* Dynamic content display

Default:

CRM

---

## Section 4

Features

Static content matching design.

Cards:

* Dashboard
* Analytics
* Task History

---

## Section 5

Industries

Data source:

GET /api/industries

Responsive grid:

Desktop:
4 columns

Tablet:
2 columns

Mobile:
1 column

---

## Section 6

CTA Banner

Orange gradient banner.

Contains:

* Heading
* Description
* Schedule Demo button
* Mobile app mockup image

---

## Section 7

Pricing

Data source:

GET /api/plans

Features:

Monthly toggle

Annual toggle

When Annual selected:

* Re-fetch plans
* Show 15% off badge
* Display discounted amount

Highlight:

Pro Plan

---

## Section 8

Benefits

Small icon badges

Examples:

* Grows with you
* Save time
* Better teamwork
* Stay compliant

---

## Section 9

Testimonials

Data source:

GET /api/testimonials

Use:

Swiper.js

Features:

* Auto play
* Pagination
* Navigation arrows

---

## Section 10

FAQ

Data source:

GET /api/faqs

Accordion behavior:

Only one open at a time.

---

## Section 11

Demo Form

Fields:

Full Name
Email
Phone
Company
Selected Plan
Message

Validation:

React Hook Form + Zod

Submission:

POST /api/demo-requests

Handle:

* loading
* success
* error

---

## Section 12

Footer

Contains:

* Logo
* App Store button
* Play Store button
* Quick Links
* Copyright

---

# State Management

Use React Query (TanStack Query)

Benefits:

* Caching
* Loading states
* Error states
* Refetching

Queries:

modules
industries
plans
testimonials
faqs

Mutation:

demo request

---

# Reusable Components

Button

SectionHeader

Container

PricingCard

FeatureCard

IndustryCard

ModuleCard

Accordion

TestimonialCard

LoadingSkeleton

ErrorState

EmptyState

---

# Design System

Primary:

#F97316

Background:

#FFFFFF

Text:

#111827

Muted:

#6B7280

Border:

#E5E7EB

Radius:

16px

---

# Development Order

Phase 1

Setup project

* Next.js
* Tailwind
* Shadcn
* Prisma

---

Phase 2

Database

* Schema
* Seed data

---

Phase 3

Build APIs

* Public APIs
* Protected APIs

Test with Postman

---

Phase 4

Build UI sections

Navbar

Hero

Modules

Features

Industries

CTA

Pricing

Benefits

Testimonials

FAQ

Footer

---

Phase 5

Integrate APIs

Replace all mock data.

---

Phase 6

Demo form

Validation
Submission

---

Phase 7

Loading & Error States

Skeletons

Error messages

Empty states

---

Phase 8

Responsive Testing

320px
375px
768px
1024px
1440px

---

Phase 9

Polish

Animations

Hover states

Accessibility

SEO

---

# Bonus Points

Add:

* Framer Motion animations
* Dark mode support
* API documentation page
* Swagger
* Unit tests
* Lighthouse score above 90

---

# Submission Checklist

Frontend

* Responsive
* Pixel close to design
* API integrated

Backend

* All endpoints working
* API key protection
* Validation

Quality

* README completed
* Environment variables documented
* Clean commits
* Deployed application

---

# Recommended Timeline

Hour 1-2

Setup + Prisma

Hour 3-5

Build APIs

Hour 6-10

Build UI

Hour 11-12

Integrate APIs

Hour 13-14

Testing

Hour 15

Deployment + README

Goal:
Finish comfortably within 1 day.
