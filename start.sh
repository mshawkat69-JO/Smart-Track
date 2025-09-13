#!/bin/bash

echo ""
echo "========================================"
echo "   SmartTrack Attendance System"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo ""
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "Please install npm (usually comes with Node.js)"
    echo ""
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    echo ""
    exit 1
fi

echo ""
echo "🚀 Starting SmartTrack server..."
echo ""
echo "Server will be available at:"
echo "🌍 http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
npm start