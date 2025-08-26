# Complete Framework Benchmark - 4 Frameworks Comparison
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Complete Framework Benchmark (4 Frameworks)" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check if wrk is installed
try {
    $wrkVersion = wrk --version 2>$null
    Write-Host "✓ wrk is installed" -ForegroundColor Green
} catch {
    Write-Host "⚠ wrk is not installed. Installing via chocolatey..." -ForegroundColor Yellow
    try {
        choco install wrk -y
        Write-Host "✓ wrk installed successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to install wrk automatically" -ForegroundColor Red
        Write-Host "Please install manually: choco install wrk" -ForegroundColor Yellow
        exit 1
    }
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install ultimate-express express hyper-express 2>$null | Out-Null

# Start all servers
Write-Host ""
Write-Host "Starting all servers..." -ForegroundColor Yellow
Write-Host "  • LiteX (Ultimate Express) on port 3006" -ForegroundColor Green
Write-Host "  • Regular Express on port 3008" -ForegroundColor Blue  
Write-Host "  • Hyper-Express on port 3009" -ForegroundColor Magenta
Write-Host "  • Pure Node.js on port 3007" -ForegroundColor Cyan

$litexProcess = Start-Process -FilePath "node" -ArgumentList "litex-test.js" -PassThru -WindowStyle Hidden
$expressProcess = Start-Process -FilePath "node" -ArgumentList "express-test.js" -PassThru -WindowStyle Hidden
$hyperProcess = Start-Process -FilePath "node" -ArgumentList "hyper-express.js" -PassThru -WindowStyle Hidden
$nodeProcess = Start-Process -FilePath "node" -ArgumentList "node-test.js" -PassThru -WindowStyle Hidden

# Wait for servers to start
Write-Host ""
Write-Host "Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test if all servers are running
$serversOk = $true

try {
    $litexTest = Invoke-WebRequest -Uri "http://localhost:3006" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ LiteX (Ultimate Express) server is running (port 3006)" -ForegroundColor Green
} catch {
    Write-Host "✗ LiteX server failed to start" -ForegroundColor Red
    $serversOk = $false
}

try {
    $expressTest = Invoke-WebRequest -Uri "http://localhost:3008" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Regular Express server is running (port 3008)" -ForegroundColor Blue
} catch {
    Write-Host "✗ Express server failed to start" -ForegroundColor Red
    $serversOk = $false
}

try {
    $hyperTest = Invoke-WebRequest -Uri "http://localhost:3009" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Hyper-Express server is running (port 3009)" -ForegroundColor Magenta
} catch {
    Write-Host "✗ Hyper-Express server failed to start" -ForegroundColor Red
    $serversOk = $false
}

try {
    $nodeTest = Invoke-WebRequest -Uri "http://localhost:3007" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Pure Node.js server is running (port 3007)" -ForegroundColor Cyan
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
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Starting Benchmark Tests (30s each)" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Test 1: LiteX (Ultimate Express)
Write-Host ""
Write-Host "🚀 Test 1/4: LiteX (Ultimate Express)" -ForegroundColor Green
Write-Host "Port: 3006 | Framework: Ultimate Express (uWebSockets)" -ForegroundColor Gray
Write-Host "-----------------------------------------------------" -ForegroundColor Gray
$litexResult = wrk -t12 -c400 -d30s http://localhost:3006

# Test 2: Regular Express
Write-Host ""
Write-Host "🚀 Test 2/4: Regular Express" -ForegroundColor Blue
Write-Host "Port: 3008 | Framework: Express.js (Standard)" -ForegroundColor Gray
Write-Host "-----------------------------------------------------" -ForegroundColor Gray
$expressResult = wrk -t12 -c400 -d30s http://localhost:3008

# Test 3: Hyper-Express
Write-Host ""
Write-Host "🚀 Test 3/4: Hyper-Express" -ForegroundColor Magenta
Write-Host "Port: 3009 | Framework: Hyper-Express (uWebSockets)" -ForegroundColor Gray
Write-Host "-----------------------------------------------------" -ForegroundColor Gray
$hyperResult = wrk -t12 -c400 -d30s http://localhost:3009

# Test 4: Pure Node.js
Write-Host ""
Write-Host "🚀 Test 4/4: Pure Node.js" -ForegroundColor Cyan
Write-Host "Port: 3007 | Framework: Native HTTP" -ForegroundColor Gray
Write-Host "-----------------------------------------------------" -ForegroundColor Gray
$nodeResult = wrk -t12 -c400 -d30s http://localhost:3007

# Save results to file
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$resultFile = "complete-benchmark-results-$timestamp.md"

$results = @"
# Complete Framework Benchmark Results
Generated: $(Get-Date)

## Test Configuration
- Threads: 12
- Connections: 400
- Duration: 30 seconds each
- Target: localhost

## Results Summary

### 1. LiteX (Ultimate Express) - Port 3006
Framework: Ultimate Express with uWebSockets.js
```
$litexResult
```

### 2. Regular Express - Port 3008
Framework: Standard Express.js
```
$expressResult
```

### 3. Hyper-Express - Port 3009
Framework: Hyper-Express with uWebSockets.js
```
$hyperResult
```

### 4. Pure Node.js - Port 3007
Framework: Native Node.js HTTP server
```
$nodeResult
```

## Framework Comparison

| Framework | Port | Base Technology | Expected Performance |
|-----------|------|----------------|---------------------|
| LiteX (Ultimate Express) | 3006 | uWebSockets.js + Express API | Highest (Express compatible) |
| Hyper-Express | 3009 | uWebSockets.js + Custom API | High (Different API) |
| Pure Node.js | 3007 | Native HTTP | Good baseline |
| Regular Express | 3008 | Standard Node.js HTTP | Moderate |

## Key Differences

**LiteX (Ultimate Express):**
- Drop-in replacement for Express.js
- Full Express API compatibility
- Built on uWebSockets.js for performance
- Easy migration from Express

**Hyper-Express:**
- High performance with uWebSockets.js
- Different API from Express
- Requires code changes for migration
- Custom middleware system

**Regular Express:**
- Industry standard web framework
- Extensive middleware ecosystem
- Familiar API and patterns
- Moderate performance

**Pure Node.js:**
- Baseline performance reference
- No framework overhead
- Manual implementation required
- Good for comparison

"@

$results | Out-File -FilePath $resultFile -Encoding UTF8

# Cleanup
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Benchmark Completed!" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "📊 Results saved to: $resultFile" -ForegroundColor Green
Write-Host ""
Write-Host "Stopping all servers..." -ForegroundColor Yellow

try {
    Stop-Process -Id $litexProcess.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $expressProcess.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $hyperProcess.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $nodeProcess.Id -Force -ErrorAction SilentlyContinue
    Write-Host "✓ All servers stopped" -ForegroundColor Green
} catch {
    Write-Host "⚠ Some processes may still be running. Manual cleanup may be needed." -ForegroundColor Yellow
    Write-Host "Run: Get-Process node | Stop-Process -Force" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  📊 Results saved to $resultFile" -ForegroundColor White
Write-Host "  🔧 All servers have been stopped" -ForegroundColor White
Write-Host "  ✅ Complete benchmark finished successfully" -ForegroundColor White
Write-Host ""
Write-Host "Expected Performance Ranking:" -ForegroundColor Yellow
Write-Host "  🥇 LiteX (Ultimate Express) - Highest" -ForegroundColor Green
Write-Host "  🥈 Hyper-Express - High" -ForegroundColor Magenta
Write-Host "  🥉 Pure Node.js - Good" -ForegroundColor Cyan
Write-Host "  4️⃣ Regular Express - Moderate" -ForegroundColor Blue
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
