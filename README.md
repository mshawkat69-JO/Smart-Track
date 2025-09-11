# SmartTrack - Employee Attendance Management System

A modern, responsive web application for employee attendance management with GPS check-in/check-out functionality, multi-property support, and multi-language capabilities.

## Features

### 🌟 Core Features
- **GPS-based Check-in/Check-out**: Location-verified attendance tracking
- **Multi-property Support**: Manage multiple branches/properties
- **Multi-language**: Full Arabic and English support with RTL layout
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **PWA Ready**: Install as a mobile app with offline capabilities

### 👤 User Roles

#### Employee Dashboard
- Quick check-in/check-out with GPS verification
- Vacation request submission
- Attendance history viewing
- Request status tracking

#### Property Manager Dashboard
- Employee management with full details
- Manual check-in/check-out for employees
- Vacation request approval/decline
- Employee statistics and reports
- Property-specific data management

#### Super Admin Dashboard
- Complete system access
- Property manager and subscription management
- Company profile setup with logo upload
- GPS location configuration
- System-wide reports and analytics

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **PWA**: Service Worker, Web App Manifest
- **Storage**: LocalStorage (for demo purposes)

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for production deployment)

### Installation

1. **Clone or download** the project files
2. **Serve the files** using a web server:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx http-server
   
   # Or use any web server of your choice
   ```
3. **Open in browser**: Navigate to `http://localhost:8000`

### Demo Credentials

#### Employee Login
- **Employee ID**: `EMP001`
- **Password**: `password123`
- **Property**: Any available option

#### Property Manager Login
- **Employee ID**: `MGR001`
- **Password**: `manager123`
- **Property**: Any available option

#### Super Admin Login
- **Employee ID**: `ADMIN001`
- **Password**: `admin123`
- **Property**: Any available option

## Project Structure

```
smarttrack/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── styles/
│   ├── main.css           # Main stylesheet
│   └── responsive.css     # Responsive design styles
├── js/
│   ├── main.js            # Core application logic
│   ├── translations.js    # Multi-language support
│   └── navigation.js      # Navigation and routing
└── README.md              # This file
```

## Features in Detail

### 🎨 Design System
- **Brand Colors**: Primary (#8fb996), Secondary (White)
- **Typography**: Inter font family for modern, readable text
- **Layout**: Clean, professional interface with intuitive navigation
- **Animations**: Smooth transitions and hover effects

### 📱 Responsive Design
- **Mobile-first approach** with progressive enhancement
- **Breakpoints**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1199px
  - Desktop: 1200px+
- **Touch-friendly** interface elements
- **Adaptive navigation** with collapsible sidebar on mobile

### 🌐 Multi-language Support
- **Languages**: English and Arabic
- **RTL Support**: Automatic layout direction switching
- **Date/Time Formatting**: Locale-specific formatting
- **Persistent Settings**: Language preference saved locally

### 📍 GPS Integration
- **Location Verification**: Check-in/out requires GPS coordinates
- **Distance Validation**: Configurable proximity requirements
- **Offline Handling**: Graceful degradation when GPS unavailable

### 💾 Data Management
- **Local Storage**: Demo data persistence
- **Mock API**: Simulated server responses
- **Data Validation**: Form validation and error handling

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 90+

## Performance Features

- **Lazy Loading**: Sections loaded on demand
- **Optimized Assets**: Minified CSS and optimized images
- **Caching**: Service worker for offline functionality
- **Fast Loading**: Minimal dependencies and optimized code

## Accessibility Features

- **WCAG 2.1 AA Compliance**: Accessible to users with disabilities
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and live regions
- **High Contrast**: Readable color combinations
- **Focus Management**: Clear focus indicators

## Security Considerations

- **Input Validation**: Client-side validation (server-side needed for production)
- **XSS Prevention**: Sanitized user inputs
- **HTTPS Required**: Secure connection for GPS access
- **Data Privacy**: Local storage only (no external data transmission)

## Customization

### Theming
Modify CSS variables in `styles/main.css`:
```css
:root {
    --primary-color: #8fb996;
    --secondary-color: #ffffff;
    --accent-color: #2c3e50;
}
```

### Adding Languages
1. Add translations to `js/translations.js`
2. Update language selector in HTML
3. Test RTL layout if needed

### Branding
- Update logo in HTML
- Modify brand colors in CSS
- Replace app name throughout codebase

## Production Deployment

1. **Optimize Assets**: Minify CSS/JS files
2. **Configure Server**: Set up proper MIME types
3. **HTTPS Required**: Essential for GPS and PWA features
4. **Database Integration**: Replace localStorage with proper backend
5. **Authentication**: Implement secure login system
6. **API Integration**: Connect to attendance management API

## Development Roadmap

### Phase 1 (Current)
- ✅ Core UI/UX implementation
- ✅ Responsive design
- ✅ Multi-language support
- ✅ PWA capabilities

### Phase 2 (Future)
- 🔄 Backend API integration
- 🔄 Real-time notifications
- 🔄 Advanced reporting
- 🔄 Employee photo capture
- 🔄 Biometric authentication

### Phase 3 (Future)
- 🔄 Machine learning insights
- 🔄 Integration with HR systems
- 🔄 Advanced analytics dashboard
- 🔄 Mobile app (React Native/Flutter)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- 📧 Email: support@smarttrack.com
- 📞 Phone: +1-234-567-8900
- 🌐 Website: https://smarttrack.com

---

**SmartTrack** - Making attendance management smart and simple! 🚀