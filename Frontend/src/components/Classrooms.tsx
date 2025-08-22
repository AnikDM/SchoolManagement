import React, { useState } from "react";
import {
  Search,
  Filter,
  Users,
  BookOpen,
  MapPin,
  Calendar,
  Clock,
  User,
  ChevronRight,
} from "lucide-react";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";

interface Classroom {
  id: string;
  name: string;
  section: string;
  subject: string;
  roomNumber: string;
  capacity: number;
  currentStrength: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  students: {
    id: string;
    name: string;
    rollNumber: string;
    attendance: number;
  }[];
}

const Classrooms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  // Mock classroom data
  const mockClassrooms: Classroom[] = [
    {
      id: "1",
      name: "Class 10A",
      section: "A",
      subject: "Mathematics",
      roomNumber: "R-101",
      capacity: 40,
      currentStrength: 35,
      schedule: [
        { day: "Monday", startTime: "09:00", endTime: "10:00" },
        { day: "Wednesday", startTime: "10:00", endTime: "11:00" },
        { day: "Friday", startTime: "11:00", endTime: "12:00" },
      ],
      students: [
        { id: "1", name: "John Doe", rollNumber: "001", attendance: 95 },
        { id: "2", name: "Jane Smith", rollNumber: "002", attendance: 88 },
        { id: "3", name: "Mike Johnson", rollNumber: "003", attendance: 92 },
      ],
    },
    {
      id: "2",
      name: "Class 9B",
      section: "B",
      subject: "Physics",
      roomNumber: "R-205",
      capacity: 35,
      currentStrength: 32,
      schedule: [
        { day: "Tuesday", startTime: "10:00", endTime: "11:00" },
        { day: "Thursday", startTime: "09:00", endTime: "10:00" },
      ],
      students: [
        { id: "4", name: "Sarah Wilson", rollNumber: "001", attendance: 90 },
        { id: "5", name: "David Brown", rollNumber: "002", attendance: 85 },
      ],
    },
    {
      id: "3",
      name: "Class 8C",
      section: "C",
      subject: "Chemistry",
      roomNumber: "R-302",
      capacity: 30,
      currentStrength: 28,
      schedule: [
        { day: "Monday", startTime: "11:00", endTime: "12:00" },
        { day: "Wednesday", startTime: "14:00", endTime: "15:00" },
        { day: "Friday", startTime: "09:00", endTime: "10:00" },
      ],
      students: [
        { id: "6", name: "Emma Davis", rollNumber: "001", attendance: 93 },
        { id: "7", name: "Alex Miller", rollNumber: "002", attendance: 87 },
      ],
    },
  ];

  const subjects = [
    "all",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
  ];
  const sections = ["all", "A", "B", "C", "D"];

  const filteredClassrooms = mockClassrooms.filter((classroom) => {
    const matchesSearch =
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || classroom.subject === selectedSubject;
    const matchesSection =
      selectedSection === "all" || classroom.section === selectedSection;

    return matchesSearch && matchesSubject && matchesSection;
  });

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "text-red-600 bg-red-50";
    if (percentage >= 75) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search classrooms, subjects, or room numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section === "all" ? "All Sections" : `Section ${section}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Classrooms
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockClassrooms.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Students
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockClassrooms.reduce(
                  (sum, classroom) => sum + classroom.currentStrength,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Average Capacity
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  mockClassrooms.reduce(
                    (sum, classroom) =>
                      sum +
                      (classroom.currentStrength / classroom.capacity) * 100,
                    0
                  ) / mockClassrooms.length
                )}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Active Sessions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockClassrooms.reduce(
                  (sum, classroom) => sum + classroom.schedule.length,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => (
          <div
            key={classroom.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {classroom.name}
                  </h3>
                  <p className="text-sm text-gray-600">{classroom.subject}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {classroom.roomNumber}
                </div>
              </div>

              {/* Student Strength */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Student Strength
                  </span>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${getCapacityColor(
                      classroom.currentStrength,
                      classroom.capacity
                    )}`}
                  >
                    {classroom.currentStrength}/{classroom.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (classroom.currentStrength / classroom.capacity) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </h4>
                <div className="space-y-1">
                  {classroom.schedule.slice(0, 2).map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <Calendar className="h-3 w-3 mr-2" />
                      <span>
                        {schedule.day}: {schedule.startTime} -{" "}
                        {schedule.endTime}
                      </span>
                    </div>
                  ))}
                  {classroom.schedule.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{classroom.schedule.length - 2} more sessions
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {classroom.students.length} students
                </div>
                <button className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClassrooms.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No classrooms found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Classrooms;
