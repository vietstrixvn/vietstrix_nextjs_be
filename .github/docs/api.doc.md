# 📚 API Routes – Full Endpoint Reference

> ✅ For developers to quickly reference backend API routes.  
> 🔐 Some endpoints may require authentication (JWT token).  
> 🌐 Base URL: `NEXT_PUBLIC_BASE_URL` or `NEXT_PUBLIC_BASE_URL_DEV`

---

## 🛡️ Authentication

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| POST   | `/public/auth/login`     | User login        |
| GET    | `/public/auth/logout`    | User logout       |
| PUT    | `/users/update-password` | Update password   |
| POST   | `/users/verify-code`     | Verify OTP / Code |

---

## 👤 Users

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/users/me`          | Get current logged-in user |
| GET    | `/users`             | Get all users              |
| GET    | `/users/manager`     | Get all manager accounts   |
| GET    | `/users/manager/:id` | Get manager details by ID  |
| GET    | `/users/statistic`   | Get user statistics        |

---

## 🗂️ Categories

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/category`            | Get all categories     |
| GET    | `/category/:slug`      | Get category by slug   |
| GET    | `/category/:id`        | Get category by ID     |
| PUT    | `/category/:id/status` | Update category status |

---

## 📈 SEO

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| GET    | `/seo`   | Get current SEO config |
| PUT    | `/seo`   | Update SEO config      |

---

## 🏗️ Projects

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/project`            | Get all projects      |
| GET    | `/project/:slug`      | Get project by slug   |
| GET    | `/project/:id`        | Get project by ID     |
| PUT    | `/project/:id/status` | Update project status |

---

## 🛠️ Products

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/product`            | Get all products      |
| GET    | `/product/:slug`      | Get product by slug   |
| GET    | `/product/:id`        | Get product by ID     |
| PUT    | `/product/:id/status` | Update product status |

---

## 🧰 Services

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/service`            | Get all services      |
| GET    | `/service/:slug`      | Get service by slug   |
| GET    | `/service/:id`        | Get service by ID     |
| PUT    | `/service/:id/status` | Update service status |

---

## 📝 Blog Posts

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/blog`            | Get all blog posts      |
| GET    | `/blog/:slug`      | Get blog post by slug   |
| GET    | `/blog/:id`        | Get blog post by ID     |
| PUT    | `/blog/:id/status` | Update blog post status |

---

## 📩 Contact Messages

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| GET    | `/contact`     | Get all contact messages     |
| GET    | `/contact/:id` | Get specific contact message |
