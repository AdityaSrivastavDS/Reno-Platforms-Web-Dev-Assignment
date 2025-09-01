# Next.js + MySQL — School Directory (Assignment)

A tiny full‑stack app with two pages:

1. **Add School (`/addSchool`)** — form with validation (react-hook-form) + image upload stored in `public/schoolImages` and a DB row in `schools`.
2. **Show Schools (`/showSchools`)** — e‑commerce‑style grid showing **name, address, city, image** (reference layout inspired by UniformApp).

## Tech
- Next.js 14 (Pages Router for simplicity)
- Tailwind CSS
- react-hook-form
- MySQL (mysql2 + pooled connections)
- formidable for multipart file upload

## Quick Start

### 1) Install deps
```bash
npm i
```

### 2) Create DB + table
Import `schema.sql` into MySQL (or run its statements).

### 3) Configure env
Copy `.env.example` to `.env.local` and set your MySQL creds.

### 4) Run dev
```bash
npm run dev
```

- Open http://localhost:3000
- Visit `/addSchool` to add records (with an optional image).
- Visit `/showSchools` to browse the grid.

## Notes on Image Uploads & Hosting
This project stores images on the local filesystem under `public/schoolImages`. This is perfect for local development or a VPS. Some serverless hosts (e.g., Vercel/Netlify) have **ephemeral** filesystems, so writes won't persist. For those platforms, you can swap the upload destination to a persistent storage (e.g., Cloudinary/S3) but the assignment requirement is honored here by saving to a `schoolImages` folder.

## Validation
- Client: required checks, email regex, contact length/characters (react-hook-form).
- Server: the same sanity checks are repeated in the API for safety.

## Reference
- Listing layout inspired by: https://uniformapp.in/schoolsearch.php

## Project Structure
```
/pages
  /api
    schools.js       # GET list, POST create (multipart form + MySQL insert)
  _app.js
  addSchool.jsx
  showSchools.jsx
/lib
  db.js              # mysql2 pool
/public
  /schoolImages      # uploaded images live here
/styles
  globals.css
schema.sql
.env.example
```

## Submission
- Push to a **public GitHub repo**.
- Deploy (local/VPS recommended for persistent images).
- Share both the **GitHub URL** and the **live URL** as per assignment.
