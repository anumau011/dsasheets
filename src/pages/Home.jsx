import React, { useState, useEffect } from "react";
import { Sun, Moon, User, LogOut, BookOpen } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import ProgressStats from "../components/ProgressStats";
import StepSection from "../components/StepSection";
import logoDark from "../assets/logoDark.svg";
import logoLight from "../assets/logoLight.svg";

function Home() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { steps, completedProblems } = useProgress();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedView, setSelectedView] = useState("table"); // 'table' or 'card'

  // Update filtered data when steps changes
  useEffect(() => {
    setFilteredData(steps);
  }, [steps]);


  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
      <div className="container mx-auto  px-4 py-6 max-w-7xl">

        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={isDark ? logoDark: logoLight}
              alt="Logo"
              className="h-18 w-auto"
            />
          </a>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <div
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">
                      Welcome, {user?.name || "User"}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className={`p-2 rounded-lg font-medium transition-colors ${isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Login
                  </a>

                  <a
                    href="/signup"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg font-medium transition-colors ${isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>


        {/* Progress Stats */}

        <ProgressStats data={filteredData} completedProblems={completedProblems} />

        {/* Course Content */}
        <div className="space-y-6">
          {filteredData.length > 0 ? (
            filteredData.map((step, index) => (
              <StepSection
                key={step.id}
                step={step}
                index={index}
                viewType={selectedView}
              />
            ))
          ) : (
            <div className={`rounded-lg shadow-sm border p-12 text-center ${isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
              }`}>
              <div className={`mb-4 ${isDark ? "text-gray-600" : "text-gray-400"
                }`}>
                <BookOpen className="w-16 h-16 mx-auto" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                No results found
              </h3>
              <p className={isDark ? "text-gray-500" : "text-gray-500"}>
                Try searching for different keywords or browse all topics.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`mt-12 text-center py-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"
          }`}>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Made with ❤️ for DSA learners. Course content by
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;