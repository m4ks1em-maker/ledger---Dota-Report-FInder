@echo off
chcp 65001 >nul
title DotaTraker - keep this window open
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js is not installed. Install the LTS version from nodejs.org and open start.bat again.
  start "" https://nodejs.org
  pause
  exit /b 1
)
if not exist "engine\dtparse.exe" (
  echo  The replay engine is missing. Open setup.bat first.
  pause
  exit /b 1
)
rem stop helpers left over from a previous run: only the ones from this folder (and the old engine)
powershell -NoProfile -Command "Get-Process server,bot,dtbot -ErrorAction SilentlyContinue | Where-Object { $_.Path -and $_.Path.StartsWith('%~dp0engine\', [StringComparison]::OrdinalIgnoreCase) } | Stop-Process -Force" >nul 2>nul
set DOTATRAKER_LOOP=1
cls
:run
node gate\gate.js
if %errorlevel%==75 (
  echo  Restarting DotaTraker...
  set LEDGER_OPEN=0
  goto run
)
echo.
echo  DotaTraker stopped.
pause
