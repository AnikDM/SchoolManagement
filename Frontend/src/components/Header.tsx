import React, { useState } from "react";
import { BookOpen, Bell, User, ChevronDown } from "lucide-react";
import Profile from "./Profile";

interface HeaderProps {
  userName?: string;
  showNotifications: boolean;
  unreadNotifications: number;
  onToggleNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  showNotifications,
  unreadNotifications,
  onToggleNotifications,
}) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white shadow-sm h-20 border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">
              School Management System
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">  
              <button
                onClick={onToggleNotifications}
                className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                aria-label="Toggle notifications"
              >
                <Bell className="h-6 w-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium">
                {userName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <Profile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </header>
  );
};

export default Header;
