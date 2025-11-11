# EpicAura - Full Stack Startup Script
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  STARTING EPICAURA APPLICATION" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

# Start Backend
Write-Host "[1/2] Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\Dell\Documents\wt_mini\epicaura\backend; Write-Host 'Backend Server' -ForegroundColor Yellow; npm start"

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "[2/2] Starting Frontend Development Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\Dell\Documents\wt_mini\epicaura\frontend; Write-Host 'Frontend Server' -ForegroundColor Yellow; npm run dev"

Start-Sleep -Seconds 2

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  APPLICATION STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "`nPress any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
