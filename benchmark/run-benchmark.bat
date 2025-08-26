@echo off
echo ====================================
echo LiteX vs Pure Node.js Benchmark
echo ====================================
echo.

echo Installing dependencies...
npm install ultimate-express >nul 2>&1

echo.
echo Starting LiteX server on port 3006...
start /B node litex-test.js

echo Starting Pure Node.js server on port 3007...
start /B node node-test.js

echo.
echo Waiting for servers to start...
timeout /t 3 >nul

echo.
echo ====================================
echo Testing LiteX (Ultimate Express)
echo ====================================
wrk -t12 -c400 -d30s http://localhost:3006

echo.
echo ====================================
echo Testing Pure Node.js
echo ====================================
wrk -t12 -c400 -d30s http://localhost:3007

echo.
echo ====================================
echo Benchmark completed!
echo ====================================

echo.
echo Stopping servers...
taskkill /f /im node.exe >nul 2>&1

pause
