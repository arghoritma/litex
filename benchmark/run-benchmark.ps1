# LiteX Benchmark Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "LiteX vs Pure Node.js Benchmark" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if wrk is installed
try {
    $wrkVersion = wrk --version 2>$null
    Write-Host "✓ wrk is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ wrk is not installed. Please install wrk first:" -ForegroundColor Red
    Write-Host "  choco install wrk" -ForegroundColor Yellow
    Write-Host "  or download from: https://github.com/wg/wrk/releases" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install ultimate-express | Out-Null

# Start servers
Write-Host ""
Write-Host "Starting LiteX server on port 3006..." -ForegroundColor Yellow
$litexProcess = Start-Process -FilePath "node" -ArgumentList "litex-test.js" -PassThru -WindowStyle Hidden

Write-Host "Starting Pure Node.js server on port 3007..." -ForegroundColor Yellow
$nodeProcess = Start-Process -FilePath "node" -ArgumentList "node-test.js" -PassThru -WindowStyle Hidden

# Wait for servers to start
Write-Host ""
Write-Host "Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Test if servers are running
try {
    $litexTest = Invoke-WebRequest -Uri "http://localhost:3006" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ LiteX server is running" -ForegroundColor Green
} catch {
    Write-Host "✗ LiteX server failed to start" -ForegroundColor Red
    exit 1
}

try {
    $nodeTest = Invoke-WebRequest -Uri "http://localhost:3007" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Pure Node.js server is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Pure Node.js server failed to start" -ForegroundColor Red
    exit 1
}

# Run benchmarks
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Testing LiteX (Ultimate Express)" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
wrk -t12 -c400 -d30s http://localhost:3006

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Testing Pure Node.js" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
wrk -t12 -c400 -d30s http://localhost:3007

# Cleanup
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Benchmark completed!" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Stopping servers..." -ForegroundColor Yellow
try {
    Stop-Process -Id $litexProcess.Id -Force
    Stop-Process -Id $nodeProcess.Id -Force
    Write-Host "✓ Servers stopped" -ForegroundColor Green
} catch {
    Write-Host "⚠ Some processes may still be running. Manual cleanup may be needed." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
