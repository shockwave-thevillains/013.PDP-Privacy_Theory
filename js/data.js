/*
 * Data glosarium istilah privasi & pelindungan data pribadi.
 * Rujukan: UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)
 * dan Regulation (EU) 2016/679 (GDPR). Materi edukasi — bukan nasihat hukum.
 */

const CATEGORIES = [
  { id: "dasar", name: "Konsep Dasar", icon: "🧩", desc: "Siapa dan apa yang diatur dalam pelindungan data." },
  { id: "hukum", name: "Dasar Hukum Pemrosesan", icon: "⚖️", desc: "Enam alasan sah untuk memproses data pribadi." },
  { id: "prinsip", name: "Prinsip Pelindungan Data", icon: "📐", desc: "Aturan main yang berlaku untuk setiap pemrosesan." },
  { id: "teknik", name: "Teknik Keamanan & Privasi", icon: "🔐", desc: "Cara teknis melindungi data: enkripsi, pseudonim, dll." },
  { id: "hak", name: "Hak Subjek Data", icon: "🙋", desc: "Hak yang dimiliki pemilik data atas datanya." },
  { id: "tatakelola", name: "Tata Kelola & Kepatuhan", icon: "🏛️", desc: "Dokumen, peran, dan proses untuk membuktikan kepatuhan." },
];

