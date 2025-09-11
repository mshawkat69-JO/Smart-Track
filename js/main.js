// SmartTrack Main JavaScript
class SmartTrackApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'login';
        this.currentLocation = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkSavedCredentials();
        this.initGeolocation();
        this.loadMockData();
    }

    bindEvents() {
        // Login form
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-section]')) {
                e.preventDefault();
                const section = e.target.closest('[data-section]').getAttribute('data-section');
                this.showSection(section);
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Check-in/out buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.check-in-btn')) {
                this.handleCheckIn();
            }
            if (e.target.closest('.check-out-btn')) {
                this.handleCheckOut();
            }
        });

        // Vacation request
        document.addEventListener('click', (e) => {
            if (e.target.closest('button[onclick="submitVacationRequest()"]')) {
                e.preventDefault();
                this.submitVacationRequest();
            }
        });

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const employeeId = document.getElementById('employeeId').value;
        const password = document.getElementById('password').value;
        const property = document.getElementById('property').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Mock authentication
        if (this.authenticateUser(employeeId, password, property)) {
            if (rememberMe) {
                localStorage.setItem('smarttrack-credentials', JSON.stringify({
                    employeeId,
                    property
                }));
            }

            this.currentUser = {
                id: employeeId,
                name: this.getUserName(employeeId),
                role: this.getUserRole(employeeId),
                property: property
            };

            this.showDashboard();
            this.showMessage(window.SmartTrackTranslations.t('success_login', 'Login successful'), 'success');
        } else {
            this.showMessage(window.SmartTrackTranslations.t('error_login', 'Invalid credentials'), 'error');
        }
    }

    authenticateUser(employeeId, password, property) {
        // Mock authentication logic
        const validUsers = {
            'EMP001': { password: 'password123', role: 'employee', name: 'John Doe' },
            'ADMIN001': { password: 'admin123', role: 'superadmin', name: 'Administrator' },
            'MGR001': { password: 'manager123', role: 'property-manager', name: 'Property Manager' }
        };

        return validUsers[employeeId] && validUsers[employeeId].password === password && property;
    }

    getUserName(employeeId) {
        const users = {
            'EMP001': 'John Doe',
            'ADMIN001': 'Administrator',
            'MGR001': 'Property Manager'
        };
        return users[employeeId] || 'User';
    }

    getUserRole(employeeId) {
        const roles = {
            'EMP001': 'employee',
            'ADMIN001': 'superadmin',
            'MGR001': 'property-manager'
        };
        return roles[employeeId] || 'employee';
    }

    showDashboard() {
        this.hidePage('login-page');
        
        switch (this.currentUser.role) {
            case 'employee':
                this.showPage('employee-dashboard');
                break;
            case 'superadmin':
                this.showPage('superadmin-dashboard');
                break;
            case 'property-manager':
                this.showPage('property-dashboard');
                break;
        }
        
        this.updateUserInfo();
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }
    }

    hidePage(pageId) {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.remove('active');
        }
    }

    showSection(sectionId) {
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const navItem = document.querySelector(`[data-section="${sectionId}"]`).closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }
    }

    updateUserInfo() {
        if (!this.currentUser) return;

        const userInfoElements = document.querySelectorAll('.user-info span');
        userInfoElements.forEach(el => {
            if (window.SmartTrackTranslations.currentLanguage() === 'ar') {
                el.textContent = `مرحباً، ${this.currentUser.name}`;
            } else {
                el.textContent = `Welcome, ${this.currentUser.name}`;
            }
        });

        const welcomeElements = document.querySelectorAll('[data-translate="welcome"]');
        welcomeElements.forEach(el => {
            if (window.SmartTrackTranslations.currentLanguage() === 'ar') {
                el.textContent = `مرحباً، ${this.currentUser.name}`;
            } else {
                el.textContent = `Welcome, ${this.currentUser.name}`;
            }
        });
    }

    checkSavedCredentials() {
        const saved = localStorage.getItem('smarttrack-credentials');
        if (saved) {
            try {
                const credentials = JSON.parse(saved);
                document.getElementById('employeeId').value = credentials.employeeId;
                document.getElementById('property').value = credentials.property;
                document.getElementById('rememberMe').checked = true;
            } catch (e) {
                localStorage.removeItem('smarttrack-credentials');
            }
        }
    }

    initGeolocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                }
            );
        }
    }

    handleCheckIn() {
        if (!this.currentLocation) {
            this.showMessage(window.SmartTrackTranslations.t('error_location', 'Location access required'), 'error');
            return;
        }

        // Mock check-in logic
        const now = new Date();
        const checkInData = {
            timestamp: now,
            location: this.currentLocation,
            type: 'check-in'
        };

        // Save to localStorage (in real app, would send to server)
        this.saveAttendanceRecord(checkInData);
        
        this.showMessage(window.SmartTrackTranslations.t('success_checkin', 'Checked in successfully'), 'success');
        this.updateAttendanceDisplay();
    }

    handleCheckOut() {
        if (!this.currentLocation) {
            this.showMessage(window.SmartTrackTranslations.t('error_location', 'Location access required'), 'error');
            return;
        }

        // Mock check-out logic
        const now = new Date();
        const checkOutData = {
            timestamp: now,
            location: this.currentLocation,
            type: 'check-out'
        };

        this.saveAttendanceRecord(checkOutData);
        
        this.showMessage(window.SmartTrackTranslations.t('success_checkout', 'Checked out successfully'), 'success');
        this.updateAttendanceDisplay();
    }

    submitVacationRequest() {
        const fromDate = document.getElementById('vacationFrom').value;
        const toDate = document.getElementById('vacationTo').value;

        if (!fromDate || !toDate) {
            this.showMessage('Please select both dates', 'error');
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            this.showMessage('From date cannot be later than to date', 'error');
            return;
        }

        // Mock vacation request
        const requestData = {
            fromDate,
            toDate,
            status: 'pending',
            timestamp: new Date()
        };

        this.saveVacationRequest(requestData);
        
        this.showMessage(window.SmartTrackTranslations.t('success_request', 'Request submitted successfully'), 'success');
        
        // Clear form
        document.getElementById('vacationFrom').value = '';
        document.getElementById('vacationTo').value = '';
    }

    saveAttendanceRecord(record) {
        const records = JSON.parse(localStorage.getItem('smarttrack-attendance') || '[]');
        records.push(record);
        localStorage.setItem('smarttrack-attendance', JSON.stringify(records));
    }

    saveVacationRequest(request) {
        const requests = JSON.parse(localStorage.getItem('smarttrack-vacation-requests') || '[]');
        requests.push(request);
        localStorage.setItem('smarttrack-vacation-requests', JSON.stringify(requests));
    }

    updateAttendanceDisplay() {
        const records = JSON.parse(localStorage.getItem('smarttrack-attendance') || '[]');
        const recentRecords = records.slice(-5).reverse();

        // Update attendance history section
        const attendanceContainer = document.querySelector('.attendance-summary');
        if (attendanceContainer && recentRecords.length > 0) {
            const summaryHtml = recentRecords.map(record => `
                <div class="summary-item">
                    <span>${window.SmartTrackTranslations.formatDate(new Date(record.timestamp))}</span>
                    <span>${window.SmartTrackTranslations.formatTime(new Date(record.timestamp))}</span>
                    <span class="status-present">${record.type === 'check-in' ? 'Check In' : 'Check Out'}</span>
                </div>
            `).join('');

            attendanceContainer.innerHTML = `
                <div class="summary-item">
                    <span data-translate="date">DATE</span>
                    <span data-translate="check_in">CHECK IN</span>
                    <span data-translate="status">STATUS</span>
                </div>
                ${summaryHtml}
            `;
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;

        // Insert message
        const container = document.querySelector('.main-content') || document.querySelector('.login-form-section');
        if (container) {
            container.insertBefore(messageEl, container.firstChild);

            // Auto remove after 5 seconds
            setTimeout(() => {
                messageEl.remove();
            }, 5000);
        }
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 991) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        }
    }

    loadMockData() {
        // Load mock attendance data if none exists
        if (!localStorage.getItem('smarttrack-attendance')) {
            const mockAttendance = [
                {
                    timestamp: new Date('2024-01-15T09:00:00'),
                    type: 'check-in',
                    location: { latitude: 40.7128, longitude: -74.0060 }
                },
                {
                    timestamp: new Date('2024-01-15T17:30:00'),
                    type: 'check-out',
                    location: { latitude: 40.7128, longitude: -74.0060 }
                },
                {
                    timestamp: new Date('2024-01-14T08:45:00'),
                    type: 'check-in',
                    location: { latitude: 40.7128, longitude: -74.0060 }
                }
            ];
            localStorage.setItem('smarttrack-attendance', JSON.stringify(mockAttendance));
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('smarttrack-credentials');
        this.showPage('login-page');
        this.showMessage('Logged out successfully', 'success');
    }
}

// Global functions for onclick handlers
function checkIn() {
    if (window.smartTrackApp) {
        window.smartTrackApp.handleCheckIn();
    }
}

function checkOut() {
    if (window.smartTrackApp) {
        window.smartTrackApp.handleCheckOut();
    }
}

function submitVacationRequest() {
    if (window.smartTrackApp) {
        window.smartTrackApp.submitVacationRequest();
    }
}

function logout() {
    if (window.smartTrackApp) {
        window.smartTrackApp.logout();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.smartTrackApp = new SmartTrackApp();
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}