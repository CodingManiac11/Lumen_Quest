# Git Repository Setup Script

# This script helps you prepare your repository for pushing to a new remote

Write-Host "Quest - Repository Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git repository already initialized ✓" -ForegroundColor Green
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Check git status
Write-Host "`nGit Status:" -ForegroundColor Cyan
git status --short

# Show what will be committed
Write-Host "`nFiles to be committed:" -ForegroundColor Cyan
git diff --cached --name-only

Write-Host "`n" -ForegroundColor White
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the files above" -ForegroundColor White
Write-Host "2. Run: git commit -m 'Initial commit: Stripe-inspired subscription management system'" -ForegroundColor Yellow
Write-Host "3. Add your remote: git remote add origin <your-repo-url>" -ForegroundColor Yellow
Write-Host "4. Push to remote: git push -u origin main" -ForegroundColor Yellow

Write-Host "`nOptional: Create a commit now? (y/n)" -ForegroundColor Cyan
$response = Read-Host

if ($response -eq "y" -or $response -eq "Y") {
    git commit -m "Initial commit: Stripe-inspired subscription management system with modern UI/UX and dual-role authentication"
    Write-Host "Commit created! ✓" -ForegroundColor Green
    Write-Host "Don't forget to add your remote and push!" -ForegroundColor Yellow
}