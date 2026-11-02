// Semua isi portofolio ada di file ini. Ubah teks di sini tanpa menyentuh kode peta.
// Isian yang masih kosong ('') otomatis disembunyikan dari tampilan.

export const profile = {
  name: 'Alwi Bahar',
  role: 'Fullstack Developer',
  location: 'Sulawesi Selatan, Indonesia',
  tagline: 'Anak petani dan peternak ayam dari kampung, kini membangun software untuk usaha di Indonesia.',
  about: [
    'Saya tumbuh di sebuah kampung di Sulawesi Selatan. Orang tua saya petani sekaligus peternak ayam, dan dari mereka saya belajar bahwa hasil yang baik datang dari kerja yang telaten setiap hari.',
    'Karier saya dimulai sebagai IT helpdesk di rumah sakit. Sekarang saya fullstack developer di KBI, dan bersama tiga rekan di D Group membangun serta memasarkan aplikasi untuk usaha: laundry, apotek, kasir, travel, dan booking.',
  ],
  photo: '', // contoh: 'img/alwi.jpg'
  cv: '', // contoh: 'cv-alwi-bahar.pdf'
};

export const contact = {
  email: '',
  whatsapp: '', // format internasional tanpa +, contoh: '6281234567890'
  github: '',
  linkedin: 'https://www.linkedin.com/in/alwi-bahar-b50a54237/',
};

// Sembilan petak sawah = sembilan kelompok skill (urutan kiri-atas ke kanan-bawah).
export const skills = [
  { name: 'Backend', icon: 'server-2', items: ['Laravel', 'PHP 8.3', 'REST API & Sanctum', 'Queue & Horizon', 'Spatie Permission (RBAC)'] },
  { name: 'Mobile', icon: 'device-mobile', items: ['Flutter', 'BLoC', 'POS mobile offline'] },
  { name: 'Database', icon: 'database', items: ['MySQL 8', 'PostgreSQL', 'Redis'] },
  { name: 'Frontend', icon: 'layout', items: ['Blade', 'Tailwind CSS', 'Bootstrap 5', 'JavaScript', 'Vite'] },
  { name: 'Integrasi', icon: 'plug-connected', items: ['Midtrans & Xendit', 'SatuSehat (rekam medis)', 'Notifikasi WhatsApp'] },
  { name: 'ERP & akuntansi', icon: 'calculator', items: ['Jurnal double-entry', 'Multi-company & multi-cabang', 'Inventori FEFO & batch'] },
  { name: 'Kualitas', icon: 'checklist', items: ['PHPUnit', 'TDD', 'Uji end-to-end Playwright'] },
  { name: 'DevOps', icon: 'cloud-upload', items: ['Docker', 'Git, GitHub & GitLab', 'CI/CD', 'Monitoring aplikasi'] },
  { name: 'Lainnya', icon: 'tools', items: ['Python', 'Otomasi video tutorial', 'IT support & helpdesk'] },
];

export const values = [
  { title: 'Mulai sejak pagi', text: 'Ayam tidak menunggu siang untuk diberi makan. Saya terbiasa memulai lebih awal dan menuntaskan yang sudah dimulai.' },
  { title: 'Telaten merawat', text: 'Aplikasi yang sudah dipakai orang harus dirawat: bug diperbaiki, masukan pengguna didengar.' },
  { title: 'Sabar menunggu panen', text: 'Produk yang baik tumbuh pelan-pelan, dari versi sederhana sampai dipakai banyak usaha.' },
];

export const experiments = [
  { name: 'Mesin video tutorial otomatis', text: 'Merekam video tutorial aplikasi secara otomatis, lengkap dengan narasi suara.', stack: ['Python', 'Playwright', 'edge-tts'] },
  { name: 'Portofolio kampung ini', text: 'Peta interaktif yang sedang kamu jelajahi, dibuat dengan SVG dan JavaScript tanpa framework.', stack: ['SVG', 'JavaScript'] },
];

