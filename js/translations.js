// Multi-language support for SmartTrack
const translations = {
    en: {
        // Login Page
        login: "Login",
        employee_id: "Employee ID",
        password: "Password",
        property: "Property",
        remember_me: "Remember me",
        log_in: "Log In",
        
        // Navigation
        dashboard: "Dashboard",
        check_in: "Check In",
        vacation: "Vacation",
        attendance_history: "Attendance History",
        request_status: "Request Status",
        
        // Dashboard
        welcome: "Welcome, John Doe",
        check_out: "Check Out",
        vacation_request: "Vacation Request",
        from: "From",
        to: "To",
        submit_request: "Submit Request",
        
        // Table Headers
        date: "DATE",
        status: "STATUS",
        employee: "EMPLOYEE",
        present: "Present",
        absent: "Absent",
        pending: "Pending",
        approved: "Approved",
        
        // Admin
        buyers: "Buyers",
        company_profiles: "Company Profiles",
        gps_location: "GPS Location",
        gps_management: "GPS Management",
        
        // Property Manager
        properties: "Properties",
        employees: "Employees",
        vacation_requests: "Vacation Requests",
        total_employees: "Total Employees",
        address: "ADDRESS",
        
        // Common
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        add: "Add",
        search: "Search",
        filter: "Filter",
        export: "Export",
        import: "Import",
        
        // Messages
        success_login: "Login successful",
        error_login: "Invalid credentials",
        success_checkin: "Checked in successfully",
        success_checkout: "Checked out successfully",
        success_request: "Request submitted successfully",
        error_location: "Location access required for check-in/out",
        
        // Form Labels
        full_name: "Full Name",
        email: "Email",
        mobile: "Mobile Number",
        branch: "Branch",
        department: "Department",
        position: "Position",
        start_date: "Start Date",
        emp_status: "Employee Status",
        
        // Time
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        today: "Today",
        yesterday: "Yesterday",
        this_week: "This Week",
        this_month: "This Month",
        
        // Status
        active: "Active",
        inactive: "Inactive",
        on_leave: "On Leave",
        terminated: "Terminated"
    },
    
    ar: {
        // Login Page
        login: "تسجيل الدخول",
        employee_id: "رقم الموظف",
        password: "كلمة المرور",
        property: "الممتلكات",
        remember_me: "تذكرني",
        log_in: "دخول",
        
        // Navigation
        dashboard: "لوحة التحكم",
        check_in: "تسجيل الحضور",
        vacation: "الإجازة",
        attendance_history: "سجل الحضور",
        request_status: "حالة الطلب",
        
        // Dashboard
        welcome: "مرحباً، جون دو",
        check_out: "تسجيل الانصراف",
        vacation_request: "طلب إجازة",
        from: "من",
        to: "إلى",
        submit_request: "إرسال الطلب",
        
        // Table Headers
        date: "التاريخ",
        status: "الحالة",
        employee: "الموظف",
        present: "حاضر",
        absent: "غائب",
        pending: "قيد الانتظار",
        approved: "موافق عليه",
        
        // Admin
        buyers: "المشترون",
        company_profiles: "ملفات الشركة",
        gps_location: "موقع GPS",
        gps_management: "إدارة GPS",
        
        // Property Manager
        properties: "الممتلكات",
        employees: "الموظفون",
        vacation_requests: "طلبات الإجازة",
        total_employees: "إجمالي الموظفين",
        address: "العنوان",
        
        // Common
        save: "حفظ",
        cancel: "إلغاء",
        edit: "تعديل",
        delete: "حذف",
        add: "إضافة",
        search: "بحث",
        filter: "تصفية",
        export: "تصدير",
        import: "استيراد",
        
        // Messages
        success_login: "تم تسجيل الدخول بنجاح",
        error_login: "بيانات اعتماد غير صحيحة",
        success_checkin: "تم تسجيل الحضور بنجاح",
        success_checkout: "تم تسجيل الانصراف بنجاح",
        success_request: "تم إرسال الطلب بنجاح",
        error_location: "مطلوب الوصول للموقع لتسجيل الحضور/الانصراف",
        
        // Form Labels
        full_name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        mobile: "رقم الهاتف المحمول",
        branch: "الفرع",
        department: "القسم",
        position: "المنصب",
        start_date: "تاريخ البداية",
        emp_status: "حالة الموظف",
        
        // Time
        morning: "الصباح",
        afternoon: "بعد الظهر",
        evening: "المساء",
        today: "اليوم",
        yesterday: "أمس",
        this_week: "هذا الأسبوع",
        this_month: "هذا الشهر",
        
        // Status
        active: "نشط",
        inactive: "غير نشط",
        on_leave: "في إجازة",
        terminated: "منتهي الخدمة"
    }
};

// Current language
let currentLanguage = localStorage.getItem('smarttrack-language') || 'en';

// Initialize language
function initLanguage() {
    setLanguage(currentLanguage);
    updateLanguageButtons();
}

// Set language
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('smarttrack-language', lang);
    
    // Update HTML direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    updateTranslations();
    updateLanguageButtons();
}

// Update translations
function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Update page title
    document.title = currentLanguage === 'ar' 
        ? 'سمارت تراك - نظام إدارة حضور الموظفين'
        : 'SmartTrack - Employee Attendance Management';
}

// Update language buttons
function updateLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', lang === currentLanguage);
    });
}

// Get translated text
function t(key, defaultText = '') {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return defaultText || key;
}

// Format date based on language
function formatDate(date, options = {}) {
    const locale = currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, options).format(date);
}

// Format time based on language
function formatTime(date) {
    const locale = currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
}

// Format numbers based on language
function formatNumber(number) {
    const locale = currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale).format(number);
}

// Event listeners for language switching
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initLanguage();
    
    // Language button event listeners
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

// Export for use in other files
window.SmartTrackTranslations = {
    setLanguage,
    t,
    formatDate,
    formatTime,
    formatNumber,
    currentLanguage: () => currentLanguage
};