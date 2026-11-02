// Semua isi portofolio ada di file ini. Ubah teks di sini tanpa menyentuh kode peta.
// Isian yang masih kosong ('') otomatis disembunyikan dari tampilan.

export const profile = {
  name: 'Alwi Bahar',
  role: 'Fullstack Developer',
  location: 'Makassar, Sulawesi Selatan',
  tagline: 'Anak petani dan peternak ayam dari kampung, kini membangun software untuk usaha di Indonesia.',
  about: [
    'Saya tumbuh di sebuah kampung di Sulawesi Selatan. Orang tua saya petani sekaligus peternak ayam, dan dari mereka saya belajar bahwa hasil yang baik datang dari kerja yang telaten setiap hari.',
    'Saya lulus cum laude dari Ilmu Komputer Universitas Muslim Indonesia, lalu memulai karier sebagai IT helpdesk di rumah sakit. Sejak 2021 saya mengerjakan proyek web sebagai freelancer, sempat menjadi web developer kontrak di Pilarmedia, dan sejak 2023 menjadi fullstack developer di Kreasi Binar Indonesia (Bosowa Group).',
    'Di luar itu, bersama tiga rekan di D Group saya membangun dan memasarkan aplikasi untuk usaha: laundry, apotek, kasir, travel, dan booking.',
  ],
  photo: '', // contoh: 'img/alwi.jpg'
  cv: '', // contoh: 'cv-alwi-bahar.pdf'
};

export const contact = {
  email: 'alwibahar2@gmail.com',
  whatsapp: '6285276858190', // format internasional tanpa +
  github: 'https://github.com/alwi2kali',
  linkedin: 'https://www.linkedin.com/in/alwi-bahar-b50a54237/',
};

// Sembilan petak sawah = sembilan kelompok skill (urutan kiri-atas ke kanan-bawah).
export const skills = [
  { name: 'Backend', icon: 'server-2', items: ['Laravel', 'NestJS', 'CodeIgniter', 'PHP', 'REST API', 'Queue & Horizon'] },
  { name: 'Frontend', icon: 'layout', items: ['Angular', 'JavaScript & TypeScript', 'jQuery', 'HTML5 & CSS3', 'Tailwind & Bootstrap'] },
  { name: 'Database', icon: 'database', items: ['MySQL', 'PostgreSQL', 'Redis', 'Desain skema & indexing'] },
  { name: 'Mobile', icon: 'device-mobile', items: ['Flutter', 'BLoC', 'API untuk aplikasi mobile'] },
  { name: 'ERP & keuangan', icon: 'calculator', items: ['Aplikasi ERP', 'Aplikasi keuangan', 'Jurnal double-entry', 'Inventori FEFO & batch'] },
  { name: 'Integrasi', icon: 'plug-connected', items: ['Midtrans & Xendit', 'SatuSehat (rekam medis)', 'Notifikasi WhatsApp', 'Integrasi antarsistem'] },
  { name: 'Keamanan & kualitas', icon: 'shield-check', items: ['Otorisasi multi-role (RBAC)', 'Enkripsi data', 'PHPUnit & TDD', 'Uji end-to-end Playwright'] },
  { name: 'Kolaborasi & DevOps', icon: 'git-branch', items: ['Git (GitHub & GitLab)', 'Docker', 'CI/CD', 'Dokumentasi API & arsitektur'] },
  { name: 'Lainnya', icon: 'tools', items: ['Sistem pendukung keputusan (VIKOR)', 'Sistem pakar', 'IT support & helpdesk', 'Python'] },
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

// Riwayat dari yang paling awal. id yang sama dengan tempat di peta membuat bangunannya bisa dibuka.
export const jobs = [
  {
    id: 'umi',
    org: 'Universitas Muslim Indonesia',
    title: 'S1 Ilmu Komputer',
    period: 'Sep 2016 – Des 2020',
    points: ['Lulus cum laude, IPK 3,79 dari 4,00'],
  },
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
    id: 'freelance',
    org: 'Freelance',
    title: 'Web Developer',
    period: '2021 – sekarang',
    points: [
      'Sistem pendukung keputusan pemilihan hewan kurban dengan metode VIKOR',
      'Sistem informasi penjualan dengan metode moving average',
      'Sistem pakar penyakit gigi dengan metode backward chaining',
      'Aplikasi absensi, penggajian, dan transaksi barang untuk toko ponsel',
      'Perbaikan bug penilaian pada aplikasi tryout',
    ],
  },
  {
    id: 'pilarmedia',
    org: 'Pilarmedia',
    title: 'Web Developer (kontrak, remote)',
    period: 'Jul 2022 – Des 2023',
    points: [
      'API autentikasi, manajemen pengguna multi-role, surat jalan, update lokasi, dan laporan untuk web dan aplikasi driver',
      'API aplikasi mobile tally untuk memindai barang yang tiba di tujuan',
      'Tampilan Angular untuk pelacakan lokasi driver, mobil, dan barang',
      'Proyek: PPLI web, Autocargo web dan mobile, LNJT web',
    ],
  },
  {
    id: 'kbi',
    org: 'Kreasi Binar Indonesia (Bosowa Group)',
    title: 'Fullstack Developer',
    period: 'Jan 2023 – sekarang',
    points: [
      'Membangun aplikasi ERP dan aplikasi keuangan dengan NestJS',
      'Membangun aplikasi e-commerce dengan Laravel',
      'Merancang API, mengelola database, keamanan aplikasi, dan integrasi antarsistem',
      'Menulis dokumentasi kode, API, dan arsitektur untuk tim',
    ],
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