// Riwayat dari yang paling awal.
export const jobs = [
  {
    id: 'rs',
    org: 'Rumah sakit',
    title: 'IT Helpdesk',
    period: '',
    points: [
      'Menangani kendala perangkat, jaringan, dan aplikasi pengguna',
      'Menjaga sistem rumah sakit tetap berjalan untuk pelayanan pasien',
    ],
  },
  {
    id: 'kbi',
    org: 'KBI',
    title: 'Fullstack Developer',
    period: 'Sekarang',
    points: ['Membangun aplikasi web dan mobile dari database sampai deploy'],
  },
  {
    id: 'dgroup',
    org: 'D Group',
    title: 'Developer & co-builder',
    period: 'Sekarang',
    points: ['Membangun Diresepin dan Dijadwalin', 'Bersama tim memasarkan produk ke pelaku usaha'],
  },
];

export const holding = {
  name: 'D Group',
  text: 'D Group adalah holding kecil berisi empat orang yang membangun sekaligus memasarkan aplikasi untuk usaha di Indonesia. Setiap rumah di dalam kompleks ini adalah satu produk.',
};

// Anggota lain tampil setelah namanya diisi.
export const team = [
  { name: 'Alwi Bahar', role: 'Fullstack developer' },
  { name: '', role: '' },
  { name: '', role: '' },
  { name: '', role: '' },
];

export const products = [
  {
    id: 'dicatetin',
    name: 'Dicatetin',
    kind: 'Software POS laundry',
    status: 'Live',
    color: '#185FA5',
    url: 'https://dicatetin.com/id',
    summary: 'Aplikasi kasir dan manajemen order untuk usaha laundry, dipakai lebih dari 1.200 laundry.',
    features: ['Pengingat WhatsApp otomatis ke pelanggan', 'Laporan real-time', 'Multi-user', 'Coba gratis 14 hari'],
    role: '',
    stack: [],
  },
  {
    id: 'diresepin',
    name: 'Diresepin',
    kind: 'Software apotek dan klinik',
    status: 'Live',
    color: '#0F6E56',
    url: 'https://diresepin.com/',
    summary: 'Satu aplikasi cloud untuk apotek dan klinik, mulai Rp 2.600 per hari.',
    features: [
      'Kasir dengan pemotongan stok FEFO otomatis',
      'Peringatan obat mendekati kedaluwarsa',
      'Resep dokter dan pengecekan keamanan pasien',
      'Rekam medis elektronik dan modul klinik',
      'Akuntansi laba-rugi otomatis',
      'Multi-cabang',
    ],
    role: 'Fullstack developer, web dan mobile',
    stack: ['Laravel', 'MySQL', 'Redis', 'Flutter'],
  },
  {
    id: 'dijadwalin',
    name: 'Dijadwalin',
    kind: 'SaaS booking dan penjadwalan',
    status: 'Sedang dibangun',
    color: '#BA7517',
    url: '',
    summary: 'Platform booking untuk usaha jasa: pelanggan memilih jadwal, usaha mengatur antrean dan karyawannya.',
    features: ['Booking online oleh pelanggan', 'Jadwal karyawan dan layanan', 'Aplikasi mobile'],
    role: 'Fullstack developer, web dan mobile',
    stack: ['Laravel', 'PostgreSQL', 'Flutter'],
  },
  {
    id: 'dikasirin',
    name: 'Dikasirin',
    kind: 'Aplikasi kasir',
    status: 'Produk D Group',
    color: '#D85A30',
    url: '',
    summary: 'Aplikasi kasir untuk warung dan toko, dikembangkan bersama tim D Group.',
    features: [],
    role: '',
    stack: [],
  },
  {
    id: 'travel',
    name: 'Aplikasi travel',
    kind: 'Aplikasi usaha travel',
    status: 'Produk D Group',
    color: '#5F5E5A',
    url: '',
    summary: 'Aplikasi untuk usaha travel antarkota, dikembangkan bersama tim D Group.',
    features: [],
    role: '',
    stack: [],
  },
];
