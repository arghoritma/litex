# LiteX Benchmark Suite

Benchmark suite untuk membandingkan performa LiteX (Ultimate Express) vs Regular Express vs Pure Node.js.

## Quick Start

### Opsi 1: Menjalankan Semua Test Bersamaan (Paralel) ⚡

```bash
cd benchmark
powershell -ExecutionPolicy Bypass -File quick-parallel-test.ps1
```

**Waktu: ~30 detik** | Test berjalan bersamaan untuk hasil yang cepat

### Opsi 2: Menjalankan Test Berurutan (Sequential) 📊

```bash
cd benchmark
powershell -ExecutionPolicy Bypass -File run-all-benchmarks.ps1
```

**Waktu: ~90 detik** | Test berjalan satu per satu untuk akurasi maksimal

### Opsi 3: Menggunakan Batch File (Windows) 🔧

```bash
cd benchmark
run-all-benchmarks.bat
```

### Opsi 4: Manual Individual Testing 🎯

```bash
# Terminal 1: Start LiteX
node litex-test.js

# Terminal 2: Start Express
node express-test.js

# Terminal 3: Start Pure Node.js
node node-test.js

# Terminal 4: Run individual benchmarks
wrk -t12 -c400 -d30s http://localhost:3006  # LiteX
wrk -t12 -c400 -d30s http://localhost:3008  # Express
wrk -t12 -c400 -d30s http://localhost:3007  # Node.js
```

## Framework Details

| Framework                    | Port | File              | Description                                             |
| ---------------------------- | ---- | ----------------- | ------------------------------------------------------- |
| **LiteX (Ultimate Express)** | 3006 | `litex-test.js`   | High-performance Express alternative dengan uWebSockets |
| **Regular Express**          | 3008 | `express-test.js` | Standard Express.js framework                           |
| **Pure Node.js**             | 3007 | `node-test.js`    | Native Node.js HTTP server                              |

## Contoh Output

### LiteX Results:

```
Running 30s test @ http://localhost:3006
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.04ms  486.96us  19.81ms   95.72%
    Req/Sec    16.24k     1.45k   21.21k    84.36%
  5820498 requests in 30.03s, 521.78MB read
  Socket errors: connect 0, read 372, write 0, timeout 0
Requests/sec: 193834.13
Transfer/sec:     17.38MB
```

### Pure Node.js Results:

```
Running 30s test @ http://localhost:3007
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.45ms  729.74us  34.11ms   97.20%
    Req/Sec     6.09k   370.90     7.83k    92.00%
  2181301 requests in 30.02s, 332.84MB read
  Socket errors: connect 0, read 676, write 5, timeout 0
Requests/sec:  72670.72
Transfer/sec:     11.09MB
```

## Analisis Performa

Berdasarkan hasil benchmark:

| Metrik          | LiteX   | Pure Node.js | Speedup          |
| --------------- | ------- | ------------ | ---------------- |
| Requests/sec    | 193,834 | 72,670       | **2.67x faster** |
| Average Latency | 2.04ms  | 5.45ms       | **2.67x lower**  |
| Transfer/sec    | 17.38MB | 11.09MB      | **1.57x higher** |

**LiteX menunjukkan performa yang signifikan lebih baik** dengan:

- 2.67x lebih banyak request per detik
- 2.67x latency yang lebih rendah
- Throughput yang lebih tinggi

## Tips untuk Benchmark yang Akurat

1. **Pastikan tidak ada aplikasi lain yang menggunakan banyak resource**
2. **Jalankan benchmark beberapa kali dan ambil rata-rata**
3. **Tutup browser dan aplikasi tidak penting**
4. **Gunakan mode performance di Windows (Settings > System > Power)**
5. **Pastikan kedua server berjalan stabil sebelum memulai benchmark**

## Troubleshooting

### Error: "wrk: command not found"

Install wrk sesuai instruksi di atas.

### Error: "EADDRINUSE"

Port sudah digunakan. Pastikan hanya satu server yang berjalan per port.

### Hasil benchmark rendah

- Periksa usage CPU dan RAM
- Tutup aplikasi lain
- Coba kurangi parameter `-c` (connections) jika sistem terbatas

## Custom Benchmark

Anda bisa memodifikasi parameter untuk kebutuhan spesifik:

```bash
# Test dengan 1000 connections selama 60 detik
wrk -t12 -c1000 -d60s http://localhost:3006

# Test dengan 8 threads dan 200 connections
wrk -t8 -c200 -d30s http://localhost:3006

# Test dengan script custom
wrk -t12 -c400 -d30s -s script.lua http://localhost:3006
```
