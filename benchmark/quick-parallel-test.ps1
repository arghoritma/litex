# Quick Parallel Benchmark - Menjalankan 3 Test Bersamaan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Quick Parallel Benchmark (3 Tests)" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Install dependencies quietly
npm install ultimate-express express 2>$null | Out-Null

# Start all servers
Write-Host "Starting servers..." -ForegroundColor Yellow
$litex = Start-Process -FilePath "node" -ArgumentList "litex-test.js" -PassThru -WindowStyle Hidden
$express = Start-Process -FilePath "node" -ArgumentList "express-test.js" -PassThru -WindowStyle Hidden
$node = Start-Process -FilePath "node" -ArgumentList "node-test.js" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 3

Write-Host "Running 3 benchmarks in parallel..." -ForegroundColor Green
Write-Host "This will take about 30 seconds..." -ForegroundColor Yellow

# Run all benchmarks in parallel using Jobs
$job1 = Start-Job -ScriptBlock { wrk -t4 -c133 -d30s http://localhost:3006 }
$job2 = Start-Job -ScriptBlock { wrk -t4 -c133 -d30s http://localhost:3008 }  
$job3 = Start-Job -ScriptBlock { wrk -t4 -c134 -d30s http://localhost:3007 }

# Wait for all jobs to complete
Wait-Job $job1, $job2, $job3 | Out-Null

# Get results
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "RESULTS" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "🚀 LiteX (Ultimate Express) - Port 3006:" -ForegroundColor Green
Receive-Job $job1

Write-Host ""
Write-Host "🚀 Regular Express - Port 3008:" -ForegroundColor Yellow  
Receive-Job $job2

Write-Host ""
Write-Host "🚀 Pure Node.js - Port 3007:" -ForegroundColor Blue
Receive-Job $job3

# Cleanup
Remove-Job $job1, $job2, $job3
Stop-Process -Id $litex.Id, $express.Id, $node.Id -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✓ Parallel benchmark completed!" -ForegroundColor Green
