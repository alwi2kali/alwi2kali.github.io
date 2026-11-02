# Kampung portofolio Alwi Bahar

Portofolio interaktif berbentuk kampung. Pengunjung bisa berjalan bebas, atau langsung membuka isi lewat menu cepat dan **Mode ringkas**.

Situs ini statis (HTML, CSS, JavaScript tanpa build), jadi bisa di-host gratis.

## Menjalankan di komputer

```bash
node serve.mjs
```

Lalu buka http://localhost:5173.

## Mengubah isi

Semua teks ada di [`js/content.js`](js/content.js). Isian yang dikosongkan (`''`) otomatis disembunyikan.

Yang masih perlu diisi:

- `profile.photo` dan `profile.cv` (taruh file di folder ini, misalnya `img/alwi.jpg` dan `cv-alwi-bahar.pdf`)
- Periode dan nama rumah sakit di entri `rs` pada `jobs` (tidak ada di CV)
- `team`: nama dan peran tiga rekan D Group
- `products`: peran, teknologi, dan URL untuk Dicatetin, Dikasirin, dan aplikasi travel

## Fungsi setiap tempat

| Tempat di peta | Isi | Tautan langsung |
|---|---|---|
| Rumah panggung | Tentang saya | `#rumah` |
| Sawah (9 petak) | Skill, satu petak satu kelompok | `#sawah` |
| Kandang ayam | Cara kerja | `#kandang` |
| Kebun jagung | Eksperimen dan proyek sampingan | `#kebun` |
| Jembatan | Riwayat lengkap | `#jembatan` |
| Gapura D Group | Holding dan semua produk | `#gapura` |
| Baruga | Tim D Group | `#baruga` |
| Rumah-rumah di kompleks | Detail tiap produk | `#dicatetin`, `#diresepin`, `#dijadwalin`, `#dikasirin`, `#travel` |
| Gedung di sisi kota | Riwayat kerja dan pendidikan | `#rs`, `#kbi`, `#pilarmedia`, `#freelance`, `#umi` |
| Pos ronda | Kontak | `#posronda` |
| Mode ringkas | Semua isi dalam satu halaman biasa | `#ringkas` |

Tautan langsung bisa dibagikan, misalnya `https://namadomain/#diresepin` membuka detail Diresepin.

## Gambar pratinjau (LinkedIn, WhatsApp)

`img/og.png` dibuat dari `tools/og.html`. Setelah peta atau teks kartunya berubah, jalankan `node serve.mjs`, lalu:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --hide-scrollbars --window-size=1200,627 --virtual-time-budget=6000 --screenshot="C:\code\portfolio\img\og.png" "http://localhost:5173/tools/og.html"
```

LinkedIn menyimpan pratinjau lama di cache. Perbarui lewat https://www.linkedin.com/post-inspector/.

## Alamat utama: GitHub Pages

Situs utama ada di https://alwi2kali.github.io, dilayani langsung dari branch `main` repository ini. Setiap `git push` otomatis memperbarui situs dalam satu-dua menit.

Alamat ini dipakai untuk LinkedIn karena LinkedIn menandai semua alamat `*.pages.dev` sebagai berbahaya.

## Cadangan: Cloudflare Pages

Salinan yang sama juga ada di https://alwibahar.pages.dev. Untuk memperbaruinya:

```bash
npm run deploy
```

Perintah ini menyalin file situs ke `dist/` lalu mengunggahnya dengan Wrangler. Saat pertama kali, jalankan `npx wrangler@3 login` untuk masuk ke akun Cloudflare. Wrangler versi 3 dipakai karena versi 4 butuh Node.js 22.
