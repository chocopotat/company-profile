# Company Profile & Recruitment

Antarmuka web untuk company profile dan manajemen rekrutmen PT. Nusantara Maju. Repositori ini berisi aplikasi React hasil ekspor dari Figma Make, mencakup halaman publik, alur autentikasi, dashboard pelamar, dan panel admin.

## Status saat ini

Proyek ini adalah frontend prototype. Autentikasi, daftar pengguna, dan data tampilan memakai mock yang berjalan di browser melalui `src/context/AuthContext.tsx` dan `localStorage`. Spesifikasi backend Laravel, MySQL, Sanctum, dan API tersimpan sebagai dokumen referensi di `src/imports/pasted_text/company-profile-recruitment.md` dan belum diimplementasikan di sini.

## Teknologi

- React 19 dan TypeScript
- Vite 8
- Tailwind CSS v4 melalui plugin Vite
- React Router 7
- Framer Motion untuk transisi halaman dan animasi
- Recharts untuk grafik panel admin
- Lucide React untuk ikon
- Node.js 22 dan pnpm 10, sesuai `.mise.toml`

## Menjalankan secara lokal

```bash
pnpm install
pnpm dev
```

Perintah lainnya:

```bash
pnpm build
pnpm preview
pnpm format
```

Hasil build berada di direktori `dist/`. Aplikasi memakai `BrowserRouter`, jadi server hosting perlu mengembalikan `index.html` untuk rute selain root agar navigasi langsung ke halaman tertentu tetap berfungsi.

## Akun demo

Login disimulasikan di sisi klien. Semua akun memakai password `password`.

| Email | Peran | Arah setelah login |
| --- | --- | --- |
| `user@example.com` | `user` | Dashboard pelamar |
| `hr@example.com` | `hr` | Dashboard admin |
| `admin@example.com` | `super_admin` | Dashboard admin |

Kredensial ini hanya untuk demo dan tidak boleh dipakai sebagai sistem autentikasi produksi.

## Rute utama

| Area | Rute |
| --- | --- |
| Publik | `/`, `/about`, `/contact`, `/recruitment` |
| Autentikasi | `/recruitment/login`, `/recruitment/register` |
| Pelamar | `/recruitment/dashboard` |
| Admin | `/recruitment/admin/dashboard`, `/recruitment/admin/applicants`, `/recruitment/admin/users`, `/recruitment/admin/contact-messages`, `/recruitment/admin/activity-logs`, `/recruitment/admin/settings` |

Rute admin dilindungi berdasarkan peran. Pengguna dengan peran `user` diarahkan ke dashboard pelamar, sementara `hr`, `admin`, dan `super_admin` diarahkan ke panel admin.

## Struktur proyek

```text
src/
├── components/          Komponen bersama dan komponen admin
├── context/             Autentikasi mock dan manajemen sesi
├── layouts/             Layout publik dan admin
├── pages/               Halaman publik, rekrutmen, dan admin
├── App.tsx              Definisi rute dan pengaturan proteksi
├── index.css            Impor Tailwind, tema, dan gaya global
└── main.tsx             Entry point React
```

## Backend yang direncanakan

Dokumen spesifikasi di `src/imports/pasted_text/company-profile-recruitment.md` merinci model database, endpoint API, alur rekrutmen, notifikasi email dan WhatsApp, pembatasan akses per peran, serta struktur direktori Laravel yang direncanakan untuk pengembangan berikutnya.
