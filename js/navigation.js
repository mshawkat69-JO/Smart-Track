// Navigation and routing for SmartTrack
class SmartTrackNavigation {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.bindNavigationEvents();
        this.setupMobileMenu();
        this.handleRouting();
    }

    bindNavigationEvents() {
        // Navigation menu clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-item a[data-section]');
            if (navLink) {
                e.preventDefault();
                const section = navLink.getAttribute('data-section');
                this.navigateToSection(section);
            }
        });

        // Back button handling
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.navigateToSection(e.state.section, false);
            }
        });

        // Mobile menu overlay
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !e.target.closest('.mobile-menu-toggle')) {
                this.closeMobileMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    navigateToSection(sectionId, updateHistory = true) {
        // Validate section exists
        const targetSection = document.getElementById(sectionId + '-section');
        if (!targetSection) {
            console.warn(`Section ${sectionId} not found`);
            return;
        }

        // Update current section
        this.currentSection = sectionId;

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
            section.setAttribute('aria-hidden', 'true');
        });

        // Show target section
        targetSection.classList.add('active');
        targetSection.setAttribute('aria-hidden', 'false');

        // Update navigation active state
        this.updateNavigationState(sectionId);

        // Update browser history
        if (updateHistory) {
            const title = this.getSectionTitle(sectionId);
            history.pushState(
                { section: sectionId }, 
                title, 
                `#${sectionId}`
            );
            document.title = `SmartTrack - ${title}`;
        }

        // Load section-specific data
        this.loadSectionData(sectionId);

        // Close mobile menu if open
        this.closeMobileMenu();

        // Scroll to top
        window.scrollTo(0, 0);

        // Announce to screen readers
        this.announceNavigation(sectionId);
    }

    updateNavigationState(activeSection) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link) {
                link.setAttribute('aria-current', 'false');
            }
        });

        // Add active class to current nav item
        const activeNavItem = document.querySelector(`[data-section="${activeSection}"]`);
        if (activeNavItem) {
            const navItem = activeNavItem.closest('.nav-item');
            if (navItem) {
                navItem.classList.add('active');
                activeNavItem.setAttribute('aria-current', 'page');
            }
        }
    }

    getSectionTitle(sectionId) {
        const titles = {
            'dashboard': window.SmartTrackTranslations.t('dashboard', 'Dashboard'),
            'admin-dashboard': window.SmartTrackTranslations.t('dashboard', 'Dashboard'),
            'property-dashboard': window.SmartTrackTranslations.t('dashboard', 'Dashboard'),
            'checkin': window.SmartTrackTranslations.t('check_in', 'Check In'),
            'vacation': window.SmartTrackTranslations.t('vacation', 'Vacation'),
            'attendance': window.SmartTrackTranslations.t('attendance_history', 'Attendance History'),
            'requests': window.SmartTrackTranslations.t('request_status', 'Request Status'),
            'buyers': window.SmartTrackTranslations.t('buyers', 'Buyers'),
            'company-profiles': window.SmartTrackTranslations.t('company_profiles', 'Company Profiles'),
            'gps-location': window.SmartTrackTranslations.t('gps_location', 'GPS Location'),
            'properties': window.SmartTrackTranslations.t('properties', 'Properties'),
            'employees': window.SmartTrackTranslations.t('employees', 'Employees'),
            'vacation-requests': window.SmartTrackTranslations.t('vacation_requests', 'Vacation Requests')
        };
        return titles[sectionId] || sectionId;
    }

    loadSectionData(sectionId) {
        switch (sectionId) {
            case 'attendance':
                this.loadAttendanceHistory();
                break;
            case 'requests':
                this.loadRequestStatus();
                break;
            case 'employees':
                this.loadEmployeeData();
                break;
            case 'vacation-requests':
                this.loadVacationRequests();
                break;
            case 'gps-location':
                this.loadGPSData();
                break;
            default:
                // No specific data loading required
                break;
        }
    }

    loadAttendanceHistory() {
        const records = JSON.parse(localStorage.getItem('smarttrack-attendance') || '[]');
        const container = document.querySelector('#attendance-section .attendance-summary');
        
        if (container && records.length > 0) {
            const sortedRecords = records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            const html = sortedRecords.map(record => `
                <div class="summary-item">
                    <span>${window.SmartTrackTranslations.formatDate(new Date(record.timestamp))}</span>
                    <span>${window.SmartTrackTranslations.formatTime(new Date(record.timestamp))}</span>
                    <span class="status-${record.type === 'check-in' ? 'present' : 'approved'}">
                        ${record.type === 'check-in' ? 
                            window.SmartTrackTranslations.t('check_in', 'Check In') : 
                            window.SmartTrackTranslations.t('check_out', 'Check Out')
                        }
                    </span>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="summary-item">
                    <span data-translate="date">DATE</span>
                    <span data-translate="check_in">TIME</span>
                    <span data-translate="status">STATUS</span>
                </div>
                ${html}
            `;
        }
    }

    loadRequestStatus() {
        const requests = JSON.parse(localStorage.getItem('smarttrack-vacation-requests') || '[]');
        const container = document.querySelector('#requests-section .request-summary');
        
        if (container) {
            if (requests.length > 0) {
                const html = requests.map(request => `
                    <div class="summary-item">
                        <span>Vacation Request</span>
                        <span>${window.SmartTrackTranslations.formatDate(new Date(request.fromDate))} - ${window.SmartTrackTranslations.formatDate(new Date(request.toDate))}</span>
                        <span class="status-${request.status}">${window.SmartTrackTranslations.t(request.status, request.status)}</span>
                    </div>
                `).join('');

                container.innerHTML = `
                    <div class="summary-item">
                        <span data-translate="request_type">TYPE</span>
                        <span data-translate="date">DATE</span>
                        <span data-translate="status">STATUS</span>
                    </div>
                    ${html}
                `;
            } else {
                container.innerHTML = `
                    <div class="summary-item">
                        <span>No requests found</span>
                    </div>
                `;
            }
        }
    }

    loadEmployeeData() {
        // Mock employee data
        const employees = [
            { id: 'EMP001', name: 'John Doe', department: 'IT', status: 'present' },
            { id: 'EMP002', name: 'Jane Smith', department: 'HR', status: 'present' },
            { id: 'EMP003', name: 'Mike Johnson', department: 'Finance', status: 'absent' },
            { id: 'EMP004', name: 'Sarah Wilson', department: 'Marketing', status: 'on-leave' }
        ];

        // Update employee statistics
        this.updateEmployeeStats(employees);
    }

    updateEmployeeStats(employees) {
        const total = employees.length;
        const present = employees.filter(emp => emp.status === 'present').length;
        const absent = employees.filter(emp => emp.status === 'absent').length;
        const onLeave = employees.filter(emp => emp.status === 'on-leave').length;

        // Update stat cards
        const statItems = document.querySelectorAll('.employee-stats .stat-item');
        if (statItems.length >= 4) {
            statItems[0].querySelector('.stat-number').textContent = total;
            statItems[1].querySelector('.stat-number').textContent = present;
            statItems[2].querySelector('.stat-number').textContent = absent;
            statItems[3].querySelector('.stat-number').textContent = onLeave;
        }
    }

    loadVacationRequests() {
        const requests = JSON.parse(localStorage.getItem('smarttrack-vacation-requests') || '[]');
        const container = document.querySelector('#vacation-requests-section .requests-table tbody');
        
        if (container) {
            if (requests.length > 0) {
                const html = requests.map(request => `
                    <tr>
                        <td>Vacation Request</td>
                        <td>${window.SmartTrackTranslations.formatDate(new Date(request.fromDate))}</td>
                        <td><span class="status-${request.status}">${window.SmartTrackTranslations.t(request.status, request.status)}</span></td>
                    </tr>
                `).join('');
                container.innerHTML = html;
            } else {
                container.innerHTML = `
                    <tr>
                        <td colspan="3">No vacation requests found</td>
                    </tr>
                `;
            }
        }
    }

    loadGPSData() {
        // Mock GPS data
        const gpsData = [
            { date: '04/10/2024', location: 'Main Office', status: 'approved' },
            { date: '03/10/2024', location: 'Branch 1', status: 'pending' }
        ];

        const container = document.querySelector('#admin-dashboard-section .gps-table tbody');
        if (container) {
            const html = gpsData.map(item => `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.location}</td>
                    <td><span class="status-${item.status}">${window.SmartTrackTranslations.t(item.status, item.status)}</span></td>
                </tr>
            `).join('');
            container.innerHTML = html;
        }
    }

    setupMobileMenu() {
        // Add mobile menu toggle button if it doesn't exist
        const header = document.querySelector('.dashboard-header .header-left');
        if (header && !header.querySelector('.mobile-menu-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-menu-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
            toggleBtn.addEventListener('click', () => this.toggleMobileMenu());
            header.insertBefore(toggleBtn, header.firstChild);
        }

        // Add overlay for mobile menu
        if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.addEventListener('click', () => this.closeMobileMenu());
            document.body.appendChild(overlay);
        }
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (sidebar) {
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                sidebar.classList.add('active');
                if (overlay) overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus first menu item for accessibility
                const firstMenuItem = sidebar.querySelector('.nav-item a');
                if (firstMenuItem) {
                    firstMenuItem.focus();
                }
            }
        }
    }

    closeMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    handleRouting() {
        // Handle initial route
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.navigateToSection(hash, false);
        }
    }

    announceNavigation(sectionId) {
        // Create or update live region for screen readers
        let liveRegion = document.getElementById('nav-announcement');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'nav-announcement';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            document.body.appendChild(liveRegion);
        }

        const sectionTitle = this.getSectionTitle(sectionId);
        liveRegion.textContent = `Navigated to ${sectionTitle}`;
    }

    // Public method to get current section
    getCurrentSection() {
        return this.currentSection;
    }

    // Public method to check if mobile menu is open
    isMobileMenuOpen() {
        const sidebar = document.querySelector('.sidebar');
        return sidebar ? sidebar.classList.contains('active') : false;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.smartTrackNavigation = new SmartTrackNavigation();
});

// Export for use in other files
window.SmartTrackNavigation = SmartTrackNavigation;