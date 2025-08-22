# School Management System - Frontend

A modern, responsive React-based frontend application for school management with role-based access control for administrators and teachers.

## Features

### 🔐 Authentication System
- Secure login with role-based access control
- Support for Admin and Teacher roles
- Persistent session management
- Protected routes based on user permissions

### 👨‍🏫 Teacher Dashboard
- **Class Overview**: View allocated classes with student counts
- **Student Management**: See detailed student lists with roll numbers
- **Attendance Tracking**: Mark students as present, absent, or late
- **Notifications Sidebar**: Real-time updates and important announcements
- **Quick Statistics**: Total students, classes assigned, and attendance metrics

### 👨‍💼 Admin Dashboard
- **School Overview**: Comprehensive statistics and metrics
- **Teacher Management**: Add, edit, and manage teacher accounts
- **Class Management**: Create and manage class sections
- **Analytics**: Class occupancy rates and teacher workload monitoring
- **Tabbed Interface**: Organized view of different management areas

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Beautiful gradient backgrounds and modern card layouts
- Interactive elements with hover effects
- Professional color scheme and typography
- Lucide React icons for consistent visual language

## Demo Credentials

### Admin Access
- **Email**: admin@school.com
- **Password**: admin123

### Teacher Access
- **Email**: teacher@school.com
- **Password**: teacher123

### Additional Teacher
- **Email**: teacher2@school.com
- **Password**: teacher123

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom component classes
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication page
│   ├── TeacherDashboard.tsx  # Teacher's main interface
│   ├── AdminDashboard.tsx    # Admin's main interface
│   └── ProtectedRoute.tsx    # Route protection component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## Key Components

### AuthContext
- Manages user authentication state
- Handles login/logout functionality
- Provides user information to components
- Implements role-based access control

### TeacherDashboard
- Displays allocated classes and sections
- Shows student lists with attendance tracking
- Features a notifications sidebar
- Provides quick statistics and metrics

### AdminDashboard
- Tabbed interface for different management areas
- Teacher and class management capabilities
- School-wide analytics and statistics
- Visual progress bars and charts

## Customization

### Adding New Roles
1. Update the `User` interface in `AuthContext.tsx`
2. Add new role checks in `ProtectedRoute.tsx`
3. Create new dashboard components
4. Update routing in `App.tsx`

### Styling Changes
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Use the predefined component classes (`.btn-primary`, `.card`, etc.)

### Data Integration
- Replace mock data with API calls
- Update interfaces to match your backend schema
- Implement proper error handling and loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a frontend-only implementation with mock data. In a production environment, you would need to:
- Connect to a backend API
- Implement proper security measures
- Add form validation and error handling
- Set up proper testing
- Configure environment variables
- Implement proper logging and monitoring
