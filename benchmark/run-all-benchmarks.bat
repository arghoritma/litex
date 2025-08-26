@echo off
setlocal enabledelayedexpansion

echo =============================================
echo LiteX vs Express vs Pure Node.js Benchmark
echo =============================================
echo.

echo Installing dependencies...
npm install ultimate-express express >nul 2>&1

echo.
echo Starting all servers...
echo   - LiteX (Ultimate Express) on port 3006
echo   - Regular Express on port 3008  
echo   - Pure Node.js on port 3007

start /B node litex-test.js
start /B node express-test.js
start /B node node-test.js

echo.
echo Waiting for servers to start...
timeout /t 5 >nul

echo.
echo =============================================
echo Testing All Frameworks (30s each)
echo =============================================

echo.
echo ^🚀 Test 1/3: LiteX (Ultimate Express) - Port 3006
echo ---------------------------------------------
wrk -t12 -c400 -d30s http://localhost:3006

echo.
echo ^🚀 Test 2/3: Regular Express - Port 3008
echo ---------------------------------------------
wrk -t12 -c400 -d30s http://localhost:3008

echo.
echo ^🚀 Test 3/3: Pure Node.js - Port 3007
echo ---------------------------------------------
wrk -t12 -c400 -d30s http://localhost:3007

echo.
echo =============================================
echo Benchmark Completed!
echo =============================================

echo.
echo Stopping all servers...
taskkill /f /im node.exe >nul 2>&1

echo.
echo All tests completed successfully!
echo Press any key to exit...
pause >nul
