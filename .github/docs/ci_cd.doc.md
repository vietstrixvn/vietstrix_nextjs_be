# 🚀 Hướng Dẫn Triển Khai CI/CD Thủ Công bằng Docker

Tài liệu này hướng dẫn các bước build, đóng gói image, copy lên server và chạy container — phù hợp khi chưa có CI/CD tự động.

---

## 🛠 1. Build Docker Image từ Source

```bash
docker build -t unien-client .
```

> 🔹 Tạo Docker image từ `Dockerfile`, đặt tên là `unien-client`.

---

## 📦 2. Đóng Gói Image Thành File `.tar`

```bash
docker save -o unien-client.tar unien-client
```

> 📦 Lưu image thành file nén để chuyển lên server.

---

## 📤 3. Copy File `.tar` Lên Server (qua SCP)

```bash
scp "E:\project\unien\unien_fe\unien-client.tar" root@103.149.252.96:/var/www/unien_fe/
```

> 🖥️ Copy image lên server qua giao thức SSH.

---

## 📥 4. Load Image Trên Server

rm unien-client.tar

docker stop {id}

SSH vào server, rồi chạy:

```bash
docker load -i unien-client.tar
```

> ⏳ Tải image từ file `.tar` vào Docker.

---

## 🚀 5. Chạy Container từ Image

```bash
docker run -d \
  --name unienclient \
  -p 3000:3000 \
  --restart unless-stopped \
  --env-file .env \
  unien-client
```

> 🟢 Chạy container tên `unienclient`:

- Chạy ngầm (`-d`)
- Map cổng 3000 local → container
- Tự khởi động lại nếu gặp lỗi hoặc restart server
- Đọc biến môi trường từ file `.env`

---

✅ Đến đây app đã được triển khai và có thể truy cập qua IP: `http://103.149.252.96:3000`
