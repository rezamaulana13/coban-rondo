# Product Requirements Document (PRD)
## Standar Teknis & Optimasi Web Modern (SEO, AEO, GEO)

---

## 1. Ringkasan Dokumen (Document Overview)

* **Nama Proyek:** Kerangka Kerja Kepatuhan & Optimasi Website Modern (SEO, AEO, GEO)
* **Status:** Aktif / Dokumen Standar Pengembangan
* **Target Pembaca:** Frontend Developer, Backend Developer, Content Writer, SEO Specialist, dan Product Manager.
* **Tujuan Dokumen:** Menyediakan spesifikasi teknis dan panduan operasional yang komprehensif untuk memastikan seluruh halaman web memenuhi standar maksimal visibilitas pencarian organik (SEO), optimasi mesin pencari berbasis jawaban (AEO), kutipan kecerdasan buatan generatif (GEO), serta performa teknis dan aset yang optimal.

---

## 2. Kerangka Kerja Optimasi Utama (Core Optimization Frameworks)

### 2.1. SEO (Search Engine Optimization) — Pencarian Konvensional

* **Kepatuhan E-E-A-T:**
  Konten wajib menunjukkan **Experience** (Pengalaman), **Expertise** (Keahlian), **Authoritativeness** (Otoritas), dan **Trustworthiness** (Kepercayaan). Setiap artikel harus mencantumkan profil penulis, tanggal pembaruan, dan referensi sumber yang valid.
* **Core Web Vitals:**
  Halaman web wajib mencapai kategori **"Good"** pada tiga metrik utama:
  * **LCP (Largest Contentful Paint):** `< 2.5` detik.
  * **INP (Interaction to Next Paint):** `< 200` milidetik.
  * **CLS (Cumulative Layout Shift):** `< 0.1`.
* **Struktur URL:**
  URL harus bersih, pendek, menggunakan huruf kecil, dipisahkan dengan tanda hubung (`-`), dan memuat kata kunci utama (contoh: `domain.com/kategori/kata-kunci`).

### 2.2. AEO (Answer Engine Optimization) — Mesin Jawab & Suara

* **Format Snippet & Pertanyaan:**
  Gunakan sub-judul (`<h2>` atau `<h3>`) dalam bentuk kalimat tanya yang sering dicari pengguna, diikuti jawaban langsung yang padat (sekitar **40 hingga 50 kata**) pada paragraf pertama.
* **Data Terstruktur (Schema Markup):**
  Wajib menerapkan format **JSON-LD** yang relevan seperti `FAQPage`, `Article`, `Organization`, `LocalBusiness`, dan `Product` untuk memudahkan mesin pencari memparsing konteks data.

### 2.3. GEO (Generative Engine Optimization) — Kutipan AI Generatif

* **Data & Angka Konkret:**
  Konten wajib memuat statistik, persentase, atau data numerik spesifik (contoh: *"meningkatkan efisiensi hingga 45%"*) untuk meningkatkan peluang dikutip oleh LLM (seperti ChatGPT, Perplexity, Claude, dan Google AI Overviews).
* **Paragraf Mandiri (Self-Contained Paragraph):**
  Setiap paragraf harus dapat dipahami secara utuh meskipun diekstrak terpisah dari konteks keseluruhan dokumen oleh mesin ringkasan AI.
* **Konsistensi Entitas Brand:**
  Memastikan nama merek, sejarah perusahaan, alamat, dan deskripsi produk seragam di seluruh platform digital eksternal maupun internal website.

---

## 3. Standar Manajemen Meta Tags (`<head>` Elements)

### 3.1. Meta Title (Judul Halaman)

* **Batas Panjang Karakter:** `50` hingga `60` karakter agar tidak terpotong di halaman hasil pencarian (SERP).
* **Pola Struktur:** `[Kata Kunci Utama] - [Nilai Tambah/Konteks] | [Nama Brand]`
* **Contoh:**
  ```html
  <title>Panduan SEO Terbaru 2026: Strategi & Praktik Terbaik | BrandName</title>
  ```

### 3.2. Meta Description (Deskripsi Halaman)

* **Batas Panjang Karakter:** `150` hingga `160` karakter.
* **Pola Struktur:** Penempatan kata kunci utama secara natural, ringkasan manfaat halaman, diakhiri dengan Call to Action (CTA).
* **Contoh:**
  ```html
  <meta name="description" content="Pelajari standar terbaru SEO, AEO, dan GEO untuk website Anda. Temukan aturan meta, optimasi gambar, dan sitemap lengkap di sini. Baca selengkapnya!">
  ```

### 3.3. Meta Keywords

* **Status Kebijakan:** **Ditinggalkan (Deprecated)**.
* **Aturan:** Atribut `<meta name="keywords">` tidak perlu diisi atau disertakan dalam kode HTML karena diabaikan oleh mesin pencari modern.

