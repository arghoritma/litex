# LiteX Complete Benchmark Script - Menjalankan 3 Test Bersamaan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "LiteX vs Express vs Pure Node.js Benchmark" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if wrk is installed
try {
    $wrkVersion = wrk --version 2>$null
    Write-Host "✓ wrk is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ wrk is not installed. Installing via chocolatey..." -ForegroundColor Yellow
    try {
        choco install wrk -y
        Write-Host "✓ wrk installed successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to install wrk. Please install manually:" -ForegroundColor Red
        Write-Host "  choco install wrk" -ForegroundColor Yellow
        Write-Host "  or download from: https://github.com/wg/wrk/releases" -ForegroundColor Yellow
        exit 1
    }
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install ultimate-express express 2>$null | Out-Null

# Start all servers
Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Yellow
Write-Host "  • LiteX (Ultimate Express) on port 3006" -ForegroundColor Cyan
Write-Host "  • Regular Express on port 3008" -ForegroundColor Cyan  
Write-Host "  • Pure Node.js on port 3007" -ForegroundColor Cyan

$litexProcess = Start-Process -FilePath "node" -ArgumentList "litex-test.js" -PassThru -WindowStyle Hidden
$expressProcess = Start-Process -FilePath "node" -ArgumentList "express-test.js" -PassThru -WindowStyle Hidden
$nodeProcess = Start-Process -FilePath "node" -ArgumentList "node-test.js" -PassThru -WindowStyle Hidden

# Wait for servers to start
Write-Host ""
Write-Host "Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test if all servers are running
$serversOk = $true

try {
    $litexTest = Invoke-WebRequest -Uri "http://localhost:3006" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ LiteX server is running (port 3006)" -ForegroundColor Green
} catch {
    Write-Host "✗ LiteX server failed to start" -ForegroundColor Red
    $serversOk = $false
}

try {
    $expressTest = Invoke-WebRequest -Uri "http://localhost:3008" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Express server is running (port 3008)" -ForegroundColor Green
} catch {
    Write-Host "✗ Express server failed to start" -ForegroundColor Red
    $serversOk = $false
}

try {
    $nodeTest = Invoke-WebRequest -Uri "http://localhost:3007" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Pure Node.js server is running (port 3007)" -ForegroundColor Green
} catch {
    Write-Host "✗ Pure Node.js server failed to start" -ForegroundColor Red
    $serversOk = $false
}

if (-not $serversOk) {
    Write-Host ""
    Write-Host "Some servers failed to start. Exiting..." -ForegroundColor Red
    exit 1
}

# Run benchmarks
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Starting Benchmark Tests (30s each)" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Test 1: LiteX (Ultimate Express)
Write-Host ""
Write-Host "🚀 Test 1/3: LiteX (Ultimate Express)" -ForegroundColor Green
Write-Host "Port: 3006 | Framework: Ultimate Express" -ForegroundColor Gray
Write-Host "---------------------------------------------" -ForegroundColor Gray
$litexResult = wrk -t12 -c400 -d30s http://localhost:3006

# Test 2: Regular Express
Write-Host ""
Write-Host "🚀 Test 2/3: Regular Express" -ForegroundColor Yellow
Write-Host "Port: 3008 | Framework: Express.js" -ForegroundColor Gray
Write-Host "---------------------------------------------" -ForegroundColor Gray
$expressResult = wrk -t12 -c400 -d30s http://localhost:3008

# Test 3: Pure Node.js
Write-Host ""
Write-Host "🚀 Test 3/3: Pure Node.js" -ForegroundColor Blue
Write-Host "Port: 3007 | Framework: Native HTTP" -ForegroundColor Gray
Write-Host "---------------------------------------------" -ForegroundColor Gray
$nodeResult = wrk -t12 -c400 -d30s http://localhost:3007

# Save results to file
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$resultFile = "benchmark-results-$timestamp.md"

$results = @"
# LiteX Benchmark Results
Generated: $(Get-Date)

## Test Configuration
- Threads: 12
- Connections: 400
- Duration: 30 seconds each
- Target: localhost

## Results Summary

### 1. LiteX (Ultimate Express) - Port 3006
``````
$litexResult
``````

### 2. Regular Express - Port 3008
``````
$expressResult
``````

### 3. Pure Node.js - Port 3007
``````
$nodeResult
``````

## Performance Comparison

| Framework | Port | Description |
|-----------|------|-------------|
| LiteX (Ultimate Express) | 3006 | High-performance Express alternative with uWebSockets |
| Regular Express | 3008 | Standard Express.js framework |
| Pure Node.js | 3007 | Native Node.js HTTP server |

"@

$results | Out-File -FilePath $resultFile -Encoding UTF8

# Cleanup
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Benchmark Completed!" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "📊 Results saved to: $resultFile" -ForegroundColor Green
Write-Host ""
Write-Host "Stopping servers..." -ForegroundColor Yellow

try {
    Stop-Process -Id $litexProcess.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $expressProcess.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $nodeProcess.Id -Force -ErrorAction SilentlyContinue
    Write-Host "✓ All servers stopped" -ForegroundColor Green
} catch {
    Write-Host "⚠ Some processes may still be running. Manual cleanup may be needed." -ForegroundColor Yellow
    Write-Host "Run: Get-Process node | Stop-Process -Force" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  • Results saved to $resultFile" -ForegroundColor White
Write-Host "  • All servers have been stopped" -ForegroundColor White
Write-Host "  • Benchmark completed successfully" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
