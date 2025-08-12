# ---------- STAGE 1: BUILD ----------
FROM node:20-slim AS builder

WORKDIR /app

# Cài gói cơ bản để build (giảm ENOSPC nếu cần)
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy files cần thiết trước (tăng hiệu quả cache)
COPY package.json yarn.lock ./

# Cài đặt full dependencies để build
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code vào container
COPY . .
COPY .env .env


# Build Next.js app
RUN yarn build

# ---------- STAGE 2: RUNNER ----------
FROM node:20-slim AS runner

WORKDIR /app

# Copy cần thiết từ builder (đúng, đủ, gọn)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
#COPY --from=builder /app/next.config.js ./next.config.js

# Chỉ cài dependencies production (rất nhẹ)
RUN yarn install --production --frozen-lockfile && yarn cache clean

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["yarn", "start"]
