# 🚀 SmartTrack Node.js Setup Guide

Complete guide to run SmartTrack using Node.js with Express.js server.

## 📋 Prerequisites

### 1. Install Node.js
- **Download**: Go to [nodejs.org](https://nodejs.org/)
- **Choose**: LTS version (recommended)
- **Install**: Follow the installer instructions
- **Verify**: Open terminal/command prompt and run:
  ```bash
  node --version
  npm --version
  ```

## ⚡ Quick Start (Easiest Method)

### Windows Users:
1. **Double-click** `start.bat` file
2. **Wait** for installation to complete
3. **Open browser** to `http://localhost:3000`

### Mac/Linux Users:
1. **Double-click** `start.sh` file (or run in terminal)
2. **Wait** for installation to complete
3. **Open browser** to `http://localhost:3000`

## 🛠️ Manual Setup (Step by Step)

### Step 1: Open Terminal/Command Prompt
```bash
# Navigate to the SmartTrack folder
cd /path/to/smarttrack
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Open in Browser
Go to: **http://localhost:3000**

## 🔧 Available Scripts

```bash
# Start the server (production mode)
npm start

# Start with auto-restart (development mode)
npm run dev

# Install all dependencies
npm run install-deps

# Complete setup (install + instructions)
npm run setup
```

## 🌐 Server Features

### 🔐 Authentication API
- **POST** `/api/auth/login` - User login
- **GET** `/api/properties` - Get available properties

### ⏰ Attendance API
- **POST** `/api/attendance/checkin` - Record check-in
- **POST** `/api/attendance/checkout` - Record check-out
- **GET** `/api/attendance/:employeeId` - Get attendance history

### 🏖️ Vacation API
- **POST** `/api/vacation/request` - Submit vacation request
- **GET** `/api/vacation/:employeeId` - Get vacation requests

### 📊 System API
- **GET** `/api/health` - Health check
- **GET** `/api/stats` - Server statistics

## 🔐 Test Credentials

| Role | Employee ID | Password | Access Level |
|------|-------------|----------|--------------|
| Employee | `EMP001` | `password123` | Basic dashboard, check-in/out |
| Manager | `MGR001` | `manager123` | Employee management |
| Admin | `ADMIN001` | `admin123` | Full system access |

## 🌍 Server Configuration

### Environment Variables
Create a `.env` file for custom configuration:
```env
PORT=3000
HOST=localhost
NODE_ENV=development
```

### Custom Port
```bash
# Run on different port
PORT=8080 npm start
```

### Production Mode
```bash
NODE_ENV=production npm start
```

## 🔍 API Testing

### Using curl:
```bash
# Health check
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"employeeId":"EMP001","password":"password123","property":"main-office"}'

# Check-in
curl -X POST http://localhost:3000/api/attendance/checkin \
  -H "Content-Type: application/json" \
  -d '{"employeeId":"EMP001","location":{"latitude":40.7128,"longitude":-74.0060}}'
```

### Using Browser:
- Health: http://localhost:3000/api/health
- Stats: http://localhost:3000/api/stats

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Permission Issues (Mac/Linux)
```bash
# Make scripts executable
chmod +x start.sh
```

## 📱 Features Available

### ✅ Frontend Features
- Responsive design (mobile, tablet, desktop)
- Multi-language support (English/Arabic)
- GPS-based check-in/check-out
- Vacation request system
- Attendance history
- Real-time API integration

### ✅ Backend Features
- RESTful API endpoints
- Request validation
- Error handling
- CORS support
- Security headers (Helmet)
- Request logging (Morgan)
- Response compression

## 🔧 Development

### File Structure
```
smarttrack/
├── server.js          # Express server
├── package.json       # Dependencies
├── index.html         # Main app
├── styles/           # CSS files
├── js/               # JavaScript files
├── start.bat         # Windows startup
├── start.sh          # Unix startup
└── NODE_SETUP.md     # This guide
```

### Adding New Features
1. **API Endpoints**: Add to `server.js`
2. **Frontend**: Modify files in `js/` and `styles/`
3. **Database**: Replace mock data with real database

## 🚀 Deployment

### Development
```bash
npm run dev  # Auto-restart on changes
```

### Production
```bash
npm start    # Standard production start
```

### Cloud Deployment
- **Heroku**: `git push heroku main`
- **Vercel**: `vercel --prod`
- **AWS**: Use PM2 or Docker

## 📞 Support

### Common Issues
1. **"Cannot find module"**: Run `npm install`
2. **"Port in use"**: Change port or kill existing process
3. **"Permission denied"**: Check file permissions
4. **API errors**: Check browser console and server logs

### Getting Help
- Check server console for error messages
- Open browser developer tools (F12)
- Review API responses in Network tab

---

## 🎯 Quick Commands Summary

```bash
# Setup and start (one command)
npm run setup && npm start

# Development with auto-restart
npm run dev

# Production start
NODE_ENV=production npm start

# Health check
curl http://localhost:3000/api/health
```

**🎉 Enjoy using SmartTrack with Node.js!**