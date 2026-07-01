import React, { useState } from "react";
import { ChevronDown, ChevronRight, Clock, Target } from "lucide-react";
import SubStepSection from "./SubStepSection";
import { useTheme } from "../hooks/useTheme";

const StepSection = ({
  step,
  index,
  viewType = "table"
}) => {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const totalTopics = step.subSteps.reduce(
    (sum, subStep) => sum + subStep.topics.length,
    0
  );

  return (
    <div className={`rounded-lg shadow-sm border mb-6 overflow-hidden ${isDark
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
      }`}>
      <div
        className={`p-6 cursor-pointer transition-colors border-b ${isDark
            ? "hover:bg-gray-700 border-gray-700"
            : "hover:bg-gray-50 border-gray-100"
          }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-lg text-lg font-bold">
              {step.id}
            </span>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"
                }`}>
                {step.title}
              </h1>
              <div className="flex items-center space-x-6 mt-2">
                <span className={`flex items-center space-x-2 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  <Target className="w-4 h-4" />
                  <span className="text-sm">
                    {step.subSteps.length} sections
                  </span>
                </span>
                <span className={`flex items-center space-x-2 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{totalTopics} problems</span>
                </span>
              </div>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-400"
              }`} />
          ) : (
            <ChevronRight className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-400"
              }`} />
          )}
        </div>
      </div>      {isExpanded && (
        <div className="p-6">
          <div className="space-y-6">
            {step.subSteps.map((subStep, subStepIndex) => (
              <SubStepSection
                key={subStep.id}
                subStep={subStep}
                stepIndex={step.id}
                subStepIndex={subStep.id}
                viewType={viewType}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepSection;