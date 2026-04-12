# cinematic-start.ps1
Write-Host "--- Initiating Cinematic Credit Risk Environment ---" -ForegroundColor Cyan

# Check for Python
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Python not found in PATH." -ForegroundColor Red
    exit 1
}

# Check for Node
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: NPM not found in PATH." -ForegroundColor Red
    exit 1
}

Write-Host "Launching Frontend (localhost:3000) and Backend (localhost:8000)..." -ForegroundColor Yellow

# Use concurrently to run both
npm.cmd run dev:all