const TERMS = [
  /* ============================ KONSEP DASAR ============================ */
  {
    id: "data-pribadi",
    term: "Data Pribadi",
    en: "Personal Data",
    category: "dasar",
    short: "Setiap data tentang orang yang teridentifikasi atau dapat diidentifikasi.",
    definition:
      "Data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi, secara tersendiri atau dikombinasikan dengan informasi lain, baik langsung maupun tidak langsung. Kuncinya ada pada kata “dapat diidentifikasi”: data yang sekilas tidak menyebut nama tetap bisa menjadi data pribadi bila bisa dihubungkan ke seseorang.",
    analogy:
      "Seperti kepingan puzzle: satu keping (misal tanggal lahir) mungkin tidak berarti, tetapi bila digabung dengan kode pos dan jenis kelamin, gambarnya bisa menunjukkan wajah seseorang.",
    example: {
      title: "Toko online",
      text: "Sebuah toko online menyimpan: nama, email, alamat pengiriman, nomor HP, riwayat belanja, alamat IP, dan ID perangkat.",
      points: [
        "Nama, email, nomor HP, alamat → jelas data pribadi (identifikasi langsung).",
        "Alamat IP, ID cookie, ID perangkat → tetap data pribadi karena dapat dihubungkan ke akun pelanggan.",
        "Total penjualan per kota per bulan (agregat) → umumnya bukan data pribadi bila tidak bisa ditarik ke individu.",
      ],
    },
    misconception: "Data tanpa nama ≠ otomatis bukan data pribadi. ID pelanggan, nomor plat, atau lokasi GPS tetap data pribadi.",
    related: ["data-spesifik", "subjek-data", "anonimisasi"],
    refs: { pdp: "Pasal 1 angka 1; Pasal 4", gdpr: "Art. 4(1)" },
  },
  {
    id: "data-spesifik",
    term: "Data Pribadi Spesifik",
    en: "Special Categories of Personal Data / Sensitive Data",
    category: "dasar",
    short: "Data yang dampaknya lebih besar bila bocor, sehingga butuh perlindungan ekstra.",
    definition:
      "Kategori data pribadi yang bila diproses dapat berdampak lebih besar terhadap subjek data, seperti diskriminasi atau kerugian besar. UU PDP menyebut: data dan informasi kesehatan, data biometrik, data genetika, catatan kejahatan, data anak, data keuangan pribadi, dan data lain sesuai peraturan. Data pribadi yang bersifat umum antara lain nama lengkap, jenis kelamin, kewarganegaraan, agama, dan status perkawinan.",
    analogy:
      "Jika data umum adalah kunci pagar, data spesifik adalah kunci brankas — kehilangannya jauh lebih merugikan, jadi penjagaannya harus lebih ketat.",
    example: {
      title: "Aplikasi kesehatan & fintech",
      text: "Aplikasi telemedis menyimpan hasil lab pasien; aplikasi pinjaman online menyimpan slip gaji dan sidik jari untuk login.",
      points: [
        "Hasil lab → data kesehatan (spesifik).",
        "Sidik jari / face recognition → data biometrik (spesifik).",
        "Slip gaji, mutasi rekening → data keuangan pribadi (spesifik).",
        "Konsekuensi: perlu DPIA, kontrol akses lebih ketat, enkripsi, dan dasar hukum yang kuat.",
      ],
    },
    misconception: "Perhatikan perbedaan rezim: GDPR memasukkan agama, pandangan politik, dan orientasi seksual ke kategori khusus, sedangkan UU PDP menggolongkan agama sebagai data pribadi umum.",
    related: ["data-pribadi", "dpia", "enkripsi"],
    refs: { pdp: "Pasal 4 ayat (2) dan (3)", gdpr: "Art. 9, Art. 10" },
  },
  {
    id: "subjek-data",
    term: "Subjek Data Pribadi",
    en: "Data Subject",
    category: "dasar",
    short: "Orang yang datanya diproses — ‘pemilik’ data.",
    definition:
      "Orang perseorangan yang pada dirinya melekat data pribadi. Subjek data adalah pihak yang dilindungi oleh undang-undang dan pemegang hak-hak seperti akses, koreksi, dan penghapusan.",
    analogy: "Seperti pemilik rumah yang menitipkan kunci: kunci boleh dipegang orang lain, tetapi rumahnya tetap milik dia.",
    example: {
      title: "Rumah sakit",
      text: "Pasien bernama Sari berobat di RS X. RS X mencatat rekam medisnya.",
      points: [
        "Sari = subjek data.",
        "RS X = pengendali data.",
        "Sari berhak meminta salinan rekam medisnya dan memperbaiki data yang salah.",
      ],
    },
    misconception: "Perusahaan (badan hukum) bukan subjek data pribadi. Namun data karyawan di dalamnya tetap data pribadi.",
    related: ["pengendali", "hak-akses"],
    refs: { pdp: "Pasal 1 angka 6", gdpr: "Art. 4(1)" },
  },
  {
    id: "pengendali",
    term: "Pengendali Data Pribadi",
    en: "Data Controller",
    category: "dasar",
    short: "Pihak yang menentukan TUJUAN dan CARA pemrosesan data.",
    definition:
      "Setiap orang, badan publik, atau organisasi internasional yang — sendiri atau bersama-sama — menentukan tujuan dan melakukan kendali atas pemrosesan data pribadi. Pengendali memikul tanggung jawab utama atas kepatuhan.",
    analogy: "Pengendali adalah arsitek yang memutuskan rumah seperti apa yang dibangun dan mengapa; kontraktor hanya mengerjakan sesuai gambar.",
    example: {
      title: "Perusahaan & penyedia payroll",
      text: "PT Maju memakai layanan payroll SaaS untuk menggaji karyawannya.",
      points: [
        "PT Maju memutuskan data apa yang dipakai dan untuk apa (menggaji) → Pengendali.",
        "Penyedia SaaS payroll hanya memproses sesuai instruksi PT Maju → Prosesor.",
        "Jika data bocor, PT Maju tetap bertanggung jawab kepada karyawan, meski bisa menuntut prosesor secara kontraktual.",
      ],
    },
    misconception: "Status ditentukan oleh peran nyata, bukan oleh label di kontrak. Prosesor yang memakai data untuk kepentingannya sendiri bisa ‘naik status’ menjadi pengendali.",
    related: ["prosesor", "pengendali-bersama", "akuntabilitas"],
    refs: { pdp: "Pasal 1 angka 4", gdpr: "Art. 4(7), Art. 24" },
  },
  {
    id: "prosesor",
    term: "Prosesor Data Pribadi",
    en: "Data Processor",
    category: "dasar",
    short: "Pihak yang memproses data ATAS NAMA pengendali.",
    definition:
      "Setiap orang, badan publik, atau organisasi internasional yang melakukan pemrosesan data pribadi atas nama pengendali. Prosesor wajib bekerja berdasarkan perintah pengendali dan menjaga keamanan data.",
    analogy: "Seperti jasa laundry: mereka mencuci baju Anda sesuai permintaan, bukan memakainya sendiri.",
    example: {
      title: "Cloud & call center",
      text: "E-commerce memakai layanan cloud hosting dan vendor call center outsourcing.",
      points: [
        "Cloud provider menyimpan database pelanggan → Prosesor.",
        "Vendor call center mengakses data pelanggan untuk menjawab komplain → Prosesor.",
        "Keduanya wajib diikat perjanjian pemrosesan data (DPA).",
      ],
    },
    misconception: "Prosesor tidak boleh memakai data untuk tujuan sendiri (misal melatih model AI untuk dijual) tanpa dasar yang sah.",
    related: ["pengendali", "dpa"],
    refs: { pdp: "Pasal 1 angka 5; Pasal 51", gdpr: "Art. 4(8), Art. 28" },
  },
  {
    id: "pengendali-bersama",
    term: "Pengendali Bersama",
    en: "Joint Controller",
    category: "dasar",
    short: "Dua pihak atau lebih yang bersama-sama menentukan tujuan & cara pemrosesan.",
    definition:
      "Kondisi ketika dua atau lebih pengendali secara bersama-sama menentukan tujuan dan cara pemrosesan. Mereka harus membuat kesepakatan yang jelas mengenai pembagian peran dan tanggung jawab.",
    analogy: "Seperti dua penyelenggara yang menggelar konser bersama: keduanya ikut memutuskan konsepnya, jadi keduanya ikut bertanggung jawab.",
    example: {
      title: "Program co-branding",
      text: "Bank A dan maskapai B meluncurkan kartu kredit co-branding dan bersama-sama menentukan data nasabah yang dikumpulkan serta program loyalitasnya.",
      points: [
        "Bank A dan maskapai B → pengendali bersama.",
        "Perlu perjanjian yang mengatur siapa yang menjawab permintaan subjek data, siapa yang memberi notifikasi kebocoran, dsb.",
      ],
    },
    related: ["pengendali", "dpa"],
    refs: { pdp: "Pasal 18", gdpr: "Art. 26" },
  },
  {
    id: "pemrosesan",
    term: "Pemrosesan Data Pribadi",
    en: "Processing",
    category: "dasar",
    short: "Hampir semua tindakan terhadap data: dari mengumpulkan hingga menghapus.",
    definition:
      "Setiap operasi terhadap data pribadi, meliputi pemerolehan dan pengumpulan; pengolahan dan penganalisisan; penyimpanan; perbaikan dan pembaruan; penampilan, pengumuman, transfer, penyebarluasan, atau pengungkapan; serta penghapusan atau pemusnahan.",
    analogy: "Siklus hidup data — lahir (dikumpulkan), tumbuh (diolah), tinggal (disimpan), bepergian (ditransfer), dan wafat (dihapus). Semua tahap diatur.",
    example: {
      title: "Formulir pendaftaran webinar",
      text: "Panitia webinar mengumpulkan nama & email peserta lewat Google Form.",
      points: [
        "Mengumpulkan via form → pemrosesan.",
        "Menyimpan di spreadsheet → pemrosesan.",
        "Mengirim email sertifikat → pemrosesan.",
        "Bahkan sekadar MELIHAT data di layar atau MENGHAPUS spreadsheet → tetap pemrosesan.",
      ],
    },
    related: ["data-pribadi", "pembatasan-tujuan"],
    refs: { pdp: "Pasal 16 ayat (1)", gdpr: "Art. 4(2)" },
  },

  /* ======================= DASAR HUKUM PEMROSESAN ======================= */
  {
    id: "consent",
    term: "Persetujuan",
    en: "Consent",
    category: "hukum",
    short: "Subjek data secara sadar dan eksplisit mengizinkan pemrosesan untuk tujuan tertentu.",
    definition:
      "Persetujuan yang sah secara eksplisit dari subjek data untuk satu atau beberapa tujuan tertentu yang telah disampaikan. Agar sah, persetujuan harus: diberikan secara bebas (tanpa paksaan), spesifik per tujuan, didahului informasi yang jelas (informed), dinyatakan secara tegas (bukan diam/kotak yang sudah dicentang), terekam/terdokumentasi, dan dapat ditarik kembali kapan saja semudah memberikannya.",
    analogy: "Seperti tamu yang dipersilakan masuk: Anda harus benar-benar mengundang (bukan diam saja), tahu siapa yang masuk dan untuk apa, serta bisa memintanya keluar kapan pun.",
    example: {
      title: "Newsletter promosi",
      text: "Saat checkout, toko online menampilkan kotak: “☐ Saya bersedia menerima email promosi dan rekomendasi produk.”",
      points: [
        "✅ Sah: kotak TIDAK dicentang otomatis, terpisah dari syarat & ketentuan, ada tautan kebijakan privasi, dan ada tombol “berhenti berlangganan” di setiap email.",
        "❌ Tidak sah: kotak sudah tercentang, atau checkout tidak bisa lanjut kecuali menyetujui promosi (bundling).",
        "Bila pengguna menarik persetujuan, pengiriman promosi harus dihentikan — tetapi pemrosesan yang sudah terjadi sebelumnya tetap sah.",
      ],
    },
    misconception: "Consent bukan ‘dasar hukum terbaik’ untuk semua hal. Jika data memang wajib untuk menjalankan layanan, gunakan dasar kontrak; meminta consent untuk hal yang tidak bisa ditolak justru menyesatkan.",
    related: ["kontrak", "hak-tarik-persetujuan", "transparansi"],
    refs: { pdp: "Pasal 20 ayat (2) huruf a; Pasal 22; Pasal 9", gdpr: "Art. 4(11), Art. 6(1)(a), Art. 7" },
  },
  {
    id: "kontrak",
    term: "Pemenuhan Kewajiban Perjanjian",
    en: "Contractual Necessity",
    category: "hukum",
    short: "Pemrosesan yang benar-benar diperlukan untuk menjalankan kontrak dengan subjek data.",
    definition:
      "Pemrosesan diperlukan untuk memenuhi kewajiban perjanjian di mana subjek data menjadi salah satu pihak, atau untuk memenuhi permintaan subjek data sebelum membuat perjanjian. Kata kuncinya adalah ‘diperlukan’ (necessary) — bukan sekadar ‘berguna’ atau ‘tercantum di syarat & ketentuan’.",
    analogy: "Kurir tidak perlu meminta izin khusus untuk mengetahui alamat Anda — tanpa alamat, paket tidak bisa diantar. Itu bagian inheren dari kontraknya.",
    example: {
      title: "Pengiriman barang & langganan",
      text: "Pelanggan membeli sepatu online dan berlangganan layanan streaming.",
      points: [
        "Nama, alamat, dan nomor HP untuk mengirim sepatu → dasar kontrak ✅.",
        "Data kartu untuk menagih biaya langganan bulanan → dasar kontrak ✅.",
        "Calon nasabah meminta simulasi kredit sebelum tanda tangan → ‘langkah pra-kontrak’ ✅.",
        "Memakai riwayat belanja untuk iklan bertarget di platform lain → BUKAN kontrak ❌ (cari dasar lain, misal consent).",
      ],
    },
    misconception: "Menulis ‘dengan menggunakan aplikasi Anda setuju datanya dipakai untuk iklan’ di T&C tidak menjadikan iklan sebagai kebutuhan kontraktual.",
    related: ["consent", "kepentingan-sah"],
    refs: { pdp: "Pasal 20 ayat (2) huruf b", gdpr: "Art. 6(1)(b)" },
  },
  {
    id: "kewajiban-hukum",
    term: "Pemenuhan Kewajiban Hukum",
    en: "Legal Obligation",
    category: "hukum",
    short: "Pemrosesan diwajibkan oleh peraturan perundang-undangan.",
    definition:
      "Pemrosesan diperlukan untuk memenuhi kewajiban hukum pengendali sesuai peraturan perundang-undangan. Kewajibannya harus bersumber dari hukum yang jelas, bukan sekadar kebijakan internal perusahaan.",
    analogy: "Seperti pengemudi yang wajib membawa SIM — bukan pilihan, tetapi perintah aturan.",
    example: {
      title: "Bank & HRD",
      text: "Bank melakukan KYC (Know Your Customer) dan HRD memotong PPh 21 karyawan.",
      points: [
        "Bank wajib memverifikasi identitas nasabah sesuai regulasi APU-PPT → kewajiban hukum.",
        "HRD wajib memproses NPWP/NIK dan penghasilan karyawan untuk pelaporan pajak → kewajiban hukum.",
        "Menyimpan dokumen transaksi selama periode yang diatur peraturan → kewajiban hukum.",
      ],
    },
    misconception: "Kewajiban kontraktual dengan pihak ketiga (misal permintaan klien) bukan ‘kewajiban hukum’.",
    related: ["kontrak", "retensi"],
    refs: { pdp: "Pasal 20 ayat (2) huruf c", gdpr: "Art. 6(1)(c)" },
  },
  {
    id: "kepentingan-vital",
    term: "Pelindungan Kepentingan Vital",
    en: "Vital Interests",
    category: "hukum",
    short: "Pemrosesan untuk melindungi nyawa atau keselamatan seseorang.",
    definition:
      "Pemrosesan diperlukan untuk melindungi kepentingan vital subjek data atau orang lain — pada dasarnya menyangkut hidup dan mati atau keselamatan fisik. Biasanya dipakai dalam keadaan darurat ketika subjek data tidak mampu memberikan persetujuan.",
    analogy: "Seperti petugas yang mendobrak pintu rumah yang terbakar — tidak sempat meminta izin, karena nyawa dipertaruhkan.",
    example: {
      title: "Keadaan darurat medis",
      text: "Seorang pengendara pingsan setelah kecelakaan dan dibawa ke IGD.",
      points: [
        "IGD mengakses riwayat alergi dan golongan darah pasien dari sistem RS → kepentingan vital ✅.",
        "Petugas menghubungi kontak darurat yang tersimpan di ponsel pasien → kepentingan vital ✅.",
        "Menggunakan data yang sama untuk survei kepuasan pasien → BUKAN kepentingan vital ❌.",
      ],
    },
    misconception: "Dasar ini sempit dan hanya untuk kondisi darurat; tidak untuk pemrosesan rutin yang bisa dilandasi dasar lain.",
    related: ["data-spesifik", "consent"],
    refs: { pdp: "Pasal 20 ayat (2) huruf d", gdpr: "Art. 6(1)(d)" },
  },
  {
    id: "tugas-publik",
    term: "Pelaksanaan Tugas untuk Kepentingan Umum",
    en: "Public Task",
    category: "hukum",
    short: "Pemrosesan dalam rangka tugas kepentingan umum, pelayanan publik, atau kewenangan resmi.",
    definition:
      "Pemrosesan diperlukan untuk pelaksanaan tugas dalam rangka kepentingan umum, pelayanan publik, atau pelaksanaan kewenangan pengendali berdasarkan peraturan perundang-undangan. Umumnya dipakai oleh instansi pemerintah atau badan yang diberi mandat publik.",
    analogy: "Seperti dinas kependudukan yang mencatat kelahiran — itu memang tugas negara yang diberikan undang-undang.",
    example: {
      title: "Layanan pemerintah",
      text: "Dinas Dukcapil, dinas kesehatan, dan sekolah negeri memproses data warga.",
      points: [
        "Dukcapil mengelola data kependudukan untuk penerbitan KTP → tugas publik.",
        "Dinas kesehatan mendata penerima vaksin dalam program imunisasi → tugas publik.",
        "Sistem PPDB sekolah negeri memproses data calon siswa → tugas publik.",
      ],
    },
    misconception: "Perusahaan swasta umumnya tidak bisa memakai dasar ini kecuali menjalankan mandat publik yang diberikan oleh peraturan.",
    related: ["kewajiban-hukum", "kepentingan-sah"],
    refs: { pdp: "Pasal 20 ayat (2) huruf e", gdpr: "Art. 6(1)(e)" },
  },
  {
    id: "kepentingan-sah",
    term: "Kepentingan yang Sah",
    en: "Legitimate Interest",
    category: "hukum",
    short: "Kepentingan wajar pengendali, setelah ditimbang dengan hak subjek data.",
    definition:
      "Pemrosesan untuk memenuhi kepentingan yang sah lainnya dengan memperhatikan tujuan, kebutuhan, dan keseimbangan antara kepentingan pengendali dan hak subjek data. Biasanya diuji dengan tiga tahap (Legitimate Interest Assessment / LIA): (1) uji tujuan — apakah kepentingannya sah? (2) uji kebutuhan — apakah pemrosesan memang perlu? (3) uji keseimbangan — apakah hak subjek data tidak lebih berat?",
    analogy: "Seperti satpam kantor yang memasang CCTV di lobi: kepentingannya wajar (keamanan), tetapi tidak boleh dipasang di toilet karena melanggar ekspektasi privasi.",
    example: {
      title: "Pencegahan fraud & keamanan",
      text: "Marketplace menganalisis pola transaksi untuk mendeteksi penipuan, dan kantor memasang CCTV di area parkir.",
      points: [
        "Deteksi fraud dari pola login/transaksi → kepentingan sah ✅ (melindungi pengguna & platform).",
        "CCTV di area umum kantor + papan pemberitahuan → kepentingan sah ✅.",
        "Memantau aktivitas media sosial pribadi karyawan di luar jam kerja → keseimbangan tidak terpenuhi ❌.",
        "Dokumentasikan LIA dan beri hak keberatan kepada subjek data.",
      ],
    },
    misconception: "Ini bukan ‘dasar cadangan’ ketika dasar lain tidak cocok. Tanpa LIA yang terdokumentasi, klaim kepentingan sah lemah saat diaudit.",
    related: ["hak-keberatan", "akuntabilitas", "consent"],
    refs: { pdp: "Pasal 20 ayat (2) huruf f", gdpr: "Art. 6(1)(f); Recital 47" },
  },

  /* ======================== PRINSIP PELINDUNGAN ======================== */
  {
    id: "pembatasan-tujuan",
    term: "Pembatasan Tujuan",
    en: "Purpose Limitation",
    category: "prinsip",
    short: "Data hanya boleh dipakai untuk tujuan yang sudah ditetapkan dan diinformasikan.",
    definition:
      "Data pribadi dikumpulkan untuk tujuan yang terbatas, spesifik, dan jelas, serta tidak diproses lebih lanjut dengan cara yang tidak sesuai dengan tujuan awal. Penggunaan untuk tujuan baru memerlukan penilaian kesesuaian atau dasar hukum baru.",
    analogy: "Kunci yang dititipkan untuk menyiram tanaman tidak boleh dipakai untuk mengadakan pesta di rumah pemiliknya.",
    example: {
      title: "Nomor HP untuk OTP",
      text: "Aplikasi meminta nomor HP untuk verifikasi login (OTP).",
      points: [
        "Mengirim OTP → sesuai tujuan ✅.",
        "Memakai nomor yang sama untuk telemarketing → tujuan baru, tidak sesuai ❌ (perlu consent terpisah).",
        "Menjual nomor ke pihak ketiga → jelas melanggar ❌.",
      ],
    },
    related: ["minimisasi", "transparansi", "consent"],
    refs: { pdp: "Pasal 16 ayat (2)", gdpr: "Art. 5(1)(b)" },
  },
  {
    id: "minimisasi",
    term: "Minimisasi Data",
    en: "Data Minimisation",
    category: "prinsip",
    short: "Kumpulkan seperlunya saja — memadai, relevan, dan terbatas.",
    definition:
      "Data pribadi yang diproses harus memadai, relevan, dan terbatas pada apa yang diperlukan untuk tujuan pemrosesan. Semakin sedikit data yang disimpan, semakin kecil risiko saat terjadi kebocoran.",
    analogy: "Untuk membuktikan Anda sudah dewasa di pintu masuk, cukup tunjukkan ‘umur ≥ 18’ — tidak perlu menyerahkan fotokopi seluruh KTP.",
    example: {
      title: "Formulir pendaftaran event gratis",
      text: "Formulir meminta: nama, email, NIK, tanggal lahir, nama ibu kandung, dan foto KTP.",
      points: [
        "Yang diperlukan: nama & email (untuk mengirim tiket) ✅.",
        "NIK, nama ibu kandung, foto KTP → berlebihan ❌, dan justru menjadi ‘harta karun’ bagi penipu jika bocor.",
        "Perbaikan: hapus field yang tidak perlu; bila butuh verifikasi usia, cukup centang ‘Saya berusia 18+’.",
      ],
    },
    related: ["pembatasan-tujuan", "privacy-by-design", "retensi"],
    refs: { pdp: "Pasal 16 ayat (2)", gdpr: "Art. 5(1)(c)" },
  },
  {
    id: "akurasi",
    term: "Akurasi",
    en: "Accuracy",
    category: "prinsip",
    short: "Data harus akurat, lengkap, mutakhir, dan tidak menyesatkan.",
    definition:
      "Pengendali wajib memastikan data pribadi akurat, lengkap, tidak menyesatkan, mutakhir, dan dapat dipertanggungjawabkan, serta mengambil langkah wajar untuk memperbaiki atau menghapus data yang tidak akurat.",
    analogy: "Peta yang salah lebih berbahaya daripada tanpa peta — keputusan diambil berdasarkan informasi keliru.",
    example: {
      title: "Skor kredit",
      text: "Seseorang ditolak pengajuan KPR karena tercatat memiliki tunggakan, padahal pinjaman tersebut sudah lunas.",
      points: [
        "Data yang tidak mutakhir menimbulkan kerugian nyata.",
        "Lembaga wajib memperbarui status pelunasan dan memfasilitasi koreksi bila diminta (hak rektifikasi).",
      ],
    },
    related: ["hak-rektifikasi"],
    refs: { pdp: "Pasal 16 ayat (2)", gdpr: "Art. 5(1)(d)" },
  },
  {
    id: "retensi",
    term: "Pembatasan Penyimpanan / Retensi",
    en: "Storage Limitation / Data Retention",
    category: "prinsip",
    short: "Simpan selama diperlukan saja, lalu hapus atau anonimkan.",
    definition:
      "Data pribadi disimpan tidak lebih lama dari yang diperlukan untuk tujuan pemrosesan, kemudian dimusnahkan atau dihapus setelah masa retensi berakhir (atau atas permintaan subjek data), kecuali ada ketentuan hukum yang mewajibkan penyimpanan lebih lama. Organisasi sebaiknya memiliki jadwal retensi (retention schedule) yang terdokumentasi.",
    analogy: "Seperti isi kulkas: makanan yang sudah kedaluwarsa harus dibuang, bukan disimpan ‘siapa tahu nanti perlu’.",
    example: {
      title: "Rekrutmen karyawan",
      text: "HRD menyimpan CV pelamar yang tidak lolos.",
      points: [
        "Jadwal retensi: CV pelamar tidak lolos disimpan 12 bulan untuk kebutuhan talent pool (dengan persetujuan), lalu dihapus otomatis.",
        "Dokumen pajak karyawan disimpan sesuai jangka waktu yang diwajibkan peraturan perpajakan.",
        "Log server dirotasi dan dihapus setelah 90 hari, kecuali sedang dipakai untuk investigasi insiden.",
      ],
    },
    misconception: "‘Simpan selamanya karena storage murah’ bukan alasan yang sah. Data yang tidak lagi diperlukan adalah risiko tanpa manfaat.",
    related: ["minimisasi", "hak-hapus", "anonimisasi"],
    refs: { pdp: "Pasal 16 ayat (2)", gdpr: "Art. 5(1)(e)" },
  },
  {
    id: "transparansi",
    term: "Transparansi",
    en: "Lawfulness, Fairness & Transparency",
    category: "prinsip",
    short: "Subjek data harus tahu data apa yang dipakai, untuk apa, oleh siapa, dan berapa lama.",
    definition:
      "Pemrosesan dilakukan secara sah, adil, dan transparan. Pengendali wajib menyampaikan informasi tentang legalitas, tujuan, jenis dan relevansi data, jangka waktu retensi, rincian pengumpulan, durasi pemrosesan, serta hak subjek data — dalam bahasa yang jelas dan mudah dipahami, biasanya melalui kebijakan privasi (privacy notice).",
    analogy: "Seperti label komposisi pada kemasan makanan: konsumen berhak tahu apa yang ada di dalamnya sebelum memutuskan.",
    example: {
      title: "Kebijakan privasi berlapis",
      text: "Aplikasi ojek online menampilkan pemberitahuan singkat saat meminta akses lokasi, dengan tautan ke kebijakan privasi lengkap.",
      points: [
        "Lapis 1 (pop-up): “Kami memakai lokasi Anda untuk mencarikan driver terdekat dan menghitung tarif.”",
        "Lapis 2 (kebijakan lengkap): jenis data, dasar hukum, pihak penerima, masa retensi, hak & cara menghubungi DPO.",
        "❌ Buruk: dokumen 40 halaman dengan bahasa hukum yang samar, mis. ‘data dapat digunakan untuk keperluan bisnis lainnya’.",
      ],
    },
    related: ["consent", "pembatasan-tujuan", "hak-akses"],
    refs: { pdp: "Pasal 16 ayat (2); Pasal 5; Pasal 21", gdpr: "Art. 5(1)(a), Art. 12–14" },
  },
  {
    id: "integritas-kerahasiaan",
    term: "Integritas & Kerahasiaan (Keamanan)",
    en: "Integrity & Confidentiality (Security)",
    category: "prinsip",
    short: "Lindungi data dari akses tidak sah, perubahan, kehilangan, dan kerusakan.",
    definition:
      "Data pribadi diproses dengan cara yang menjamin keamanannya, termasuk perlindungan dari akses atau pengungkapan tidak sah, pengubahan tidak sah, penyalahgunaan, perusakan, dan penghilangan — melalui langkah teknis (enkripsi, kontrol akses, backup) dan organisasional (kebijakan, pelatihan, NDA).",
    analogy: "Rumah yang aman butuh pintu terkunci (kerahasiaan), CCTV untuk tahu siapa yang mengubah apa (integritas), dan kunci cadangan (ketersediaan).",
    example: {
      title: "Kontrol keamanan di database pelanggan",
      text: "Perusahaan menerapkan berbagai lapis perlindungan untuk database pelanggannya.",
      points: [
        "Teknis: enkripsi at-rest & in-transit (TLS), MFA, role-based access control, logging, backup terenkripsi.",
        "Organisasional: kebijakan least privilege, pelatihan kesadaran keamanan, perjanjian kerahasiaan, prosedur respons insiden.",
        "Uji berkala: vulnerability assessment, penetration test, dan review hak akses.",
      ],
    },
    related: ["enkripsi", "pseudonimisasi", "notifikasi-kebocoran"],
    refs: { pdp: "Pasal 16 ayat (2); Pasal 35", gdpr: "Art. 5(1)(f), Art. 32" },
  },
  {
    id: "akuntabilitas",
    term: "Akuntabilitas",
    en: "Accountability",
    category: "prinsip",
    short: "Patuh saja tidak cukup — harus bisa MEMBUKTIKAN kepatuhan.",
    definition:
      "Pengendali bertanggung jawab atas pemrosesan data pribadi dan wajib dapat menunjukkan pertanggungjawabannya dalam pemenuhan prinsip pelindungan data. Bukti kepatuhan biasanya berupa dokumentasi: ROPA, DPIA, LIA, kebijakan, log persetujuan, kontrak dengan prosesor, dan catatan pelatihan.",
    analogy: "Di ujian matematika, jawaban benar tanpa cara pengerjaan bisa tidak diberi nilai. Regulator ingin melihat ‘cara pengerjaannya’.",
    example: {
      title: "Audit oleh regulator",
      text: "Lembaga pengawas meminta bukti bahwa sebuah startup sah mengirim email marketing.",
      points: [
        "Startup menunjukkan log consent: siapa, kapan, versi teks persetujuan, dan sumbernya (web/app).",
        "Startup menunjukkan ROPA yang memuat aktivitas ‘email marketing’ beserta dasar hukum dan retensinya.",
        "Tanpa dokumentasi ini, klaim ‘pengguna sudah setuju’ sulit dibuktikan.",
      ],
    },
    related: ["ropa", "dpia", "dpo"],
    refs: { pdp: "Pasal 16 ayat (2); Pasal 47", gdpr: "Art. 5(2), Art. 24" },
  },

  /* ===================== TEKNIK KEAMANAN & PRIVASI ===================== */
  {
    id: "enkripsi",
    term: "Enkripsi",
    en: "Encryption",
    category: "teknik",
    demo: "encrypt",
    short: "Mengacak data menjadi ciphertext yang hanya bisa dibuka dengan kunci.",
    definition:
      "Proses mengubah data yang dapat dibaca (plaintext) menjadi bentuk acak (ciphertext) menggunakan algoritma dan kunci kriptografi, sehingga hanya pihak yang memiliki kunci yang dapat mengembalikannya (dekripsi). Bersifat REVERSIBLE (bisa dibalik dengan kunci). Ada dua jenis utama: simetris (satu kunci yang sama, mis. AES) dan asimetris (pasangan kunci publik–privat, mis. RSA/ECC).",
    analogy: "Seperti brankas: isinya tetap utuh, tetapi hanya pemegang kunci yang bisa membukanya. Jika kunci dicuri, brankas tidak lagi berarti.",
    example: {
      title: "Enkripsi di aplikasi perbankan",
      text: "Bank melindungi data nasabah di berbagai tahap.",
      points: [
        "In transit: komunikasi aplikasi ↔ server memakai TLS (HTTPS), sehingga penyadap di Wi-Fi publik hanya melihat data acak.",
        "At rest: database dan backup dienkripsi dengan AES-256; kunci disimpan terpisah di HSM/KMS.",
        "End-to-end: aplikasi chat seperti Signal/WhatsApp mengenkripsi pesan sehingga server pun tidak bisa membacanya.",
        "Jika laptop terenkripsi (BitLocker/FileVault) hilang, risiko kebocoran jauh berkurang selama kuncinya aman.",
      ],
    },
    misconception: "Data terenkripsi tetap data pribadi bagi pemegang kunci. Keamanannya bergantung penuh pada manajemen kunci — enkripsi dengan kunci yang disimpan di sebelah datanya hampir tidak berguna.",
    related: ["hashing", "pseudonimisasi", "integritas-kerahasiaan"],
    refs: { pdp: "Pasal 35 (langkah teknis keamanan)", gdpr: "Art. 32(1)(a); Art. 34(3)(a)" },
  },
  {
    id: "hashing",
    term: "Hashing",
    en: "Cryptographic Hash",
    category: "teknik",
    demo: "hash",
    short: "Mengubah data menjadi ‘sidik jari’ tetap panjangnya yang tidak bisa dibalik.",
    definition:
      "Fungsi satu arah yang mengubah input berukuran apa pun menjadi output (digest) dengan panjang tetap, misalnya SHA-256. Input yang sama selalu menghasilkan hash yang sama; perubahan satu karakter menghasilkan hash yang sangat berbeda (avalanche effect). Secara matematis TIDAK dirancang untuk dibalik. Untuk menyimpan password, gunakan algoritma khusus yang lambat dan memakai salt, seperti bcrypt, scrypt, atau Argon2.",
    analogy: "Seperti blender: Anda bisa membuat jus dari buah, tetapi tidak bisa mengembalikan jus menjadi buah utuh. Namun, jika Anda menebak buahnya dan mem-blendernya, Anda bisa mencocokkan rasanya.",
    example: {
      title: "Penyimpanan password & cek integritas",
      text: "Sebuah aplikasi tidak pernah menyimpan password asli pengguna.",
      points: [
        "Saat registrasi: simpan Argon2(password + salt). Saat login: hitung ulang dan cocokkan.",
        "Jika database bocor, penyerang tidak langsung mendapat password asli.",
        "Hash file installer (SHA-256) dipublikasikan agar pengguna bisa memastikan file tidak dimodifikasi.",
        "⚠️ Hash NIK/nomor HP tanpa salt rahasia mudah ditebak (brute force), karena jumlah kemungkinannya terbatas.",
      ],
    },
    misconception: "Hash dari data pribadi BUKAN anonimisasi. Hash NIK atau email masih dapat dicocokkan ulang (linkable), sehingga umumnya tergolong pseudonimisasi.",
    related: ["enkripsi", "pseudonimisasi", "tokenisasi"],
    refs: { pdp: "Pasal 35 (langkah teknis keamanan)", gdpr: "Art. 32; Recital 26" },
  },
  {
    id: "pseudonimisasi",
    term: "Pseudonimisasi",
    en: "Pseudonymisation",
    category: "teknik",
    demo: "pseudonym",
    short: "Mengganti identitas dengan kode/alias; bisa dikembalikan dengan informasi tambahan yang disimpan terpisah.",
    definition:
      "Pemrosesan data pribadi sedemikian rupa sehingga data tidak lagi dapat dikaitkan dengan subjek data tertentu TANPA menggunakan informasi tambahan, dengan syarat informasi tambahan itu (misalnya tabel pemetaan atau kunci) disimpan terpisah dan dilindungi dengan langkah teknis dan organisasional. Data hasil pseudonimisasi TETAP termasuk data pribadi, karena masih dapat diidentifikasi ulang oleh pihak yang memegang ‘kunci’-nya.",
    analogy: "Seperti nama samaran penulis: pembaca hanya mengenal ‘Pena Hitam’, tetapi penerbit menyimpan kontrak yang menyebut nama aslinya di lemari terkunci.",
    example: {
      title: "Riset klinis di rumah sakit",
      text: "RS membagikan data pasien kepada tim peneliti internal untuk analisis efektivitas obat.",
      points: [
        "Nama “Budi Santoso, NIK 3171…” diganti menjadi kode “PSN-0042”.",
        "Tabel pemetaan PSN-0042 → Budi Santoso disimpan oleh unit rekam medis, terpisah dan dengan akses terbatas.",
        "Peneliti dapat menganalisis usia, diagnosis, dan hasil terapi tanpa mengetahui identitas pasien.",
        "Jika ditemukan efek samping serius, unit rekam medis dapat melakukan re-identifikasi untuk menghubungi pasien.",
      ],
    },
    misconception: "Pseudonim ≠ anonim. Karena masih bisa diidentifikasi ulang, semua kewajiban pelindungan data tetap berlaku — pseudonimisasi hanya mengurangi risiko.",
    related: ["anonimisasi", "tokenisasi", "hashing", "enkripsi"],
    refs: { pdp: "Tidak didefinisikan eksplisit; termasuk langkah teknis keamanan (Pasal 35)", gdpr: "Art. 4(5); Art. 25(1); Art. 32(1)(a); Recital 26, 28" },
  },
  {
    id: "anonimisasi",
    term: "Anonimisasi",
    en: "Anonymisation",
    category: "teknik",
    demo: "anonym",
    short: "Menghilangkan identitas secara permanen sehingga individu tidak dapat diidentifikasi lagi.",
    definition:
      "Proses mengubah data sehingga subjek data tidak lagi dapat diidentifikasi oleh siapa pun dengan cara yang wajar (reasonably likely), dan proses ini TIDAK DAPAT DIBALIK. Data yang benar-benar anonim tidak lagi termasuk data pribadi sehingga berada di luar cakupan regulasi pelindungan data. Teknik yang umum: generalisasi (umur 27 → 25–29), suppression (menghapus kolom/nilai unik), agregasi, penambahan noise, dan k-anonymity.",
    analogy: "Seperti meleburkan perhiasan emas menjadi batangan: emasnya masih ada dan bernilai, tetapi Anda tidak bisa lagi tahu cincin milik siapa yang menjadi bagian dari batangan itu.",
    example: {
      title: "Data terbuka transportasi",
      text: "Pemerintah kota ingin merilis data perjalanan kartu transportasi untuk riset publik.",
      points: [
        "❌ Hanya menghapus nama tetapi menyimpan ID kartu + jam + halte → masih bisa dilacak (pola rumah–kantor unik).",
        "✅ Agregasi: “Halte A, Senin 07.00–08.00: 1.240 penumpang” — tidak ada data per individu.",
        "✅ Generalisasi + suppression: rentang waktu per jam, umur per kelompok, dan baris dengan kombinasi langka dihapus.",
        "Uji risiko re-identifikasi (singling out, linkability, inference) sebelum data dirilis.",
      ],
    },
    misconception: "Kasus terkenal: penelitian menunjukkan sebagian besar warga AS dapat diidentifikasi unik hanya dari kombinasi kode pos, tanggal lahir, dan jenis kelamin. Menghapus nama saja tidak cukup untuk disebut anonim.",
    related: ["pseudonimisasi", "k-anonymity", "data-masking"],
    refs: { pdp: "Data yang tidak dapat diidentifikasi berada di luar definisi data pribadi (Pasal 1 angka 1)", gdpr: "Recital 26; WP29 Opinion 05/2014" },
  },
  {
    id: "k-anonymity",
    term: "k-Anonymity",
    en: "k-Anonymity",
    category: "teknik",
    demo: "anonym",
    short: "Setiap orang ‘bersembunyi’ di antara minimal k orang lain yang terlihat identik.",
    definition:
      "Model privasi yang mensyaratkan bahwa untuk setiap kombinasi quasi-identifier (atribut yang tidak langsung menyebut identitas tetapi bisa mengarah ke individu, seperti umur, kode pos, jenis kelamin), terdapat minimal k baris data yang identik. Semakin besar k, semakin sulit melacak satu individu. Kelemahannya: jika semua orang dalam satu kelompok memiliki atribut sensitif yang sama (mis. penyakit yang sama), informasi tetap bocor — karena itu ada pengembangan seperti l-diversity dan t-closeness.",
    analogy: "Seperti bersembunyi di kerumunan berseragam sama: jika ada 5 orang berpenampilan identik (k=5), sulit menebak yang mana Anda.",
    example: {
      title: "Dataset survei kesehatan",
      text: "Dataset berisi kolom: umur, kode pos, jenis kelamin, diagnosis.",
      points: [
        "Sebelum: (34, 12950, P, Diabetes) → satu-satunya baris dengan kombinasi itu → bisa dikenali.",
        "Sesudah generalisasi: (30–39, 129**, P, Diabetes) → ada 4 baris lain yang sama → k = 5.",
        "Coba demo interaktif di bawah untuk melihat bagaimana nilai k berubah.",
      ],
    },
    related: ["anonimisasi", "pseudonimisasi"],
    refs: { pdp: "—", gdpr: "WP29 Opinion 05/2014 on Anonymisation Techniques" },
  },
  {
    id: "tokenisasi",
    term: "Tokenisasi",
    en: "Tokenization",
    category: "teknik",
    demo: "token",
    short: "Mengganti data sensitif dengan token acak; data asli disimpan di ‘vault’.",
    definition:
      "Teknik mengganti nilai sensitif (misalnya nomor kartu kredit) dengan token acak yang tidak memiliki hubungan matematis dengan nilai aslinya. Pemetaan token → nilai asli hanya tersimpan di token vault yang sangat terlindungi. Berbeda dengan enkripsi, token tidak bisa ‘dipecahkan’ dengan menebak kunci — satu-satunya cara adalah mengakses vault. Tokenisasi adalah salah satu bentuk pseudonimisasi.",
    analogy: "Seperti tiket penitipan jaket di gedung konser: tiket nomor 57 tidak memberi petunjuk apa pun tentang jaket Anda; hanya petugas penitipan yang tahu jaket mana yang bernomor 57.",
    example: {
      title: "Pembayaran kartu (PCI DSS)",
      text: "Merchant online menerima pembayaran kartu kredit pelanggan.",
      points: [
        "Nomor kartu 4111 1111 1111 1111 dikirim langsung ke payment gateway.",
        "Gateway mengembalikan token “tok_9fA2xQ…” yang disimpan merchant untuk transaksi berulang.",
        "Jika database merchant bocor, penyerang hanya mendapatkan token yang tidak berguna di luar sistem gateway.",
        "Ruang lingkup audit PCI DSS di sisi merchant menjadi jauh lebih kecil.",
      ],
    },
    related: ["pseudonimisasi", "enkripsi", "data-masking"],
    refs: { pdp: "Pasal 35 (langkah teknis keamanan)", gdpr: "Art. 4(5); Art. 32" },
  },
  {
    id: "data-masking",
    term: "Data Masking",
    en: "Data Masking / Redaction",
    category: "teknik",
    demo: "mask",
    short: "Menyembunyikan sebagian data saat ditampilkan, mis. 0812****7890.",
    definition:
      "Teknik menyamarkan sebagian atau seluruh nilai data agar tidak terlihat oleh pihak yang tidak memerlukannya. Ada dua bentuk: static masking (salinan data diubah permanen, mis. untuk lingkungan testing) dan dynamic masking (data asli tetap utuh, tetapi tampilan disamarkan sesuai peran pengguna). Redaksi adalah penghitaman informasi pada dokumen.",
    analogy: "Seperti struk ATM yang hanya mencetak 4 digit terakhir nomor kartu Anda — cukup untuk mengenali, tidak cukup untuk disalahgunakan.",
    example: {
      title: "Customer service & lingkungan testing",
      text: "Agen CS perlu memverifikasi pelanggan tanpa melihat data lengkap.",
      points: [
        "Layar CS menampilkan: email b***i@gmail.com, HP 0812****7890, NIK 3171********0001.",
        "Supervisor dengan peran khusus dapat melihat data lengkap (dynamic masking berbasis role).",
        "Database untuk developer/testing diisi data yang sudah di-mask atau data sintetis, bukan data produksi asli.",
        "Dokumen putusan yang dipublikasikan diredaksi: nama dan alamat para pihak dihitamkan.",
      ],
    },
    misconception: "Masking pada tampilan (front-end) tidak melindungi data di database atau API. Jika API tetap mengirim data lengkap, data bisa diintip lewat developer tools.",
    related: ["tokenisasi", "pseudonimisasi", "minimisasi"],
    refs: { pdp: "Pasal 35 (langkah teknis keamanan)", gdpr: "Art. 25; Art. 32" },
  },
  {
    id: "differential-privacy",
    term: "Differential Privacy",
    en: "Differential Privacy",
    category: "teknik",
    short: "Menambahkan ‘noise’ terukur pada hasil statistik agar data individu tidak bisa disimpulkan.",
    definition:
      "Pendekatan matematis yang memberi jaminan bahwa hasil analisis hampir sama, baik data satu individu tertentu dimasukkan maupun tidak. Caranya dengan menambahkan noise acak yang dikalibrasi (dikendalikan oleh parameter ε / epsilon — semakin kecil ε, semakin privat tetapi semakin kurang akurat). Dipakai oleh lembaga sensus dan perusahaan teknologi untuk statistik penggunaan.",
    analogy: "Seperti survei ‘lempar koin’: responden menjawab jujur jika koin keluar angka, dan menjawab acak jika gambar. Secara kelompok hasilnya tetap akurat, tetapi jawaban individu tidak bisa dipastikan.",
    example: {
      title: "Statistik aplikasi",
      text: "Pembuat keyboard ponsel ingin mengetahui emoji yang paling populer tanpa mengetahui emoji yang diketik setiap orang.",
      points: [
        "Setiap perangkat mengirim data yang sudah diberi noise acak (local differential privacy).",
        "Server menggabungkan jutaan laporan: tren populer tetap terlihat jelas.",
        "Satu laporan individu tidak dapat dipastikan kebenarannya.",
      ],
    },
    related: ["anonimisasi", "k-anonymity"],
    refs: { pdp: "—", gdpr: "Relevan dengan Recital 26 (uji identifiability)" },
  },

  /* =========================== HAK SUBJEK DATA =========================== */
  {
    id: "hak-akses",
    term: "Hak Akses",
    en: "Right of Access",
    category: "hak",
    short: "Hak mengetahui dan mendapatkan salinan data pribadi yang diproses.",
    definition:
      "Subjek data berhak mendapatkan informasi tentang kejelasan identitas, dasar kepentingan hukum, tujuan permintaan dan penggunaan data, serta akuntabilitas pihak yang meminta data. Subjek data juga berhak mengakses dan memperoleh salinan data pribadi tentang dirinya. Permintaan ini sering disebut DSAR (Data Subject Access Request).",
    analogy: "Seperti meminta mutasi rekening ke bank: Anda berhak tahu apa saja yang tercatat atas nama Anda.",
    example: {
      title: "Permintaan ke e-commerce",
      text: "Rina bertanya: “Data apa saja yang kalian simpan tentang saya?”",
      points: [
        "Perusahaan memverifikasi identitas Rina terlebih dahulu (agar data tidak diberikan ke orang lain).",
        "Perusahaan memberikan salinan data: profil, alamat, riwayat pesanan, log login, segmen marketing, dan pihak penerima data.",
        "Respons diberikan dalam batas waktu yang ditetapkan peraturan, dalam format yang mudah dibaca.",
      ],
    },
    related: ["hak-portabilitas", "transparansi", "subjek-data"],
    refs: { pdp: "Pasal 5; Pasal 7", gdpr: "Art. 15" },
  },
  {
    id: "hak-rektifikasi",
    term: "Hak Perbaikan (Rektifikasi)",
    en: "Right to Rectification",
    category: "hak",
    short: "Hak melengkapi, memperbarui, atau memperbaiki data yang salah.",
    definition:
      "Subjek data berhak melengkapi, memperbarui, dan/atau memperbaiki kesalahan dan/atau ketidakakuratan data pribadi tentang dirinya sesuai dengan tujuan pemrosesan.",
    analogy: "Seperti mengoreksi salah ketik nama di ijazah — data yang salah bisa berdampak panjang.",
    example: {
      title: "Alamat & status lama",
      text: "Andi pindah rumah dan status pernikahannya berubah, tetapi asuransinya masih mencatat data lama.",
      points: [
        "Andi mengajukan perubahan melalui aplikasi atau formulir.",
        "Perusahaan asuransi memperbarui data dan, jika pernah membagikannya ke mitra, menginformasikan pembaruan tersebut.",
      ],
    },
    related: ["akurasi", "hak-akses"],
    refs: { pdp: "Pasal 6", gdpr: "Art. 16" },
  },
  {
    id: "hak-hapus",
    term: "Hak Penghapusan",
    en: "Right to Erasure (‘Right to be Forgotten’)",
    category: "hak",
    short: "Hak meminta pemrosesan dihentikan dan data dihapus/dimusnahkan.",
    definition:
      "Subjek data berhak mengakhiri pemrosesan, menghapus, dan/atau memusnahkan data pribadi tentang dirinya sesuai ketentuan. Hak ini tidak mutlak: data dapat tetap disimpan bila ada kewajiban hukum, untuk kepentingan hukum (pembuktian sengketa), atau alasan sah lain yang diatur peraturan.",
    analogy: "Seperti meminta foto Anda dicabut dari papan pengumuman setelah acara selesai.",
    example: {
      title: "Menutup akun aplikasi",
      text: "Dewi menutup akun media sosialnya dan meminta semua datanya dihapus.",
      points: [
        "Profil, foto, postingan, dan daftar pertemanan dihapus dari sistem produksi; backup dihapus mengikuti siklus rotasinya.",
        "Data transaksi pembelian iklan yang wajib disimpan untuk keperluan pajak tetap disimpan hingga masa retensi hukum berakhir (pengecualian).",
        "Mitra/prosesor yang menerima data juga diinstruksikan untuk menghapus.",
      ],
    },
    misconception: "‘Dihapus’ bukan berarti sekadar disembunyikan (soft delete / flag is_deleted) bila datanya masih bisa diakses dan dipakai.",
    related: ["retensi", "hak-tarik-persetujuan"],
    refs: { pdp: "Pasal 8; Pasal 43–44", gdpr: "Art. 17" },
  },
  {
    id: "hak-pembatasan",
    term: "Hak Menunda / Membatasi Pemrosesan",
    en: "Right to Restriction of Processing",
    category: "hak",
    short: "Hak meminta data ‘dibekukan’ sementara — disimpan tetapi tidak dipakai.",
    definition:
      "Subjek data berhak menunda atau membatasi pemrosesan data pribadinya secara proporsional sesuai tujuan pemrosesan. Umumnya dipakai saat akurasi data sedang dipersoalkan, atau saat subjek data mengajukan keberatan dan keputusannya belum keluar.",
    analogy: "Seperti memblokir sementara kartu ATM yang dicurigai — kartunya tidak dihapus, tetapi tidak bisa dipakai sampai masalahnya jelas.",
    example: {
      title: "Sengketa data kredit",
      text: "Nasabah menyatakan data tunggakannya keliru dan meminta penyelidikan.",
      points: [
        "Selama investigasi, data tersebut ditandai ‘dibatasi’ dan tidak dipakai untuk penilaian kredit baru.",
        "Setelah terbukti keliru → diperbaiki; jika terbukti benar → pembatasan dicabut dan nasabah diberi tahu.",
      ],
    },
    related: ["hak-rektifikasi", "hak-keberatan"],
    refs: { pdp: "Pasal 11", gdpr: "Art. 18" },
  },
  {
    id: "hak-portabilitas",
    term: "Hak Portabilitas / Interoperabilitas",
    en: "Right to Data Portability",
    category: "hak",
    short: "Hak memperoleh data dalam format terstruktur & umum dipakai, lalu memindahkannya.",
    definition:
      "Subjek data berhak mendapatkan dan/atau menggunakan data pribadi tentang dirinya dari pengendali dalam bentuk yang sesuai dengan struktur dan/atau format yang lazim digunakan atau dapat dibaca oleh sistem elektronik, serta mengirimkannya ke pengendali lain.",
    analogy: "Seperti pindah operator seluler tanpa ganti nomor — identitas digital Anda ikut pindah, tidak terkunci di satu penyedia.",
    example: {
      title: "Pindah layanan musik / fitness",
      text: "Pengguna ingin pindah dari aplikasi lari A ke aplikasi B tanpa kehilangan riwayat latihan.",
      points: [
        "Aplikasi A menyediakan fitur ‘Unduh data saya’ dalam format JSON/CSV/GPX.",
        "Pengguna mengimpor file tersebut ke aplikasi B.",
        "Bandingkan: hak akses = melihat salinan; portabilitas = salinan dalam format yang bisa dipindahkan dan diolah mesin.",
      ],
    },
    related: ["hak-akses"],
    refs: { pdp: "Pasal 13", gdpr: "Art. 20" },
  },
  {
    id: "hak-keberatan",
    term: "Hak Keberatan atas Keputusan Otomatis & Profiling",
    en: "Right to Object / Automated Decision-Making",
    category: "hak",
    short: "Hak menolak keputusan yang diambil sepenuhnya oleh mesin yang berdampak signifikan.",
    definition:
      "Subjek data berhak mengajukan keberatan atas tindakan pengambilan keputusan yang hanya didasarkan pada pemrosesan secara otomatis, termasuk pemrofilan (profiling), yang menimbulkan akibat hukum atau berdampak signifikan pada dirinya. Dalam GDPR juga dikenal hak keberatan umum terhadap pemrosesan berbasis kepentingan sah dan hak mutlak menolak direct marketing.",
    analogy: "Seperti meminta ‘bicara dengan manusia’ ketika mesin penjawab otomatis menolak permohonan Anda tanpa penjelasan.",
    example: {
      title: "Penolakan pinjaman otomatis",
      text: "Aplikasi paylater menolak pengajuan dalam 3 detik berdasarkan skor algoritma.",
      points: [
        "Pengguna berhak tahu bahwa keputusan dibuat otomatis dan logika umumnya.",
        "Pengguna dapat mengajukan keberatan dan meminta peninjauan oleh manusia (human review).",
        "Perusahaan sebaiknya mengaudit model untuk bias (misal diskriminasi berdasarkan wilayah atau gender).",
      ],
    },
    related: ["kepentingan-sah", "dpia", "hak-pembatasan"],
    refs: { pdp: "Pasal 10", gdpr: "Art. 21, Art. 22" },
  },
  {
    id: "hak-tarik-persetujuan",
    term: "Hak Menarik Kembali Persetujuan",
    en: "Right to Withdraw Consent",
    category: "hak",
    short: "Persetujuan yang sudah diberikan boleh dicabut kapan saja.",
    definition:
      "Subjek data berhak menarik kembali persetujuan pemrosesan data pribadi yang telah diberikan kepada pengendali. Setelah ditarik, pengendali wajib menghentikan pemrosesan yang berbasis persetujuan tersebut. Penarikan tidak membuat pemrosesan sebelumnya menjadi tidak sah.",
    analogy: "Seperti berhenti berlangganan majalah: kiriman bulan depan berhenti, tetapi majalah yang sudah diterima tidak ‘menjadi ilegal’.",
    example: {
      title: "Izin lokasi & email promosi",
      text: "Pengguna mematikan izin lokasi di pengaturan aplikasi dan menekan ‘unsubscribe’ di email promosi.",
      points: [
        "Aplikasi berhenti mengumpulkan lokasi untuk rekomendasi berbasis lokasi.",
        "Sistem email marketing menandai pengguna sebagai opt-out dan berhenti mengirim promosi.",
        "Menarik persetujuan harus semudah memberikannya — tidak boleh harus menelepon CS atau mengirim surat.",
      ],
    },
    related: ["consent", "hak-hapus"],
    refs: { pdp: "Pasal 9", gdpr: "Art. 7(3)" },
  },

  /* ======================= TATA KELOLA & KEPATUHAN ======================= */
  {
    id: "dpia",
    term: "Penilaian Dampak Pelindungan Data Pribadi (DPIA)",
    en: "Data Protection Impact Assessment",
    category: "tatakelola",
    short: "Analisis risiko privasi SEBELUM memulai pemrosesan berisiko tinggi.",
    definition:
      "Proses sistematis untuk mengidentifikasi, menilai, dan memitigasi risiko terhadap subjek data sebelum pemrosesan berisiko tinggi dimulai. Wajib antara lain untuk: keputusan otomatis berdampak signifikan, pemrosesan data spesifik, pemrosesan skala besar, pemantauan sistematis, pencocokan/penggabungan kelompok data, penggunaan teknologi baru, dan pemrosesan yang membatasi hak subjek data.",
    analogy: "Seperti analisis dampak lingkungan (AMDAL) sebelum membangun pabrik — risikonya dinilai dan dimitigasi sebelum pembangunan, bukan sesudah ada pencemaran.",
    example: {
      title: "Face recognition untuk absensi",
      text: "Perusahaan ingin mengganti fingerprint dengan absensi berbasis pengenalan wajah.",
      points: [
        "Deskripsi: data biometrik wajah 2.000 karyawan, vendor cloud luar negeri.",
        "Risiko: kebocoran biometrik (tidak bisa ‘diganti’ seperti password), akurasi rendah pada kondisi tertentu, transfer lintas negara.",
        "Mitigasi: simpan template (bukan foto), enkripsi, opsi alternatif (kartu/PIN) bagi yang menolak, DPA dengan vendor, retensi dihapus saat karyawan keluar.",
        "Keputusan: lanjut dengan mitigasi, atau konsultasi ke lembaga pengawas bila risiko residual masih tinggi.",
      ],
    },
    related: ["data-spesifik", "privacy-by-design", "akuntabilitas"],
    refs: { pdp: "Pasal 34", gdpr: "Art. 35, Art. 36" },
  },
  {
    id: "dpo",
    term: "Pejabat Pelindungan Data Pribadi (DPO)",
    en: "Data Protection Officer",
    category: "tatakelola",
    short: "Orang/fungsi yang mengawasi kepatuhan pelindungan data di organisasi.",
    definition:
      "Pejabat atau petugas yang ditunjuk untuk memastikan kepatuhan terhadap prinsip pelindungan data. Penunjukan wajib bila pemrosesan dilakukan untuk kepentingan pelayanan publik, kegiatan inti pengendali memerlukan pemantauan teratur dan sistematis atas data pribadi berskala besar, atau kegiatan inti berupa pemrosesan berskala besar atas data spesifik/tindak pidana. Tugasnya: memberi informasi dan saran, memantau kepatuhan, memberi saran terkait DPIA, serta berkoordinasi sebagai narahubung.",
    analogy: "Seperti wasit internal: bukan pemain yang mencetak gol, tetapi memastikan permainan sesuai aturan dan berani meniup peluit.",
    example: {
      title: "Bank digital",
      text: "Sebuah bank digital memproses data keuangan jutaan nasabah setiap hari.",
      points: [
        "Wajib menunjuk DPO karena memproses data spesifik (keuangan) dalam skala besar.",
        "DPO meninjau DPIA fitur baru, menjawab pertanyaan nasabah, memantau pelatihan, dan menjadi kontak regulator.",
        "DPO harus independen — idealnya tidak merangkap posisi yang menentukan tujuan pemrosesan (mis. Head of Marketing) agar tidak ada konflik kepentingan.",
      ],
    },
    related: ["dpia", "akuntabilitas", "ropa"],
    refs: { pdp: "Pasal 53, Pasal 54", gdpr: "Art. 37–39" },
  },
  {
    id: "ropa",
    term: "Catatan Aktivitas Pemrosesan (ROPA)",
    en: "Record of Processing Activities",
    category: "tatakelola",
    short: "Inventaris semua aktivitas pemrosesan data di organisasi.",
    definition:
      "Dokumen yang merekam seluruh kegiatan pemrosesan data pribadi, biasanya memuat: nama aktivitas, tujuan, dasar hukum, kategori subjek data, kategori data, penerima, transfer luar negeri, masa retensi, dan langkah keamanan. ROPA menjadi fondasi bagi DPIA, respons DSAR, dan penanganan insiden.",
    analogy: "Seperti daftar inventaris gudang: Anda tidak bisa melindungi barang yang Anda sendiri tidak tahu keberadaannya.",
    example: {
      title: "Contoh satu baris ROPA",
      text: "Divisi HR — aktivitas penggajian.",
      points: [
        "Tujuan: pembayaran gaji & pelaporan pajak.",
        "Dasar hukum: kontrak kerja + kewajiban hukum perpajakan.",
        "Data: nama, NIK, NPWP, rekening, gaji (data keuangan pribadi = spesifik).",
        "Penerima: bank payroll, kantor pajak, vendor SaaS payroll (prosesor).",
        "Retensi: sesuai ketentuan perpajakan & ketenagakerjaan. Keamanan: RBAC, enkripsi, MFA.",
      ],
    },
    related: ["akuntabilitas", "dpia", "dpo"],
    refs: { pdp: "Pasal 31", gdpr: "Art. 30" },
  },
  {
    id: "privacy-by-design",
    term: "Privacy by Design & by Default",
    en: "Data Protection by Design and by Default",
    category: "tatakelola",
    short: "Privasi dibangun sejak tahap desain, dan pengaturan bawaan dibuat paling privat.",
    definition:
      "By design: pelindungan data dipertimbangkan sejak awal perancangan sistem/produk, bukan ditambahkan belakangan (misal: minimisasi, pseudonimisasi, enkripsi, kontrol akses). By default: pengaturan bawaan hanya memproses data yang diperlukan untuk tujuan tertentu — pengguna yang ingin berbagi lebih banyak harus memilihnya secara aktif.",
    analogy: "Memasang sabuk pengaman dan airbag sejak mobil dirancang jauh lebih efektif daripada menambalnya setelah mobil diproduksi.",
    example: {
      title: "Aplikasi media sosial baru",
      text: "Tim produk merancang fitur profil pengguna.",
      points: [
        "By default: profil baru diatur ‘privat’, lokasi tidak dibagikan, dan tanggal lahir tidak ditampilkan publik.",
        "By design: password di-hash dengan Argon2, data analitik dipseudonimisasi, log otomatis dihapus setelah 90 hari.",
        "Privacy review masuk ke checklist Definition of Done di setiap sprint.",
      ],
    },
    related: ["minimisasi", "dpia", "pseudonimisasi"],
    refs: { pdp: "Tersirat dalam prinsip Pasal 16 dan kewajiban keamanan Pasal 35", gdpr: "Art. 25" },
  },
  {
    id: "dpa",
    term: "Perjanjian Pemrosesan Data (DPA)",
    en: "Data Processing Agreement",
    category: "tatakelola",
    short: "Kontrak antara pengendali dan prosesor yang mengatur cara data diproses.",
    definition:
      "Perjanjian tertulis antara pengendali dan prosesor yang mengatur: objek dan durasi pemrosesan, jenis data, kewajiban memproses hanya berdasarkan instruksi, kerahasiaan personel, langkah keamanan, ketentuan sub-prosesor, bantuan untuk memenuhi hak subjek data dan notifikasi insiden, pengembalian/penghapusan data di akhir kontrak, serta hak audit.",
    analogy: "Seperti surat perintah kerja kepada kontraktor: apa yang boleh dikerjakan, standar keamanannya, dan apa yang harus dilakukan setelah pekerjaan selesai.",
    example: {
      title: "Langganan CRM berbasis cloud",
      text: "Perusahaan berlangganan CRM SaaS untuk menyimpan data prospek pelanggan.",
      points: [
        "DPA mewajibkan vendor memberi tahu insiden keamanan tanpa penundaan (mis. ≤ 24 jam) agar pengendali bisa memenuhi tenggat notifikasinya.",
        "Vendor wajib meminta persetujuan sebelum memakai sub-prosesor baru.",
        "Saat kontrak berakhir, data dikembalikan lalu dihapus, dengan sertifikat penghapusan.",
      ],
    },
    related: ["prosesor", "pengendali-bersama", "transfer-lintas-negara"],
    refs: { pdp: "Pasal 51", gdpr: "Art. 28" },
  },
  {
    id: "notifikasi-kebocoran",
    term: "Notifikasi Kegagalan Pelindungan Data",
    en: "Personal Data Breach Notification",
    category: "tatakelola",
    short: "Kewajiban melapor kebocoran data dalam tenggat waktu tertentu.",
    definition:
      "Ketika terjadi kegagalan pelindungan data pribadi (kebocoran, akses tidak sah, kehilangan, perusakan), pengendali wajib menyampaikan pemberitahuan tertulis kepada subjek data dan lembaga pengawas. UU PDP menetapkan paling lambat 3 × 24 jam; GDPR menetapkan 72 jam ke otoritas pengawas sejak mengetahui insiden. Pemberitahuan minimal memuat: data yang terungkap, kapan dan bagaimana terjadi, serta upaya penanganan dan pemulihan.",
    analogy: "Seperti alarm kebakaran: semakin cepat dibunyikan, semakin banyak orang bisa menyelamatkan diri (mengganti password, memblokir kartu).",
    example: {
      title: "Database pelanggan bocor",
      text: "Tim keamanan menemukan dump database pelanggan dijual di forum gelap pada Senin pukul 10.00.",
      points: [
        "Jam 0–6: tahan (containment) — tutup celah, rotasi kredensial, simpan bukti forensik.",
        "Jam 6–24: analisis — data apa yang bocor, berapa orang, sejak kapan, apa risikonya.",
        "≤ 72 jam: kirim notifikasi ke subjek data & lembaga pengawas: data yang bocor, waktu dan cara kejadian, langkah penanganan, serta saran (ganti password, waspada phishing).",
        "Setelahnya: root-cause analysis, perbaikan kontrol, dokumentasi insiden.",
      ],
    },
    misconception: "Data yang terenkripsi kuat (dengan kunci yang tidak ikut bocor) dapat menurunkan risiko secara signifikan — GDPR bahkan membebaskan kewajiban memberi tahu subjek data dalam kondisi tersebut.",
    related: ["integritas-kerahasiaan", "enkripsi", "dpa"],
    refs: { pdp: "Pasal 46", gdpr: "Art. 4(12), Art. 33, Art. 34" },
  },
  {
    id: "transfer-lintas-negara",
    term: "Transfer Data Lintas Negara",
    en: "Cross-Border Data Transfer",
    category: "tatakelola",
    short: "Mengirim data ke luar wilayah hukum hanya dengan perlindungan yang setara.",
    definition:
      "Pengendali dapat mentransfer data pribadi ke luar wilayah hukum Indonesia dengan memperhatikan urutan berikut: (1) negara tujuan memiliki tingkat pelindungan data yang setara atau lebih tinggi; jika tidak, (2) tersedia pelindungan data yang memadai dan bersifat mengikat (misalnya perjanjian/klausul kontrak standar, aturan korporasi mengikat); jika tidak, (3) mendapatkan persetujuan subjek data. Dalam GDPR dikenal adequacy decision, Standard Contractual Clauses (SCC), dan Binding Corporate Rules (BCR).",
    analogy: "Seperti menitipkan anak ke luar kota: pastikan pengasuh di sana memiliki standar perlindungan yang sama baiknya, atau ada perjanjian tertulis yang jelas.",
    example: {
      title: "Server di luar negeri",
      text: "Startup Indonesia memakai layanan email marketing yang servernya berada di Amerika Serikat.",
      points: [
        "Cek tingkat pelindungan negara tujuan; jika belum setara, gunakan perjanjian/klausul kontrak yang mengikat.",
        "Lakukan transfer impact assessment, terapkan enkripsi, dan catat transfer di ROPA.",
        "Informasikan transfer ini di kebijakan privasi.",
      ],
    },
    related: ["dpa", "ropa", "consent"],
    refs: { pdp: "Pasal 56", gdpr: "Art. 44–49" },
  },
  {
    id: "cookie",
    term: "Cookie & Pelacakan Online",
    en: "Cookies & Online Tracking",
    category: "tatakelola",
    short: "File kecil di browser untuk mengingat atau melacak pengguna.",
    definition:
      "Cookie adalah file kecil yang disimpan situs di browser. Strictly necessary cookies (login, keranjang belanja) diperlukan agar layanan berjalan. Analytics dan advertising cookies (terutama third-party) melacak perilaku untuk statistik atau iklan bertarget — umumnya memerlukan persetujuan. ID cookie, pixel, dan fingerprint perangkat termasuk data pribadi bila dapat dihubungkan ke individu.",
    analogy: "Seperti cap tangan di acara: cap untuk masuk-keluar venue wajar (necessary); tetapi jika cap itu dipakai untuk mencatat Anda mampir ke booth mana saja lalu dijual ke sponsor, itu perlu izin Anda.",
    example: {
      title: "Banner cookie yang baik",
      text: "Situs berita menampilkan banner cookie saat pertama kali dikunjungi.",
      points: [
        "Tombol ‘Terima semua’ dan ‘Tolak semua’ sama menonjolnya.",
        "Pengaturan per kategori: Diperlukan (selalu aktif), Analitik (off), Iklan (off).",
        "Tracker iklan baru dimuat SETELAH pengguna setuju, bukan sebelumnya.",
        "❌ Dark pattern: tombol ‘Tolak’ disembunyikan atau dibuat abu-abu kecil.",
      ],
    },
    related: ["consent", "transparansi", "data-pribadi"],
    refs: { pdp: "Berlaku prinsip & dasar hukum Pasal 16 dan Pasal 20", gdpr: "Art. 6; ePrivacy Directive Art. 5(3)" },
  },
];

