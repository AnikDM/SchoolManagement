import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Users,
  BookOpen,
  Bell,
  User,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Sidebar from "./Sidebar";
import StudentDetails from "./StudentDetails";
import Header from "./Header";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  dob: string;
  phoneNo: string;
  section: string;
  attendance: "present" | "absent" | "late";
}

interface ClassInfo {
  id: string;
  name: string;
  section: string;
  subject: string;
  studentCount: number;
  students: Student[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  timestamp: string;
  read: boolean;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview">("overview");
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedClassForNewStudent, setSelectedClassForNewStudent] =
    useState<string>("");
  const [showStudents, setShowStudents] = useState(false);

  // Handle URL parameters for tab switching
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const tabParam = urlParams.get('tab');
  //   if (tabParam === 'students') {
  //     setActiveTab('students');
  //   }
  // }, []);

  // Mock data - in real app this would come from API
  const teacherClasses: ClassInfo[] = [
    {
      id: "1",
      name: "Class 10",
      section: "A",
      subject: "Mathematics",
      studentCount: 32,
      students: [
        {
          id: "1",
          name: "Alice Johnson",
          rollNumber: "10A001",
          dob: "2006-03-15",
          phoneNo: "+1-555-0101",
          section: "A",
          attendance: "present",
        },
        {
          id: "2",
          name: "Bob Smith",
          rollNumber: "10A002",
          dob: "2006-07-22",
          phoneNo: "+1-555-0102",
          section: "A",
          attendance: "present",
        },
        {
          id: "3",
          name: "Carol Davis",
          rollNumber: "10A003",
          dob: "2006-01-08",
          phoneNo: "+1-555-0103",
          section: "A",
          attendance: "absent",
        },
        {
          id: "4",
          name: "David Wilson",
          rollNumber: "10A004",
          dob: "2006-11-30",
          phoneNo: "+1-555-0104",
          section: "A",
          attendance: "late",
        },
        {
          id: "5",
          name: "Eva Brown",
          rollNumber: "10A005",
          dob: "2006-05-12",
          phoneNo: "+1-555-0105",
          section: "A",
          attendance: "present",
        },
      ],
    },
    {
      id: "2",
      name: "Class 9",
      section: "B",
      subject: "Mathematics",
      studentCount: 28,
      students: [
        {
          id: "6",
          name: "Frank Miller",
          rollNumber: "9B001",
          dob: "2007-02-18",
          phoneNo: "+1-555-0106",
          section: "B",
          attendance: "present",
        },
        {
          id: "7",
          name: "Grace Lee",
          rollNumber: "9B002",
          dob: "2007-08-25",
          phoneNo: "+1-555-0107",
          section: "B",
          attendance: "present",
        },
        {
          id: "8",
          name: "Henry Taylor",
          rollNumber: "9B003",
          dob: "2007-04-03",
          phoneNo: "+1-555-0108",
          section: "B",
          attendance: "present",
        },
      ],
    },
    {
      id: "3",
      name: "Class 8",
      section: "A",
      subject: "Mathematics",
      studentCount: 30,
      students: [
        {
          id: "9",
          name: "Ivy Chen",
          rollNumber: "8A001",
          dob: "2008-06-14",
          phoneNo: "+1-555-0109",
          section: "A",
          attendance: "present",
        },
        {
          id: "10",
          name: "Jack Anderson",
          rollNumber: "8A002",
          dob: "2008-09-28",
          phoneNo: "+1-555-0110",
          section: "A",
          attendance: "present",
        },
        {
          id: "11",
          name: "Kate Martinez",
          rollNumber: "8A003",
          dob: "2008-12-05",
          phoneNo: "+1-555-0111",
          section: "A",
          attendance: "absent",
        },
      ],
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      title: "Staff Meeting",
      message:
        "Staff meeting scheduled for tomorrow at 3:00 PM in the conference room.",
      type: "info",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "Exam Schedule",
      message:
        "Mid-term examination schedule has been updated. Please check the portal.",
      type: "warning",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: "3",
      title: "Attendance Report",
      message:
        "Monthly attendance report for Class 10A has been submitted successfully.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "3",
      title: "Attendance Report",
      message:
        "Monthly attendance report for Class 10A has been submitted successfully.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "3",
      title: "Attendance Report",
      message:
        "Monthly attendance report for Class 10A has been submitted successfully.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "3",
      title: "Attendance Report",
      message:
        "Monthly attendance report for Class 10A has been submitted successfully.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "3",
      title: "Attendance Report",
      message:
        "Monthly attendance report for Class 10A has been submitted successfully.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "3",
      title: "Attendance Report",
      message:
        "Monthly attendance report for Class 10A has been submitted successfully.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
    },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleAttendanceChange = (
    studentId: string,
    attendance: "present" | "absent" | "late"
  ) => {
    // In real app, this would update the API
    console.log(`Student ${studentId} marked as ${attendance}`);
  };

  const handleAddStudent = () => {
    if (!selectedClassForNewStudent) {
      alert("Please select a class first");
      return;
    }
    setShowAddStudentModal(true);
  };

  const getAttendanceIcon = (attendance: string) => {
    switch (attendance) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "absent":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "late":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getAttendanceColor = (attendance: string) => {
    switch (attendance) {
      case "present":
        return "text-green-600 bg-green-50";
      case "absent":
        return "text-red-600 bg-red-50";
      case "late":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Welcome Section */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName}! 👋
          </h2>
          <p className="text-gray-600">
            Here's an overview of your classes and students for today.
          </p>
        </div>
        <>
          {/* Class Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherClasses.map((classInfo) => (
              <div
                key={classInfo.id}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {classInfo.name} - Section {classInfo.section}
                    </h3>
                    <p className="text-sm text-gray-500">{classInfo.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      {classInfo.studentCount}
                    </div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Total Students: {classInfo.studentCount}</span>
                </div>

                <button
                  onClick={() =>
                    setSelectedClass(
                      selectedClass === classInfo.id ? "" : classInfo.id
                    )
                  }
                  className="mt-4 w-full btn-primary"
                >
                  {selectedClass === classInfo.id
                    ? "Hide Details"
                    : "View Details"}
                </button>
              </div>
            ))}
          </div>

          {/* Class Details and Attendance */}
          {selectedClass && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Class Details & Attendance
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teacherClasses
                      .find((c) => c.id === selectedClass)
                      ?.students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAttendanceColor(
                                student.attendance
                              )}`}
                            >
                              {getAttendanceIcon(student.attendance)}
                              <span className="ml-1 capitalize">
                                {student.attendance}
                              </span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleAttendanceChange(student.id, "present")
                                }
                                className="text-green-600 hover:text-green-900 text-xs"
                              >
                                Present
                              </button>
                              <button
                                onClick={() =>
                                  handleAttendanceChange(student.id, "absent")
                                }
                                className="text-red-600 hover:text-red-900 text-xs"
                              >
                                Absent
                              </button>
                              <button
                                onClick={() =>
                                  handleAttendanceChange(student.id, "late")
                                }
                                className="text-yellow-600 hover:text-yellow-900 text-xs"
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {teacherClasses.reduce((total, c) => total + c.studentCount, 0)}
              </h3>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {teacherClasses.length}
              </h3>
              <p className="text-sm text-gray-600">Classes Assigned</p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">85%</h3>
              <p className="text-sm text-gray-600">Average Attendance</p>
            </div>
          </div>
        </>
      </div>

      {/* Notifications Sidebar */}
      <div className="lg:col-span-1">
        <div className="card sticky top-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  notification.read
                    ? "bg-gray-50 border-gray-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === "info"
                        ? "bg-blue-500"
                        : notification.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
