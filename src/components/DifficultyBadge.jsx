import React from "react";
import { useTheme } from "../hooks/useTheme";

const DifficultyBadge = ({ difficulty }) => {
  const { isDark } = useTheme();

  const getDifficultyConfig = (diff) => {
    const baseClasses = isDark ? "text-white" : "";
    switch (diff) {
      case 0:
        return {
          color: isDark
            ? "bg-green-800 text-green-200"
            : "text-green-600 bg-green-100",
          label: "Easy"
        };
      case 1:
        return {
          color: isDark
            ? "bg-yellow-800 text-yellow-200"
            : "text-yellow-600 bg-yellow-100",
          label: "Medium"
        };
      case 2:
        return {
          color: isDark
            ? "bg-red-800 text-red-200"
            : "text-red-600 bg-red-100",
          label: "Hard"
        };
      default:
        return {
          color: isDark
            ? "bg-gray-700 text-gray-300"
            : "text-gray-600 bg-gray-100",
          label: "Unknown"
        };
    }
  };

  const config = getDifficultyConfig(difficulty);
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
};

export default DifficultyBadge;