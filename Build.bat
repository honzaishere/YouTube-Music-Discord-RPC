@echo off
rd /s /q "Database"
taskkill /f /im "YouTube Music.exe"
npm run dist
pause