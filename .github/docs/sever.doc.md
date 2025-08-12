# 📡 Hướng Dẫn Cấu Hình Server

Tài liệu này hướng dẫn các bước thiết lập cơ bản cho một máy chủ Linux (Debian-based), bao gồm cấu hình thời gian, cài Redis, Docker, và Docker Compose.

---

## 🛠 Thiết Lập Môi Trường Server

### 🕒 1. Cấu Hình Múi Giờ

Đặt múi giờ về Việt Nam (Asia/Ho_Chi_Minh):

```bash
sudo timedatectl set-timezone Asia/Ho_Chi_Minh
```

---

### 🔧 2. Cấu Hình Redis (Tối Ưu RAM)

Cho phép hệ thống sử dụng bộ nhớ swap nếu cần:

```bash
sudo sysctl vm.overcommit_memory=1
echo "vm.overcommit_memory=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

### 📦 3. Cài Đặt Gói Cơ Bản

```bash
touch ~/.hushlogin                     # Ẩn thông báo khi SSH
sudo apt update
sudo apt install sudo                 # Trong trường hợp máy chưa có sudo
sudo apt update && sudo apt upgrade  # Cập nhật hệ thống
```

---

### 🐳 4. Cài Đặt Docker

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
tar -xzvf nhadong.tar.gz                           # Nếu có file cần giải nén
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce
sudo systemctl status docker                       # Kiểm tra trạng thái Docker
```

---

### 🧩 5. Cài Đặt Docker Compose (Bản Mới Nhất)

```bash
sudo apt-get install jq
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version                           # Kiểm tra version
```