/* Kuis studi kasus: dasar hukum mana yang paling tepat? */
const QUIZ = [
  {
    q: "Toko online memproses alamat pelanggan untuk mengirimkan paket yang sudah dibeli.",
    options: ["consent", "kontrak", "kepentingan-sah", "kewajiban-hukum"],
    answer: "kontrak",
    why: "Tanpa alamat, kewajiban toko (mengirim barang) tidak dapat dipenuhi. Pemrosesan ini benar-benar diperlukan untuk menjalankan perjanjian jual beli.",
  },
  {
    q: "Perusahaan memotong PPh 21 dari gaji karyawan dan melaporkannya ke kantor pajak beserta NPWP/NIK.",
    options: ["kontrak", "kewajiban-hukum", "tugas-publik", "consent"],
    answer: "kewajiban-hukum",
    why: "Pemotongan dan pelaporan pajak diwajibkan oleh peraturan perpajakan. Perusahaan tidak bisa memilih untuk tidak melakukannya.",
  },
  {
    q: "Aplikasi ingin mengirim newsletter promosi dan rekomendasi produk ke email pengguna.",
    options: ["kontrak", "consent", "kepentingan-vital", "kewajiban-hukum"],
    answer: "consent",
    why: "Promosi bukan bagian inheren dari layanan. Gunakan persetujuan eksplisit (opt-in, tidak tercentang otomatis) dan sediakan cara mudah untuk berhenti berlangganan.",
  },
  {
    q: "Pengunjung mal pingsan; petugas medis membuka data golongan darah dan alergi di kartu identitas medisnya.",
    options: ["consent", "kepentingan-vital", "kepentingan-sah", "tugas-publik"],
    answer: "kepentingan-vital",
    why: "Ada ancaman terhadap nyawa dan subjek data tidak dapat memberikan persetujuan. Inilah situasi klasik kepentingan vital.",
  },
  {
    q: "Dinas Kependudukan memproses data kelahiran untuk menerbitkan akta lahir.",
    options: ["tugas-publik", "consent", "kontrak", "kepentingan-sah"],
    answer: "tugas-publik",
    why: "Pencatatan sipil merupakan kewenangan instansi pemerintah berdasarkan undang-undang dalam rangka pelayanan publik.",
  },
  {
    q: "Marketplace menganalisis pola login dan transaksi untuk mendeteksi akun yang diretas dan transaksi penipuan.",
    options: ["consent", "kepentingan-sah", "kepentingan-vital", "tugas-publik"],
    answer: "kepentingan-sah",
    why: "Mencegah fraud adalah kepentingan wajar yang juga melindungi pengguna, dan pengguna dapat memperkirakannya. Dokumentasikan Legitimate Interest Assessment (LIA).",
  },
  {
    q: "Bank memverifikasi identitas (KYC) calon nasabah sebelum membuka rekening, sesuai ketentuan anti pencucian uang.",
    options: ["kewajiban-hukum", "consent", "kepentingan-sah", "kepentingan-vital"],
    answer: "kewajiban-hukum",
    why: "Prinsip mengenali nasabah (APU-PPT) diwajibkan oleh regulasi sektor jasa keuangan. Meski juga terkait pembukaan rekening, sumber utamanya adalah kewajiban hukum.",
  },
  {
    q: "Calon pembeli rumah meminta simulasi cicilan KPR dan menyerahkan data penghasilannya sebelum menandatangani akad.",
    options: ["kontrak", "consent", "kepentingan-sah", "kewajiban-hukum"],
    answer: "kontrak",
    why: "Dasar ‘perjanjian’ juga mencakup langkah pra-kontrak atas permintaan subjek data — di sini calon nasabah sendiri yang meminta simulasi.",
  },
  {
    q: "Kantor memasang CCTV di area parkir dan lobi (bukan toilet/ruang ganti), dengan papan pemberitahuan.",
    options: ["consent", "kepentingan-sah", "kewajiban-hukum", "kontrak"],
    answer: "kepentingan-sah",
    why: "Keamanan aset dan orang adalah kepentingan wajar. Uji keseimbangan terpenuhi karena area publik, ada pemberitahuan, dan rekaman disimpan terbatas.",
  },
  {
    q: "Aplikasi kebugaran ingin membagikan data detak jantung pengguna ke perusahaan asuransi mitra untuk penawaran premi.",
    options: ["kontrak", "kepentingan-sah", "consent", "tugas-publik"],
    answer: "consent",
    why: "Ini data kesehatan (spesifik) yang dibagikan ke pihak ketiga untuk tujuan di luar layanan inti. Perlu persetujuan eksplisit, terpisah, dan dapat ditarik — serta sebaiknya DPIA.",
  },
];

