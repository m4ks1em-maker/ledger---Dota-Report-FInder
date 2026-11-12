@echo off
chcp 65001 >nul
title DotaTraker setup
cd /d "%~dp0"
echo.
echo  DotaTraker setup
echo  ------------
where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js is not installed. Opening nodejs.org: install the LTS version, then run setup.bat again.
  start "" https://nodejs.org
  pause
  exit /b 1
)
echo  Downloading the DotaTraker engine ...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$e=Join-Path (Get-Location) 'engine'; New-Item -ItemType Directory -Force $e | Out-Null;" ^
  "$b='https://raw.githubusercontent.com/m4ks1em-maker/ledger---Dota-Report-FInder/engine/';" ^
  "foreach($n in 'dtparse.exe','dtbot.exe'){ Invoke-WebRequest ($b+$n) -OutFile (Join-Path $e $n) };" ^
  "foreach($n in 'server.exe','bot.exe'){ $f=Join-Path $e $n; if(Test-Path $f){ Remove-Item $f -Force } };" ^
  "Set-Content (Join-Path $e 'engine-rev.txt') (Invoke-RestMethod 'https://raw.githubusercontent.com/m4ks1em-maker/ledger---Dota-Report-FInder/main/package.json').engineRev -NoNewline;" ^
  "Write-Host '  Engine installed.'"
if errorlevel 1 (
  echo.
  echo  Setup failed. Check your internet connection and run setup.bat again.
  pause
  exit /b 1
)
rem DotaTraker 1.x kept the engine next to this file; the engine folder replaces it
for %%f in (server.exe bot.exe) do if exist "%%f" del /q "%%f" >nul 2>nul
if exist "assets\portraits" rmdir /s /q "assets" >nul 2>nul
echo.
echo  Done. Now open start.bat
echo.
pause
