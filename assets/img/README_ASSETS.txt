=================================================================
 PANDUAN ASET GAMBAR — cobanrondo.web.id
=================================================================
Folder ini (assets/img/) belum berisi foto asli. Semua file HTML
sudah mereferensikan NAMA FILE di bawah ini secara konsisten, jadi
Anda tinggal menyiapkan foto dengan nama yang SAMA PERSIS
(huruf kecil semua, gunakan tanda "-" bukan spasi) agar gambar
langsung tampil tanpa mengedit kode.

Format yang disarankan: .jpg untuk foto (kompresi web, maks ~300KB
per file agar loading cepat), .png untuk logo/ikon dengan transparansi,
.webp juga didukung browser modern bila ingin ukuran lebih kecil.

-----------------------------------------------------------------
1. LOGO
-----------------------------------------------------------------
logo.svg                        -> Sudah tersedia (placeholder vektor).
                                    Ganti dengan logo resmi jika ada,
                                    tetap gunakan nama file "logo.svg"
                                    atau update path di navbar & footer.

-----------------------------------------------------------------
2. HERO / BANNER UTAMA (index.html)
-----------------------------------------------------------------
hero-coban-rondo.jpg            -> 1920 x 1080 px (landscape, wide)
                                    Foto peserta outbound / air terjun
                                    Coban Rondo dengan pencahayaan cerah.

-----------------------------------------------------------------
3. FOTO PAKET (index.html & paket.html)
-----------------------------------------------------------------
Ukuran disarankan: 800 x 600 px (rasio 4:3), format .jpg

paket-corporate-gathering.jpg   -> Kategori: Corporate
paket-team-building-eksekutif.jpg -> Kategori: Corporate
paket-edukasi-sekolah.jpg       -> Kategori: Edukasi/Sekolah
paket-fun-games.jpg             -> Kategori: Fun Games
paket-camping-ceria.jpg         -> Kategori: Camping
paket-camping-private.jpg       -> Kategori: Camping

-----------------------------------------------------------------
4. TESTIMONIAL (index.html)
-----------------------------------------------------------------
Ukuran disarankan: 150 x 150 px (rasio 1:1 / persegi), format .jpg

testi-1.jpg                     -> Foto/logo perwakilan instansi 1
testi-2.jpg                     -> Foto/logo perwakilan instansi 2
testi-3.jpg                     -> Foto/logo perwakilan instansi 3

-----------------------------------------------------------------
5. GALERI FOTO (galeri.html)
-----------------------------------------------------------------
Ukuran disarankan: 900 x 900 px (rasio 1:1), format .jpg

galeri-01.jpg  -> Kategori: Corporate
galeri-02.jpg  -> Kategori: Corporate
galeri-03.jpg  -> Kategori: Sekolah
galeri-04.jpg  -> Kategori: Sekolah
galeri-05.jpg  -> Kategori: Camping
galeri-06.jpg  -> Kategori: Camping
galeri-07.jpg  -> Kategori: Fun Games
galeri-08.jpg  -> Kategori: Fun Games
galeri-09.jpg  -> Kategori: Alam & Fasilitas
galeri-10.jpg  -> Kategori: Alam & Fasilitas
galeri-11.jpg  -> Kategori: Camping
galeri-12.jpg  -> Kategori: Corporate

Catatan: Section video pada galeri.html memakai embed YouTube
(iframe). Ganti ID video "VIDEO_ID_1", "VIDEO_ID_2", "VIDEO_ID_3"
pada galeri.html dengan ID video YouTube resmi milik pengelola.

-----------------------------------------------------------------
6. TENTANG KAMI (tentang-kami.html)
-----------------------------------------------------------------
Ukuran disarankan: 900 x 700 px, format .jpg

about-sejarah.jpg               -> Foto tim/pemandu atau area outbound
about-safety-training.jpg       -> Foto briefing/pelatihan safety

Ikon sertifikasi & fasilitas pada halaman ini memakai FontAwesome
(tidak perlu file gambar). Jika Anda memiliki file lencana/badge
sertifikasi resmi (mis. logo BNSP), simpan sebagai:
sertifikat-bnsp.png             -> 200 x 200 px, latar transparan

-----------------------------------------------------------------
7. ARTIKEL / BLOG (artikel.html)
-----------------------------------------------------------------
Ukuran disarankan: 800 x 500 px (rasio 16:10), format .jpg

artikel-tips-corporate.jpg
artikel-rundown-gathering.jpg
artikel-manfaat-team-building.jpg
artikel-outbound-anak-sekolah.jpg
artikel-camping-pemula.jpg
artikel-wisata-malang.jpg

-----------------------------------------------------------------
8. FAVICON (opsional, tambahan)
-----------------------------------------------------------------
favicon.png                     -> 32 x 32 px atau 64 x 64 px
                                    Tambahkan tag berikut di <head>
                                    setiap halaman bila sudah tersedia:
                                    <link rel="icon" type="image/png"
                                    href="assets/img/favicon.png">

-----------------------------------------------------------------
TIPS OPTIMASI
-----------------------------------------------------------------
- Kompres semua foto sebelum upload (TinyPNG / Squoosh) agar website
  tetap cepat diakses dari HP (mayoritas pengunjung outbound biasanya
  mobile-first saat riset paket).
- Gunakan foto asli kegiatan (bukan stok foto generik) untuk
  meningkatkan kepercayaan calon klien korporat & sekolah.
- Pastikan rasio aspek foto sesuai rekomendasi di atas agar tidak
  terpotong aneh oleh CSS object-fit: cover.
=================================================================
