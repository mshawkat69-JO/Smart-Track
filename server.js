// SmartTrack Express.js Server
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

// Middleware
app.use(compression()); // Compress responses
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Mock database (in production, use a real database)
const mockDatabase = {
    users: {
        'EMP001': { 
            password: 'password123', 
            name: 'John Doe', 
            role: 'employee',
            department: 'IT',
            email: 'john.doe@company.com',
            mobile: '+1234567890'
        },
        'ADMIN001': { 
            password: 'admin123', 
            name: 'Administrator', 
            role: 'superadmin',
            department: 'Administration',
            email: 'admin@company.com',
            mobile: '+1234567891'
        },
        'MGR001': { 
            password: 'manager123', 
            name: 'Property Manager', 
            role: 'property-manager',
            department: 'Management',
            email: 'manager@company.com',
            mobile: '+1234567892'
        }
    },
    properties: [
        { id: 'main-office', name: 'Main Office', address: '123 Business St', city: 'Business City' },
        { id: 'branch-1', name: 'Branch 1', address: '456 Commerce Ave', city: 'Commerce City' },
        { id: 'branch-2', name: 'Branch 2', address: '789 Trade Blvd', city: 'Trade City' }
    ],
    attendance: [],
    vacationRequests: []
};

// Routes

// Serve main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Authentication API
app.post('/api/auth/login', (req, res) => {
    const { employeeId, password, property } = req.body;
    
    console.log(`Login attempt: ${employeeId} for property: ${property}`);
    
    // Validate input
    if (!employeeId || !password || !property) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    
    // Check user credentials
    const user = mockDatabase.users[employeeId];
    if (!user || user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
    
    // Check if property exists
    const propertyExists = mockDatabase.properties.find(p => p.id === property);
    if (!propertyExists) {
        return res.status(400).json({
            success: false,
            message: 'Invalid property'
        });
    }
    
    // Successful login
    res.json({
        success: true,
        message: 'Login successful',
        user: {
            id: employeeId,
            name: user.name,
            role: user.role,
            department: user.department,
            email: user.email,
            property: property
        }
    });
});

// Get user properties
app.get('/api/properties', (req, res) => {
    res.json({
        success: true,
        properties: mockDatabase.properties
    });
});

// Attendance API
app.post('/api/attendance/checkin', (req, res) => {
    const { employeeId, location, timestamp } = req.body;
    
    if (!employeeId || !location) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    
    const attendanceRecord = {
        id: Date.now().toString(),
        employeeId,
        type: 'check-in',
        location,
        timestamp: timestamp || new Date().toISOString(),
        createdAt: new Date().toISOString()
    };
    
    mockDatabase.attendance.push(attendanceRecord);
    
    console.log(`Check-in recorded for ${employeeId} at ${attendanceRecord.timestamp}`);
    
    res.json({
        success: true,
        message: 'Check-in recorded successfully',
        record: attendanceRecord
    });
});

app.post('/api/attendance/checkout', (req, res) => {
    const { employeeId, location, timestamp } = req.body;
    
    if (!employeeId || !location) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    
    const attendanceRecord = {
        id: Date.now().toString(),
        employeeId,
        type: 'check-out',
        location,
        timestamp: timestamp || new Date().toISOString(),
        createdAt: new Date().toISOString()
    };
    
    mockDatabase.attendance.push(attendanceRecord);
    
    console.log(`Check-out recorded for ${employeeId} at ${attendanceRecord.timestamp}`);
    
    res.json({
        success: true,
        message: 'Check-out recorded successfully',
        record: attendanceRecord
    });
});

// Get attendance history
app.get('/api/attendance/:employeeId', (req, res) => {
    const { employeeId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    
    const userAttendance = mockDatabase.attendance
        .filter(record => record.employeeId === employeeId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(parseInt(offset), parseInt(offset) + parseInt(limit));
    
    res.json({
        success: true,
        attendance: userAttendance,
        total: mockDatabase.attendance.filter(record => record.employeeId === employeeId).length
    });
});

// Vacation Requests API
app.post('/api/vacation/request', (req, res) => {
    const { employeeId, fromDate, toDate, reason } = req.body;
    
    if (!employeeId || !fromDate || !toDate) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    
    // Validate dates
    const from = new Date(fromDate);
    const to = new Date(toDate);
    
    if (from >= to) {
        return res.status(400).json({
            success: false,
            message: 'From date must be before to date'
        });
    }
    
    if (from < new Date()) {
        return res.status(400).json({
            success: false,
            message: 'Cannot request vacation for past dates'
        });
    }
    
    const vacationRequest = {
        id: Date.now().toString(),
        employeeId,
        fromDate,
        toDate,
        reason: reason || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    mockDatabase.vacationRequests.push(vacationRequest);
    
    console.log(`Vacation request submitted by ${employeeId} from ${fromDate} to ${toDate}`);
    
    res.json({
        success: true,
        message: 'Vacation request submitted successfully',
        request: vacationRequest
    });
});

// Get vacation requests
app.get('/api/vacation/:employeeId', (req, res) => {
    const { employeeId } = req.params;
    
    const userRequests = mockDatabase.vacationRequests
        .filter(request => request.employeeId === employeeId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
        success: true,
        requests: userRequests
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'SmartTrack server is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Get server stats (for admin)
app.get('/api/stats', (req, res) => {
    res.json({
        success: true,
        stats: {
            totalUsers: Object.keys(mockDatabase.users).length,
            totalProperties: mockDatabase.properties.length,
            totalAttendanceRecords: mockDatabase.attendance.length,
            totalVacationRequests: mockDatabase.vacationRequests.length,
            serverUptime: process.uptime(),
            memoryUsage: process.memoryUsage()
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, HOST, () => {
    console.log('🚀 SmartTrack Server Started Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📍 Server running at: http://${HOST}:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://${HOST}:${PORT}/api/health`);
    console.log(`📈 Server stats: http://${HOST}:${PORT}/api/stats`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🔐 Test Credentials:');
    console.log('   Employee: EMP001 / password123');
    console.log('   Manager:  MGR001 / manager123');
    console.log('   Admin:    ADMIN001 / admin123');
    console.log('');
    console.log('📱 Features Available:');
    console.log('   ✅ Multi-language support (EN/AR)');
    console.log('   ✅ GPS-based check-in/out');
    console.log('   ✅ Vacation request system');
    console.log('   ✅ Responsive design');
    console.log('   ✅ RESTful API endpoints');
    console.log('');
    console.log('🛑 To stop server: Press Ctrl+C');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

module.exports = app;