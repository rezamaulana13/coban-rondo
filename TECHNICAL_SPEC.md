# Technical Specification
## Website Coban Rondo Outbound & Camping

---

## 1. Technology Stack

| Layer | Teknologi | Versi / Sumber | Alasan Pemilihan |
| :--- | :--- | :--- | :--- |
| **Markup** | HTML5 Semantic | W3C Standard | Struktur semantik untuk SEO, aksesibilitas, dan kecepatan muat tinggi. |
| **Styling** | Bootstrap + Custom CSS | Bootstrap 5.3.3 + `style.css` | Grid fleksibel, utilitas responsif, dipadu dengan desain kustom bertema *Pine Forest Emerald & Amber*. |
| **Typography** | Google Fonts | `Outfit` + `Plus Jakarta Sans` | Kombinasi modern, elegan, dan tingkat keterbacaan tinggi di berbagai resolusi layar. |
| **Icons** | FontAwesome | 6.5.2 (CDN) | Kelengkapan ikon outdoor, petualangan, navigasi, dan branding sosial media. |
| **Scripting** | Vanilla JavaScript | ES6+ (IIFE Module) | Kinerja cepat tanpa overhead framework berat, kalkulator harga *real-time*, DOM filtering, dan WhatsApp router. |

---

## 2. Project File Structure

```text
coban-rondo/
├── index.html              # Halaman Beranda (Hero, Stats, Showcase Wahana, Paket Populer, Testimoni)
├── paket.html              # Halaman Paket & Wahana (Katalog, Filter, Kalkulator Biaya, Komparasi)
├── galeri.html             # Halaman Galeri Dokumentasi (Filter Kategori, Lightbox Modal, Video)
├── tentang-kami.html       # Halaman Profil Perusahaan (Sejarah, BNSP, Fasilitas Kawasan, Rute Peta, FAQ)
├── artikel.html            # Halaman Artikel & Edukasi (Live Search, Tag Kategori, Modal Quick-Read)
├── PRD.md                  # Product Requirement Document
├── TECHNICAL_SPEC.md       # Dokumen Spesifikasi Teknis ini
├── IMPLEMENTATION_PLAN.md  # Rencana Pengembangan & Task Breakdown
└── assets/
    ├── css/
    │   └── style.css       # Design System, Custom Components, Variables, Animations
    ├── js/
    │   └── main.js         # Kalkulator Outbound, Lightbox, Filter, Dynamic WA Handler
    └── img/
        ├── logo.svg        # Brand Logo Vector
        └── README_ASSETS.txt # Panduan Resolusi Aset Gambar
```

---

## 3. Design Tokens & CSS Custom Properties (`style.css`)

```css
:root {
  /* Brand Colors */
  --clr-forest-dark: #062314;       /* Deep Forest Dark */
  --clr-primary: #0e4c27;           /* Pine Forest Green */
  --clr-primary-light: #1b7a42;
  --clr-primary-subtle: #eaf5ee;     /* Mint Pale Background */
  --clr-accent: #f59e0b;            /* Warm Sun Amber */
  --clr-accent-hover: #d97706;
  --clr-accent-light: #fef3c7;
  --clr-accent-emerald: #10b981;
  --clr-slate-800: #1e293b;
  --clr-slate-600: #475569;
  --clr-border: #e2e8f0;
  --clr-bg-page: #ffffff;

  /* Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  /* Geometry & Shadows */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;

  --shadow-sm: 0 2px 8px rgba(14, 76, 39, 0.05);
  --shadow-md: 0 8px 24px rgba(6, 35, 20, 0.08);
  --shadow-lg: 0 16px 40px rgba(6, 35, 20, 0.12);
  --shadow-hover: 0 20px 48px rgba(6, 35, 20, 0.16);
  --shadow-accent: 0 10px 25px rgba(245, 158, 11, 0.35);

  --transition-fast: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 4. Client-Side Business Logic & Algorithms (`main.js`)

### A. Kalkulator Estimasi Biaya & Diskon Volume
Formula perhitungan biaya outbound:

$$\text{Subtotal Per Pax} = \text{Base Price} + \sum \text{Add-ons (Per Pax)}$$

$$\text{Discount Rate} = 
\begin{cases} 
10\% & \text{jika } \text{Pax} \ge 100 \\ 
5\% & \text{jika } 50 \le \text{Pax} < 100 \\ 
0\% & \text{jika } \text{Pax} < 50 
\end{cases}$$

$$\text{Final Price Per Pax} = \text{round}\Big(\text{Subtotal Per Pax} \times (1 - \text{Discount Rate})\Big)$$

$$\text{Total Cost} = (\text{Final Price Per Pax} \times \text{Pax}) + \sum \text{Flat Add-ons (misal: Drone)}$$

### B. Dynamic WhatsApp Link Generator
```javascript
function buildWaLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CR_CONFIG.WA_NUMBER}?text=${encoded}`;
}
```

### C. Live Category Filtering
- Menggunakan event listener `click` pada `[data-filter]`
- Membandingkan nilai filter dengan `data-category` pada kartu
- Manipulasi CSS `style.display` dan `style.opacity` untuk efek transisi halus.

---

## 5. Route Inventory & Verification Matrix

| Route Path | Tipe File | Target Pengguna | Respons HTTP / Status | Fitur Utama |
| :--- | :--- | :--- | :--- | :--- |
| `/index.html` | Page | Publik / Calon Klien | `200 OK` | Hero, Stats Bar, Showcase 6 Wahana, Paket Populer, Testimoni, Booking Modal |
| `/paket.html` | Page | Publik / Calon Klien | `200 OK` | Filter Kategori, Katalog 11 Item Paket & Wahana, Kalkulator Biaya Interaktif, Tabel Komparasi |
| `/galeri.html` | Page | Publik / Calon Klien | `200 OK` | Grid 12 Foto Beresolusi Tinggi, Filter Kategori, Lightbox Modal Viewer, Video Iframe |
| `/tentang-kami.html` | Page | Publik / Calon Klien | `200 OK` | Profil BNSP, Visi Misi, 6 Fasilitas Kawasan, Rute Transportasi, Google Maps, FAQ Accordion |
| `/artikel.html` | Page | Publik / Calon Klien | `200 OK` | Live Search Kata Kunci, 6 Artikel Panduan Outbound/Camping, Modal Quick-Read |

---

## 6. Non-Functional & Security Requirements
1. **Performance & Asset Loading:**
   - Semua gambar dilengkapi atribut `loading="lazy"` untuk menghemat bandwidth.
   - Menggunakan CDN dengan caching browser untuk library eksternal (Bootstrap & FontAwesome).
2. **Keamanan & Validasi Input:**
   - Form booking menerapkan HTML5 constraint validation (`required`, `type="number"`, `min="1"`).
   - Sanitasi teks pada parameter URL WhatsApp dengan `encodeURIComponent()` guna mencegah malformed URI.
3. **Cross-Browser & Responsive Compatibility:**
   - Kompatibel dengan Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, dan browser mobile (Android Chrome & iOS Safari).
