import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  User,
  Plus,
  BarChart3,
  GraduationCap,
  Building
} from 'lucide-react';
import Sidebar from './Sidebar';
import StudentDetails from './StudentDetails';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  classesAssigned: number;
  status: 'active' | 'inactive';
}

interface ClassData {
  id: string;
  name: string;
  section: string;
  teacher: string;
  studentCount: number;
  capacity: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'teachers' | 'classes'>('overview');
  const [showStudents, setShowStudents] = useState(false);

  // Mock data - in real app this would come from API
  const teachers: Teacher[] = [
    { id: '1', name: 'John Smith', email: 'john.smith@school.com', subject: 'Mathematics', classesAssigned: 3, status: 'active' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@school.com', subject: 'English', classesAssigned: 2, status: 'active' },
    { id: '3', name: 'Mike Wilson', email: 'mike.wilson@school.com', subject: 'Science', classesAssigned: 2, status: 'active' },
    { id: '4', name: 'Lisa Brown', email: 'lisa.brown@school.com', subject: 'History', classesAssigned: 1, status: 'inactive' },
  ];

  const classes: ClassData[] = [
    { id: '1', name: 'Class 10', section: 'A', teacher: 'John Smith', studentCount: 32, capacity: 35 },
    { id: '2', name: 'Class 10', section: 'B', teacher: 'John Smith', studentCount: 30, capacity: 35 },
    { id: '3', name: 'Class 9', section: 'A', teacher: 'Sarah Johnson', studentCount: 28, capacity: 35 },
    { id: '4', name: 'Class 9', section: 'B', teacher: 'Mike Wilson', studentCount: 25, capacity: 35 },
    { id: '5', name: 'Class 8', section: 'A', teacher: 'Mike Wilson', studentCount: 33, capacity: 35 },
  ];

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const totalCapacity = classes.reduce((sum, c) => sum + c.capacity, 0);
  const occupancyRate = Math.round((totalStudents / totalCapacity) * 100);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="admin" onClick={() => setShowStudents(true)} />
      
      {/* Main Content */}
      <div className={`${showStudents ? 'flex-1' : 'flex-1'} flex flex-col overflow-hidden`}>
        <div className="flex h-full">
          {/* Dashboard Content */}
          <div className={`${showStudents ? 'w-1/2' : 'w-full'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-primary-600 mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">School Management System - Admin</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{user?.fullName}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
        {/* Welcome Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName}! 👋
          </h2>
          <p className="text-gray-600">
            Here's an overview of your school's performance and management dashboard.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'teachers'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'classes'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Classes
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{totalStudents}</h3>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
              
              <div className="card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{teachers.filter(t => t.status === 'active').length}</h3>
                <p className="text-sm text-gray-600">Active Teachers</p>
              </div>
              
              <div className="card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{classes.length}</h3>
                <p className="text-sm text-gray-600">Total Classes</p>
              </div>
              
              <div className="card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{occupancyRate}%</h3>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Occupancy</h3>
                <div className="space-y-3">
                  {classes.map((classInfo) => {
                    const percentage = Math.round((classInfo.studentCount / classInfo.capacity) * 100);
                    return (
                      <div key={classInfo.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {classInfo.name} - Section {classInfo.section}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                percentage > 80 ? 'bg-green-500' : 
                                percentage > 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Workload</h3>
                <div className="space-y-3">
                  {teachers.filter(t => t.status === 'active').map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{teacher.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              teacher.classesAssigned >= 3 ? 'bg-red-500' : 
                              teacher.classesAssigned >= 2 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(teacher.classesAssigned / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{teacher.classesAssigned}/4</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Teacher Management</h3>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Teacher</span>
              </button>
            </div>

            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classes Assigned
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                            <div className="text-sm text-gray-500">{teacher.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {teacher.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {teacher.classesAssigned}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            teacher.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Class Management</h3>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Class</span>
              </button>
            </div>

            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classes.map((classInfo) => (
                      <tr key={classInfo.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {classInfo.name} - Section {classInfo.section}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {classInfo.teacher}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {classInfo.studentCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {classInfo.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        </main>
          </div>
          
          {/* Student Details Panel */}
          {showStudents && (
            <div className="w-1/2 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Student Details</h2>
                <button
                  onClick={() => setShowStudents(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <StudentDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
