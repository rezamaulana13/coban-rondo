# Product Requirement Document (PRD)
## Website Coban Rondo Outbound & Camping

---

## 1. Project Overview
- **Nama Produk:** Coban Rondo Outbound & Camping Portal
- **Domain/Identitas:** cobanrondo.web.id
- **Kategori:** Ekowisata Alam, Event Organizer Outbound, Team Building, & Camping Ground
- **Lokasi:** Kawasan Wisata Air Terjun Coban Rondo, Desa Pandesari, Kec. Pujon, Kab. Malang, Jawa Timur
- **Tujuan Utama:** Menyediakan platform digital resmi yang profesional, interaktif, dan informatif untuk memudahkan calon klien korporat, sekolah, instansi, dan komunitas dalam meriset, menghitung estimasi biaya, dan melakukan reservasi paket outbound serta wahana petualangan di Coban Rondo.

---

## 2. Problem Statement
1. **Kurangnya Informasi Transparan:** Calon klien sering kesulitan mendapatkan rincian fasilitas dan estimasi biaya outbound secara cepat tanpa harus menunggu berjam-jam balasan admin.
2. **Kebutuhan Custom Paket:** Setiap instansi memiliki jumlah peserta dan kebutuhan wahana yang berbeda-beda (misal: ingin tambah flying fox, paintball, rafting, atau dokumentasi drone).
3. **Standar Kepercayaan Klien Korporat:** Instansi BUMN dan perusahaan multinasional membutuhkan bukti profesionalisme (pemandu bersertifikat BNSP, standar keselamatan K3, legalitas, serta testimoni klien nyata).
4. **Tampilan Sebelumnya Kurang Menjual:** Website awal membutuhkan peningkatan estetika visual agar mencerminkan resort & petualangan alam kelas atas (*premium outdoor adventure*).

---

## 3. Product Goals
- **Meningkatkan Konversi Leads Reservasi:** Mempermudah alur konsultasi dan booking dengan simulator kalkulator otomatis yang langsung terhubung ke WhatsApp Admin.
- **Membangun Brand Authority:** Menampilkan portofolio klien, sertifikasi BNSP, fasilitas kawasan 10 Ha, serta ulasan bintang 5.
- **Katalog Wahana & Paket Terpadu:** Menyajikan seluruh wahana (Flying Fox, Paintball, Taman Labirin, Rafting Kasembon, Camping Ground, Archery) dalam satu platform yang responsif dan interaktif.
- **Pengalaman Pengguna (UX) yang Memukau:** Memberikan navigasi mulus, desain modern (*Forest Emerald & Sunlit Amber*), dan fitur *Quick-Read* pada artikel.

---

## 4. Target Users
1. **HRD / Event Committee Korporat & BUMN:** Mencari paket *Corporate Gathering*, *Leadership Camp*, dan *Team Building* dengan fasilitas lengkap dan laporan/invoice resmi.
2. **Pihak Sekolah / Universitas:** Guru atau panitia kesiswaan yang membutuhkan program *Outbound Edukasi Karakter* dengan standar keselamatan tinggi dan harga terjangkau.
3. **Komunitas & Keluarga:** Rombongan mandiri yang ingin mengadakan *Fun Games*, reuni, atau *Camping & Glamping* di alam terbuka.
4. **Admin / Customer Service Coban Rondo:** Menerima pesan pemesanan yang sudah terformat rapi dan rinci dari pengunjung website via WhatsApp.

---

## 5. Application Scope & Boundaries
- **Tipe Aplikasi:** Web-based Responsive Application (HTML5, Bootstrap 5.3, Vanilla CSS3, & Modern Vanilla JavaScript).
- **Delivery Mode:** Frontend Interaktif Berkinerja Tinggi + Simulasi Kalkulator Biaya & Dynamic WhatsApp Routing.

### In Scope:
- 5 Halaman Utama:
  1. `index.html` (Beranda & Showcase)
  2. `paket.html` (Katalog Paket & Wahana + Simulator Kalkulator Biaya)
  3. `galeri.html` (Dokumentasi Foto & Video + Interactive Lightbox)
  4. `tentang-kami.html` (Profil BNSP, Fasilitas Kawasan, Rute Google Maps, & FAQ Accordion)
  5. `artikel.html` (Pusat Edukasi, Live Search, & Modal Quick-Read)
- Fitur Kalkulator Outbound Interaktif (hitung otomatis per pax + add-ons + diskon volume rombongan).
- Integrasi Dynamic WhatsApp Booking Router.
- Lightbox Modal Viewer untuk galeri foto resolusi tinggi.
- Desain Responsif (Mobile, Tablet, Desktop).

