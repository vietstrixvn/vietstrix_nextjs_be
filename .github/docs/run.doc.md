# 🚀 How to Run UNIEN Frontend

Welcome to the UNIEN Frontend project 👋
This guide helps you run the app in **development**, **production**, and via **Docker**.

---

## 🧪 1. Development Mode

Use when actively developing the frontend.

```bash
yarn install
yarn dev
```

> App will run at: `http://localhost:3000`

---

## 🏁 2. Production Mode (Manual)

Build & start the optimized version.

```bash
yarn build
yarn start
```

> Make sure your `.env.production` or `.env.local` is configured.

---

## 🐳 3. Run with Docker

You can containerize the app using Docker for deployment or isolated runs.

### 🔨 Build Docker Image

```bash
docker compose build
```

### 🚀 Run Container

```bash
docker compose up -d
```

> Then open: [http://localhost:3000](http://localhost:3000)

### 🛑 Stop Everything

```bash
docker compose down
```

---

## 📦 Docker Setup Files

### 📁 Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── ...
```

### 🧾 Dockerfile

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
```

### 🧾 docker-compose.yml

```yaml
version: '3.9'

services:
  unien-fe:
    container_name: unien-frontend
    build: .
    ports:
      - '3000:3000'
    env_file:
      - .env.local
    restart: always
```

### 🧾 .dockerignore

```
node_modules
.next
.git
Dockerfile
docker-compose.yml
.env*
```

---

## 💬 Extras

| Command                    | Description                    |
| -------------------------- | ------------------------------ |
| `yarn dev`                 | Run in development             |
| `yarn build && yarn start` | Build & run production locally |
| `docker compose up -d`     | Start with Docker              |
| `docker compose down`      | Stop and remove container      |
| `docker compose logs -f`   | See real-time logs             |

---

> CI/CD section: _Reserved for GitHub Actions or Cloud Build_
> Contact `Lenf` to set up auto-deploy to VNG Cloud / VPS.