/* Tabel perbandingan teknik pelindungan */
const COMPARE_TECH = {
  cols: ["Enkripsi", "Hashing", "Pseudonimisasi", "Tokenisasi", "Masking", "Anonimisasi"],
  rows: [
    { label: "Bisa dikembalikan ke data asli?", vals: ["Ya, dengan kunci", "Tidak (tetapi bisa ditebak & dicocokkan)", "Ya, dengan info tambahan", "Ya, via token vault", "Static: tidak · Dynamic: data asli tetap ada", "Tidak"] },
    { label: "Masih data pribadi?", vals: ["Ya", "Umumnya ya", "Ya", "Ya", "Umumnya ya", "Tidak (jika benar-benar anonim)"] },
    { label: "Tujuan utama", vals: ["Kerahasiaan saat disimpan/dikirim", "Verifikasi & integritas (password, file)", "Mengurangi keterkaitan identitas untuk analisis", "Mengeluarkan data sensitif dari sistem", "Membatasi apa yang terlihat oleh pengguna", "Berbagi/rilis data tanpa identitas"] },
    { label: "Contoh", vals: ["HTTPS, AES-256 di database", "Argon2 untuk password", "Nama → PSN-0042 di dataset riset", "Kartu → tok_9fA2xQ", "0812****7890", "Statistik agregat per kota"] },
  ],
};