### Out of Scope / Non-Goals:
- Sistem Payment Gateway otomatis (Kartu Kredit / VA Bank) — transaksi dikonfirmasi melalui Down Payment (DP) manual bersama Admin.
- Sistem Login Pengunjung (registrasi akun mandiri) — tidak diperlukan karena pengunjung adalah calon pemesan paket rombongan via WhatsApp.

### Future Considerations:
- Integrasi kalender ketersediaan tanggal booking secara *real-time* berbasis API backend.
- Dashboard Admin khusus untuk input artikel dan galeri foto dinamis via CMS headless.

---

## 6. Functional Requirements (Fitur P0, P1, P2)

| Priority | Feature ID | Fitur | Deskripsi |
| :--- | :--- | :--- | :--- |
| **P0** | `REQ-F-001` | Katalog Paket & Wahana | Menampilkan daftar paket (Corporate, Edukasi, Camping, Fun Games) & wahana satuan (Flying fox, paintball, labirin, rafting, archery). |
| **P0** | `REQ-F-002` | Kalkulator Biaya Interaktif | Menghitung simulasi biaya per orang dan total rombongan berdasarkan paket dasar + pilihan add-on wahana + diskon otomatis. |
| **P0** | `REQ-F-003` | WhatsApp Booking Router | Memformat data booking secara otomatis menjadi pesan WhatsApp terstruktur dan mengirimkannya ke nomor Admin. |
| **P0** | `REQ-F-004` | Filter Kategori Paket & Galeri | Filter instan tanpa reload halaman menggunakan atribut data HTML & transisi CSS. |
| **P0** | `REQ-F-005` | Lightbox Photo Viewer | Modal popup tampilan foto resolusi tinggi beserta caption keterangan kegiatan. |
| **P1** | `REQ-F-006` | Live Search Artikel | Pencarian artikel secara *real-time* berdasarkan kata kunci judul/isi. |
| **P1** | `REQ-F-007` | Modal Quick-Read Artikel | Membaca ringkasan artikel lengkap langsung dalam modal tanpa pindah halaman. |
| **P1** | `REQ-F-008` | FAQ Accordion Interaktif | Daftar tanya-jawab interaktif mengenai teknis acara, cuaca hujan, dan busana. |
| **P2** | `REQ-F-009` | Back-to-Top Button | Tombol mengambang kembali ke atas dengan smooth scrolling. |
| **P2** | `REQ-F-010` | Video Highlight Embed | Tampilan video dokumentasi acara gathering melalui iframe responsif. |

---

## 7. User Flows

### Flow 1: Simulasi Estimasi Biaya & Booking WhatsApp
```text
Pengunjung membuka paket.html
    ↓
Memilih Paket Dasar (misal: Corporate Team Building)
    ↓
Menggeser Slider Peserta (misal: 60 Orang -> Diskon 5% Aktif)
    ↓
Centang Add-on Wahana (misal: +Flying Fox, +Paintball)
    ↓
Kalkulator menampilkan: Harga Per Pax & Total Biaya Rombongan
    ↓
Klik "Kirim Estimasi Ini ke WhatsApp"
    ↓
WhatsApp terbuka dengan pesan terformat rapi
    ↓
Admin Coban Rondo merespons dengan proposal resmi
```

### Flow 2: Eksplorasi Galeri & Lightbox
```text
Pengunjung membuka galeri.html
    ↓
Memilih Filter (misal: Wahana & Aksi)
    ↓
Klik pada salah satu foto
    ↓
Modal Lightbox terbuka (Foto Fullscreen + Caption)
    ↓
Pengunjung menutup modal atau klik tombol konsultasi
```

---

## 8. Acceptance Criteria
1. **Kalkulator Biaya (`REQ-F-002`):**
   - Perubahan paket, jumlah peserta, atau centang add-on harus langsung mengupdate tampilan harga secara *real-time* tanpa lag.
   - Diskon 5% wajib diterapkan otomatis jika peserta >= 50 orang, dan diskon 10% jika peserta >= 100 orang.
2. **WhatsApp Router (`REQ-F-003`):**
   - Pesan WhatsApp harus memuat: Nama Paket, Estimasi Peserta, Rincian Add-on, Diskon, Estimasi Harga, dan salam pembuka.
3. **Filter Galeri & Paket (`REQ-F-004`):**
   - Mengklik tombol filter harus menyembunyikan item non-kategori dan menampilkan item yang sesuai dengan animasi transisi halus.
4. **Responsivitas:**
   - Seluruh halaman harus lolos uji render pada resolusi Mobile (375px), Tablet (768px), dan Desktop (1200px+) tanpa layout rusak atau overflow horizontal.
