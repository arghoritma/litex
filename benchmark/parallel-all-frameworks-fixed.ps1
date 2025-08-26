# Quick Parallel Benchmark - All 4 Frameworks at Once
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Quick Parallel Benchmark (All 4 Frameworks)" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Install dependencies quietly
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install ultimate-express express hyper-express 2>$null | Out-Null

# Start all servers
Write-Host "Starting all servers..." -ForegroundColor Yellow
Write-Host "  🟢 LiteX (Ultimate Express) → Port 3006" -ForegroundColor Green
Write-Host "  🔵 Regular Express → Port 3008" -ForegroundColor Blue
Write-Host "  🟣 Hyper-Express → Port 3009" -ForegroundColor Magenta
Write-Host "  🔵 Pure Node.js → Port 3007" -ForegroundColor Cyan

$litex = Start-Process -FilePath "node" -ArgumentList "litex-test.js" -PassThru -WindowStyle Hidden
$express = Start-Process -FilePath "node" -ArgumentList "express-test.js" -PassThru -WindowStyle Hidden
$hyper = Start-Process -FilePath "node" -ArgumentList "hyper-express.js" -PassThru -WindowStyle Hidden
$node = Start-Process -FilePath "node" -ArgumentList "node-test.js" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 4

Write-Host ""
Write-Host "🚀 Running 4 benchmarks in parallel..." -ForegroundColor Green
Write-Host "⏱️ This will take about 30 seconds..." -ForegroundColor Yellow

# Run all benchmarks in parallel using Jobs (lower connections per test to avoid overload)
$job1 = Start-Job -ScriptBlock { wrk -t3 -c100 -d30s http://localhost:3006 }  # LiteX
$job2 = Start-Job -ScriptBlock { wrk -t3 -c100 -d30s http://localhost:3008 }  # Express
$job3 = Start-Job -ScriptBlock { wrk -t3 -c100 -d30s http://localhost:3009 }  # Hyper-Express
$job4 = Start-Job -ScriptBlock { wrk -t3 -c100 -d30s http://localhost:3007 }  # Node.js

# Wait for all jobs to complete
Wait-Job $job1, $job2, $job3, $job4 | Out-Null

# Get results
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🏆 PARALLEL BENCHMARK RESULTS" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "🟢 LiteX (Ultimate Express) - Port 3006:" -ForegroundColor Green
Write-Host "   Framework: Ultimate Express (uWebSockets + Express API)" -ForegroundColor Gray
Receive-Job $job1

Write-Host ""
Write-Host "🔵 Regular Express - Port 3008:" -ForegroundColor Blue
Write-Host "   Framework: Standard Express.js" -ForegroundColor Gray
Receive-Job $job2

Write-Host ""
Write-Host "🟣 Hyper-Express - Port 3009:" -ForegroundColor Magenta
Write-Host "   Framework: Hyper-Express (uWebSockets + Custom API)" -ForegroundColor Gray
Receive-Job $job3

Write-Host ""
Write-Host "🔵 Pure Node.js - Port 3007:" -ForegroundColor Cyan
Write-Host "   Framework: Native Node.js HTTP" -ForegroundColor Gray
Receive-Job $job4

# Save results
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$resultFile = "parallel-benchmark-$timestamp.md"

$litexResult = Receive-Job $job1
$expressResult = Receive-Job $job2
$hyperResult = Receive-Job $job3
$nodeResult = Receive-Job $job4

$results = @"
# Parallel Benchmark Results - All 4 Frameworks
Generated: $(Get-Date)

## Test Configuration (Parallel)
- Threads: 3 per framework (12 total)
- Connections: 100 per framework (400 total)
- Duration: 30 seconds
- Method: Parallel execution

## Results

### 🟢 LiteX (Ultimate Express)
```
$litexResult
```

### 🔵 Regular Express
```
$expressResult
```

### 🟣 Hyper-Express
```
$hyperResult
```

### 🔵 Pure Node.js
```
$nodeResult
```

## Framework Summary

| Framework | Technology | API | Migration |
|-----------|------------|-----|-----------|
| LiteX | uWebSockets + Express API | ✅ Express Compatible | Easy |
| Hyper-Express | uWebSockets + Custom API | ❌ Different API | Hard |
| Express | Node.js HTTP | ✅ Standard | N/A |
| Node.js | Native HTTP | ❌ Manual | N/A |

"@

$results | Out-File -FilePath $resultFile -Encoding UTF8

# Cleanup
Remove-Job $job1, $job2, $job3, $job4
Stop-Process -Id $litex.Id, $express.Id, $hyper.Id, $node.Id -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "✅ Parallel benchmark completed!" -ForegroundColor Green
Write-Host "📊 Results saved to: $resultFile" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan
