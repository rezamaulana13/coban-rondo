# brief-ku

## Install

```bash
npx skills add Adytm404/skills --skill brief-ku
```

> Jalankan perintah di atas, pilih AI agent yang digunakan jika diminta, lalu restart agent agar skill terdeteksi.

Skill AI agent untuk mengubah ide aplikasi yang singkat atau belum jelas menjadi spesifikasi siap implementasi, meliputi:

- Product Requirement Document (PRD)
- Rekomendasi teknologi dan arsitektur
- Database schema
- Spesifikasi API
- Authentication, authorization, dan security requirements
- User flow, acceptance criteria, dan edge cases
- Tahapan serta task implementasi

Skill menggunakan tool pertanyaan interaktif milik agent untuk mengklarifikasi kebutuhan penting sebelum menyusun spesifikasi.

## Prasyarat

Pastikan Node.js dan npm sudah tersedia:

```bash
node --version
npm --version
```

Jika perintah `npx` belum tersedia, install Node.js terlebih dahulu melalui <https://nodejs.org/>.

## Agent yang Didukung

Skill dirancang untuk agent yang mendukung skills, termasuk:

- OpenCode
- Codex
- Claude Code
- Cursor
- Agent lain yang kompatibel dengan format `SKILL.md`

Nama dan schema tool pertanyaan berbeda pada setiap agent. Skill akan memakai tool native yang tersedia, misalnya `question`, `request_user_input`, atau `AskUserQuestion`.

## Penggunaan

Berikan ide aplikasi menggunakan bahasa biasa. Contoh:

```text
Buatkan aplikasi absensi karyawan dengan GPS.
```

Contoh lain:

```text
Saya ingin membuat aplikasi kasir untuk kedai kopi.
```

```text
Buat PRD dan technical specification untuk platform booking lapangan futsal.
```

Skill akan:

1. Memahami tujuan aplikasi.
2. Menanyakan kebutuhan penting melalui pilihan interaktif.
3. Merekomendasikan stack yang sesuai.
4. Menyusun PRD dan spesifikasi teknis.
5. Membuat rencana implementasi siap diberikan kepada coding agent.

## Memperbarui Skill

Jalankan kembali perintah instalasi:

```bash
npx skills add Adytm404/skills --skill brief-ku
```

Ikuti pilihan update atau overwrite yang ditampilkan CLI, lalu restart agent.

## Uninstall

Hapus skill `brief-ku` melalui pengelola skill atau direktori skills milik agent yang digunakan. Lokasi instalasi dapat berbeda pada OpenCode, Codex, Claude Code, dan Cursor.

## Sumber

Repository: <https://github.com/Adytm404/skills>
