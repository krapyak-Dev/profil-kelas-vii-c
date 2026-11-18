PAKET WEBSITE PROFIL KELAS VII C
================================

ISI FILE
- index.html  : halaman website dan panel admin
- style.css   : desain responsif Dark Gold
- script.js   : koneksi Supabase, login, edit konten, upload gambar
- schema.sql  : tabel, RLS, dan bucket penyimpanan foto

LANGKAH A — GITHUB
1. Buka repository profil-kelas-vii-c.
2. Klik Add file > Upload files.
3. Upload index.html, style.css, dan script.js (boleh sekaligus).
4. Klik Commit changes.
5. Buka Settings > Pages.
6. Pada Build and deployment pilih Deploy from a branch.
7. Branch: main, folder: /(root), lalu Save.

LANGKAH B — SUPABASE
1. Buka project Supabase khusus website profil kelas.
2. Masuk SQL Editor > New query.
3. Buka schema.sql, salin seluruh isinya, lalu Run.
4. Buka Authentication > Users > Add user.
5. Buat akun administrator dengan email dan password yang kamu tentukan.
6. Di SQL Editor jalankan query bootstrap admin pada bagian paling bawah schema.sql.
   Ganti EMAIL_ADMIN_KAMU dengan email admin yang baru dibuat.
7. Buka Project Settings > API. Salin Project URL dan publishable key
   (atau anon public key lama jika project masih menampilkannya).
8. Buka script.js di GitHub dan ganti:
   SUPABASE_URL = "PASTE_SUPABASE_PROJECT_URL_HERE";
   SUPABASE_ANON_KEY = "PASTE_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE";
9. Commit changes. Tunggu GitHub Pages selesai menerbitkan website.

PENTING
- Jangan gunakan secret key atau service_role key di website.
- Jangan bagikan password admin.
- Website ini menggunakan Supabase Row Level Security untuk membatasi perubahan hanya bagi akun yang terdaftar di app_admins.
- Foto maksimum 6 MB per file.
- Link foto anggota dapat dimasukkan sebagai URL di editor anggota.
- Galeri: satu baris = Judul | URL gambar | Keterangan.
- Anggota: satu baris = Nama | Jabatan | URL foto.
- Pengumuman: satu baris = Tanggal | Judul | Isi | URL opsional.

CARA MEMBUKA PANEL ADMIN
Di website, klik tulisan Administrator paling bawah halaman, lalu login.
