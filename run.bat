@echo off
setlocal enabledelayedexpansion

title FixNGo Web Application

echo ===================================================
echo             Starting FixNGo Application            
echo ===================================================

cd /d "%~dp0"

:: Ensure dotnet paths are in PATH
set "PATH=%LOCALAPPDATA%\dotnet;%USERPROFILE%\.dotnet\tools;C:\Program Files\dotnet;%PATH%"

:: Check if dotnet is accessible
where dotnet >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] .NET SDK is not found.
    echo Attempting to install .NET 8 SDK...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://dot.net/v1/dotnet-install.ps1' -OutFile '$env:TEMP\dotnet-install.ps1'; & '$env:TEMP\dotnet-install.ps1' -Channel 8.0 -InstallDir '$env:LOCALAPPDATA\dotnet' }"
    set "PATH=%LOCALAPPDATA%\dotnet;%USERPROFILE%\.dotnet\tools;%PATH%"
)

where dotnet >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to locate or install .NET SDK. Please install .NET 8 SDK.
    pause
    exit /b 1
)

echo.
echo [.NET SDK Detected]
dotnet --version
echo.

echo Launching FixNGo.Web...
echo Application will be accessible at:
echo   - HTTPS: https://localhost:60101
echo   - HTTP:  http://localhost:60102
echo.
echo Press Ctrl+C to stop the application.
echo ===================================================
echo.

:: Launch browser after server starts
start /b "" powershell -NoProfile -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:60102'"

dotnet run --project FixNGo.Web
