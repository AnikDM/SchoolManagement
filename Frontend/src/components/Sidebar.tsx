import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  BarChart3, 
  GraduationCap, 
  Building, 
  Home,
  FileText,
  Award,
  MessageSquare,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  role: 'admin' | 'teacher';
  onClick?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onClick }) => {
  const { logout,setIsCollapsed,isCollapsed } = useAuth();
  const location = useLocation();

  const adminMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin' },
    { id: 'teachers', label: 'Teachers', icon: <Users className="h-5 w-5" />, href: '/admin/teachers', badge: '12' },
    { id: 'students', label: 'Students', icon: <GraduationCap className="h-5 w-5" />, href: '/admin/students', badge: '450' },
    { id: 'classrooms', label: 'Classes', icon: <BookOpen className="h-5 w-5" />, href: '/admin/classes', badge: '24' },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5" />, href: '/admin/schedule' },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-5 w-5" />, href: '/admin/reports' },
    { id: 'departments', label: 'Departments', icon: <Building className="h-5 w-5" />, href: '/admin/departments' },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-5 w-5" />, href: '/admin/documents' },
    { id: 'achievements', label: 'Achievements', icon: <Award className="h-5 w-5" />, href: '/admin/achievements' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" />, href: '/admin/messages', badge: '3' },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle className="h-5 w-5" />, href: '/admin/help' },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/admin/settings' },
  ];

  const teacherMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/teacher' },
    { id: 'classrooms', label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, href: '/teacher/classrooms', badge: '3' },
    { id: 'students', label: 'Students', icon: <Users className="h-5 w-5" />, href: '/teacher/students', badge: '85' },
    { id: 'attendance', label: 'Attendance', icon: <Calendar className="h-5 w-5" />, href: '/teacher/attendance' },
    { id: 'grades', label: 'Grades', icon: <Award className="h-5 w-5" />, href: '/teacher/grades' },
    { id: 'assignments', label: 'Assignments', icon: <FileText className="h-5 w-5" />, href: '/teacher/assignments' },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5" />, href: '/teacher/schedule' },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-5 w-5" />, href: '/teacher/reports' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" />, href: '/teacher/messages', badge: '5' },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle className="h-5 w-5" />, href: '/teacher/help' },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/teacher/settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : teacherMenuItems;

  const isActiveRoute = (href: string) => {
    if (href === '/admin' || href === '/teacher') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 bg-white shadow-sm h-20 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary-600" />
            <span className="text-lg font-semibold text-gray-900">
              {role === 'admin' ? 'Admin' : 'Teacher'}
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <button
              key={item.id}
              onClick={() => {
                if (onClick) {
                  onClick();
                  return;
                }
                window.location.href = item.href;
              }}
              className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-left ${
                isActive
                  ? 'bg-blue-200 text-blue-700 '
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
            <div className={`flex items-center justify-center w-5 h-5 mr-3 ${
              isActive ? 'text-blue-700' : ''
            }`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isActive 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-primary-100 text-primary-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
