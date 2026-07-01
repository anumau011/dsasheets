import React from "react";
import { useTheme } from "../hooks/useTheme";

const ProgressStats = ({ data, completedProblems = new Set() }) => {
  const { isDark } = useTheme();
  const totalSteps = data.length;
  const totalSubSteps = data.reduce((sum, step) => sum + step.subSteps.length,0);

  // Calculate total topics and difficulty breakdown
  const topicsByDifficulty = { 0: 0, 1: 0, 2: 0 }; // Basic, Easy, Medium, Hard
  const completedByDifficulty = { 0: 0, 1: 0, 2: 0 };

  let totalTopics = 0;

  data.forEach(step => {
    step.subSteps.forEach(subStep => {
      subStep.topics.forEach(topic => {
        totalTopics++;
        const difficulty = topic.difficulty || 0;
        topicsByDifficulty[difficulty]++;

        if (completedProblems.has(topic.id)) {
          completedByDifficulty[difficulty]++;
        }
      });
    });
  });

  const totalCompleted = completedProblems.size;
  const overallProgress = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;

  const difficultyStats = [
    {
      label: "Easy",
      completed: completedByDifficulty[0],
      total: topicsByDifficulty[0],
      color: "bg-green-500",
      bgColor: isDark ? "bg-green-900/20" : "bg-green-100",
      textColor: isDark ? "text-green-400" : "text-green-600"
    },
    {
      label: "Medium",
      completed: completedByDifficulty[1],
      total: topicsByDifficulty[1],
      color: "bg-yellow-500",
      bgColor: isDark ? "bg-yellow-900/20" : "bg-yellow-100",
      textColor: isDark ? "text-yellow-400" : "text-yellow-600"
    },
    {
      label: "Hard",
      completed: completedByDifficulty[2],
      total: topicsByDifficulty[2],
      color: "bg-red-500",
      bgColor: isDark ? "bg-red-900/20" : "bg-red-100",
      textColor: isDark ? "text-red-400" : "text-red-600"
    }
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Overall Progress */}
      <div className={`rounded-lg shadow-sm border p-6 ${isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
        }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"
              }`}>
              Total Progress
            </h2>
            <p className={`text-3xl font-bold mt-2 ${isDark ? "text-gray-100" : "text-gray-900"
              }`}>
              {totalCompleted} / {totalTopics}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"
              }`}>
              {overallProgress}%
            </div>
            <div className={`w-24 h-3 rounded-full mt-2 ${isDark ? "bg-gray-700" : "bg-gray-200"
              }`}>
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficultyStats.map((stat, index) => {
          const progress = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;
          return (
            <div
              key={index}
              className={`rounded-lg shadow-sm border p-4 ${isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold ${stat.textColor}`}>
                  {stat.label}
                </h3>
                <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"
                  }`}>
                  {progress}%
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-bold ${isDark ? "text-gray-100" : "text-gray-900"
                  }`}>
                  {stat.completed} / {stat.total}
                </span>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                  completed
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"
                }`}>
                <div
                  className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStats;