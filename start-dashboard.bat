@echo off
cd /d "%~dp0"
title NOVAPORTAL Super Admin Dashboard Server
echo ===================================================================
echo   NOVAPORTAL - Super Admin Institutional Performance & Analytics
echo ===================================================================
echo.
echo  Starting local server at: http://localhost:8080
echo  Press Ctrl+C to stop the server at any time.
echo.
timeout /t 1 /nobreak >nul
start "" "http://localhost:8080"
"D:\Mari selvam Data\Mari\Apachi install\php\php.exe" -n -S localhost:8080 -t "%~dp0public"
pause

