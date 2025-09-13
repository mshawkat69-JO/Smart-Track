@echo off
echo.
echo ========================================
echo   SmartTrack Attendance System
echo ========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting the server...
echo.
echo Server will be available at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm start
pause