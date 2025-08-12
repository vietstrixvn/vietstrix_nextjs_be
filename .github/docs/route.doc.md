# 🗺️ UNIEN Frontend Routes Guide

This document lists all the routes in the **UNIEN Frontend** project, categorized by **admin (private)** and **public** paths.

---

## 🔐 Admin Routes (`/admin/*`)

These routes are protected and used for managing platform content.

### 🔑 Auth

- `/admin/login` – Admin login page
- `/admin/update_password` – Change password for logged-in user

### 📦 Product

- `/admin/product` – Product list
- `/admin/product/create_product` – Create a new product
- `/admin/product/[slug]` – Edit/view specific product

### 🛠️ Service

- `/admin/service` – Service list
- `/admin/service/create_service` – Create a new service
- `/admin/service/[slug]` – Edit/view specific service

### 🏗️ Project

- `/admin/project` – Project list
- `/admin/project/create_project` – Create a new project
- `/admin/project/[slug]` – Edit/view specific project

### 📝 Blog

- `/admin/blog` – Blog list
- `/admin/blog/create_blog` – Create a new blog
- `/admin/blog/[slug]` – Edit/view specific blog

### 📁 Category

- `/admin/category` – Manage blog/product categories

### 📧 Contact

- `/admin/contact` – View customer contact form submissions

### 👤 Profile

- `/admin/profile` – Admin profile

### 🔧 SEO

- `/admin/seo` – Manage meta tags, open graph, sitemap (if applicable)

### 👥 User (nested under SEO for now?)

- `/admin/user` – Possibly managing authors/editors?

---

## 🌐 Public Routes (`/`)

These routes are visible to the public visitors.

### 🏠 Homepage

- `/` – Landing page (inferred)

### 📚 Blogs

- `/blogs` – Blog listing
- `/blogs/[slug]` – Blog detail page

### 🏢 Company

- `/company/project` – Project showcase
- `/company/project/[slug]` – Project detail

### 🛠️ Services

- `/services` – Service listing
- `/services/[slug]` – Service detail

### 📦 Products

- `/products` – Product listing
- `/products/[slug]` – Product detail

### 📩 Contact

- `/contact` – Contact form

---

## 🗃️ Layouts

These are `layout.tsx` files organizing shared UI:

| Path                   | Purpose                                |
| ---------------------- | -------------------------------------- |
| `/admin/layout.tsx`    | Layout for all admin routes            |
| `/services/layout.tsx` | Shared layout for services pages       |
| `/layout.tsx`          | Likely root layout (global nav/footer) |

---

## 🛎 Notes

- All dynamic routes follow the `[slug]` pattern.
- Folder naming follows Next.js App Router (`/app` dir).
- Nested structure reflects role-based access: admin vs public.
- Some sections like `/admin/user` seem experimental or nested configs.

## 🌲 2. Tree Sitemap

```
/
├── blogs/
│   └── [slug]
├── company/
│   └── project/
│       └── [slug]
├── products/
│   └── [slug]
├── services/
│   └── [slug]
├── contact/

└── admin/
    ├── login/
    ├── update_password/
    ├── profile/
    ├── product/
    │   ├── create_product/
    │   └── [slug]
    ├── service/
    │   ├── create_service/
    │   └── [slug]
    ├── project/
    │   ├── create_project/
    │   └── [slug]
    ├── blog/
    │   ├── create_blog/
    │   └── [slug]
    ├── category/
    ├── contact/
    └── seo/
    └── user/
```
