# ==============================================================================
# TAHAP 1: BUILD STAGE (Mengubah React menjadi file statis)
# ==============================================================================
# Kita gunakan Node.js hanya sebagai "mesin pembuat" (builder).
FROM node:20-alpine as builder

# Tentukan folder kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json untuk caching
COPY package*.json ./

# Install semua dependencies (termasuk devDependencies karena Vite butuh itu untuk build)
RUN npm install

# Salin seluruh source code React Anda ke dalam container
COPY . .

# Jalankan perintah build Vite (menghasilkan folder /dist yang berisi file siap pakai)
RUN npm run build


# ==============================================================================
# TAHAP 2: PRODUCTION STAGE (Menyajikan file dengan Nginx)
# ==============================================================================
# Sekarang kita ganti mesin menggunakan Nginx yang sangat ringan.
FROM nginx:alpine

# (Opsional) Hapus file HTML bawaan Nginx agar bersih
RUN rm -rf /usr/share/nginx/html/*

# PENTING: Kita "mengambil" folder /dist dari TAHAP 1 (builder) 
# lalu meletakkannya di folder publik milik Nginx.
COPY --from=builder /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx khusus untuk React (akan kita buat di langkah 2)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Buka port 80
EXPOSE 80

# Jalankan Nginx di latar depan (foreground)
CMD ["nginx", "-g", "daemon off;"]