---

## 4. Arsitektur Teknis & Struktur Situs (Technical Architecture)

### 4.1. Standar Sitemap XML

* **Format & Protokol:** File sitemap berformat XML standar (`/sitemap.xml`) yang bersih dan valid sesuai protokol *sitemap.org*.
* **Pemisahan Kategori:** Skala website besar wajib memecah sitemap menjadi beberapa bagian (misal: `sitemap-posts.xml`, `sitemap-pages.xml`, `sitemap-products.xml`).
* **Batasan Teknis:** Maksimal `50.000` URL atau ukuran file tidak melebihi `50 MB` per file sitemap.
* **Otomasi & Indeks:** Sitemap harus diperbarui secara otomatis setiap kali ada penambahan/penghapusan konten, serta wajib didaftarkan melalui Google Search Console dan Bing Webmaster Tools.

### 4.2. Konfigurasi `robots.txt`

* **Akses Mesin Pencari:** Mengizinkan (*Allow*) bot utama seperti Googlebot dan Bingbot merayapi halaman publik. Memblokir (*Disallow*) direktori sensitif seperti `/admin/`, `/cart/`, dan file konfigurasi privat.
* **Kebijakan Bot AI:** Jangan blokir bot AI generatif (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) pada file `robots.txt` agar konten situs berpotensi dirujuk oleh mesin pencari berbasis AI.

### 4.3. Canonical Tags (`rel="canonical"`)

* **Implementasi Wajib:** Setiap halaman web wajib menyertakan tag relasional canonical di bagian `<head>` untuk mencegah duplikasi konten akibat parameter URL dinamis, filter, atau migrasi halaman.
* **Format:**
  ```html
  <link rel="canonical" href="https://namadomain.com/url-utama" />
  ```

### 4.4. Keamanan & Aksesibilitas Seluler

* **Protokol HTTPS:** Seluruh halaman website wajib menggunakan sertifikat SSL/TLS aktif (HTTPS) tanpa pengecualian.
* **Mobile-First Indexing:** Desain antarmuka wajib responsif (*responsive design*), menggunakan tata letak ramah perangkat seluler, ukuran teks mudah dibaca tanpa memperbesar layar, serta tidak memiliki elemen horizontal yang meluap (*no horizontal overflow*).

---

## 5. Standar Optimasi Aset Gambar (Image Optimization)

### 5.1. Format File Gambar

* **Format Utama (Wajib):** `WebP` sebagai standar kompresi utama guna menyeimbangkan kualitas visual dan ukuran file yang kecil.
* **Format Lanjutan (Opsional/Rekomendasi):** `AVIF` untuk kompresi ekstrem pada peramban modern yang mendukung.
* **Larangan:** Dilarang keras menggunakan format PNG berukuran besar atau JPG mentah tanpa kompresi pada aset produksi website.

### 5.2. Batasan Ukuran File (Payload Limits)

| Jenis Aset Gambar | Batas Ukuran Ideal | Batas Maksimum Mutlak |
| :--- | :--- | :--- |
| **Banner Utama / Hero Image (Elemen LCP)** | `< 100 KB – 150 KB` | `200 KB` |
| **Gambar Konten / Ilustrasi Dalam Artikel** | `< 50 KB – 80 KB` | `100 KB` |
| **Thumbnail / Gambar Kecil / Avatar** | `< 20 KB – 30 KB` | `40 KB` |

### 5.3. Dimensi Piksel & Resolusi (Pixel Dimensions)

* **Banner / Hero Section (Full Width):** Lebar optimal antara `1200 px` hingga `1920 px`.
* **Gambar Konten Inline:** Lebar optimal antara `800 px` hingga `1000 px` (disesuaikan dengan kontainer teks).

### 5.4. Atribut SEO & Aksesibilitas Gambar

1. **Penamaan File (File Naming):**
   Menggunakan kata kunci deskriptif berbahasa relevan yang dipisahkan dengan tanda hubung.
   * *Contoh:* `kue-kering-nastar-lebaran.webp`, `hero-coban-rondo.webp`.
2. **Atribut Alt Text:**
   Wajib diisi dengan deskripsi singkat yang memuat kata kunci secara natural untuk keperluan aksesibilitas penyandang disabilitas (*screen reader*) dan pemahaman bot mesin pencari.
3. **Atribut Lazy Loading & Preload:**
   * Wajib menyertakan atribut `loading="lazy"` dan `decoding="async"` pada seluruh elemen gambar di bawah paruh halaman pertama (*below the fold*) untuk menghemat bandwidth.
   * Gunakan `<link rel="preload" as="image" href="..." fetchpriority="high">` hanya untuk gambar **Hero / LCP** utama di atas lipatan layar.
