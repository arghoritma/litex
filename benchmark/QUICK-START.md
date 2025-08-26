# 🚀 Cara Menjalankan Benchmark LiteX

## 📝 Ringkasan

Anda sekarang memiliki 4 cara untuk menjalankan benchmark ketiga framework secara bersamaan:

## 🎯 Metode yang Direkomendasikan

### 1. Quick Parallel Test (TERCEPAT) ⚡

```bash
cd benchmark
powershell -ExecutionPolicy Bypass -File quick-parallel-test.ps1
```

**⏱️ Waktu: ~30 detik**

- Menjalankan 3 test bersamaan
- Hasil cepat
- Resource sharing antar test

### 2. Sequential Test (PALING AKURAT) 📊

```bash
cd benchmark
powershell -ExecutionPolicy Bypass -File run-all-benchmarks.ps1
```

**⏱️ Waktu: ~90 detik**

- Menjalankan test satu per satu
- Hasil paling akurat
- Menyimpan hasil ke file

### 3. Batch File (SIMPLE) 🔧

```bash
cd benchmark
run-all-benchmarks.bat
```

**⏱️ Waktu: ~90 detik**

- Tidak butuh PowerShell
- Simple dan mudah

### 4. NPM Scripts (MODERN) 📦

```bash
cd benchmark
npm run benchmark:quick    # Paralel (cepat)
npm run benchmark         # Sequential (akurat)
```

## 🔍 Apa yang Akan Ditest?

| Framework                    | Port | Expected Performance     |
| ---------------------------- | ---- | ------------------------ |
| **LiteX (Ultimate Express)** | 3006 | 🏆 Highest (150k+ req/s) |
| **Regular Express**          | 3008 | 🥈 Medium (50k req/s)    |
| **Pure Node.js**             | 3007 | 🥉 Good (70k req/s)      |

## 📈 Contoh Output yang Diharapkan

```
🚀 Test 1/3: LiteX (Ultimate Express)
Port: 3006 | Framework: Ultimate Express
---------------------------------------------
Requests/sec: 150,000+
Latency: 2-3ms

🚀 Test 2/3: Regular Express
Port: 3008 | Framework: Express.js
---------------------------------------------
Requests/sec: 50,000
Latency: 8-10ms

🚀 Test 3/3: Pure Node.js
Port: 3007 | Framework: Native HTTP
---------------------------------------------
Requests/sec: 70,000
Latency: 5-6ms
```

## 🛠️ Prerequisites

1. **wrk tool** (akan auto-install via chocolatey)
2. **Node.js**
3. **Dependencies** (sudah terinstall via `npm install`)

## 🚀 Start Sekarang!

Jalankan perintah ini untuk test tercepat:

```bash
cd benchmark
powershell -ExecutionPolicy Bypass -File quick-parallel-test.ps1
```

Atau untuk hasil paling akurat:

```bash
cd benchmark
powershell -ExecutionPolicy Bypass -File run-all-benchmarks.ps1
```

## 📊 File Output

Setelah benchmark selesai, Anda akan mendapatkan:

- **Console output** dengan hasil real-time
- **File hasil** (untuk sequential test): `benchmark-results-YYYY-MM-DD_HH-mm-ss.md`
- **Perbandingan performa** antar framework

## 🎉 Tips

1. **Tutup aplikasi lain** untuk hasil terbaik
2. **Gunakan mode performance** di Windows
3. **Jalankan beberapa kali** untuk rata-rata yang akurat
4. **Quick parallel** untuk demo cepat
5. **Sequential** untuk data production

**Ready to see LiteX performance? Let's go! 🚀**
