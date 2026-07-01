import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../hooks/useProgress";
import TopicRow from "./TopicRow";

const SubStepSection = ({
  subStep,
  stepIndex,
  subStepIndex
}) => {
  const { isDark } = useTheme();
  const { isProblemCompleted, toggleProblemCompletion } = useProgress();
  const [isExpanded, setIsExpanded] = useState(false);
  const [revisionTopics, setRevisionTopics] = useState(new Set());
  const [noteTopics, setNoteTopics] = useState(new Set());

  const handleGlobalToggleComplete = async (topicData) => {
    try {
      if (isProblemCompleted(topicData.id)) {
        // If already completed, you could implement removal here
        console.log('Problem already completed:', topicData.question_title);
      } else {
        const result = await markProblemCompleted(topicData);
        if (result.success) {
          console.log('Problem marked as completed:', topicData.question_title);
        } else {
          console.error('Failed to mark problem as completed:', result.error);
        }
      }
    } catch (error) {
      console.error('Error toggling problem completion:', error);
    }
  };


  const handleToggleRevision = (topicId) => {
    const newRevision = new Set(revisionTopics);
    if (newRevision.has(topicId)) {
      newRevision.delete(topicId);
    } else {
      newRevision.add(topicId);
    }
    setRevisionTopics(newRevision);
  };

  const handleToggleNote = (topicId) => {
    const newNotes = new Set(noteTopics);
    if (newNotes.has(topicId)) {
      newNotes.delete(topicId);
    } else {
      newNotes.add(topicId);
    }
    setNoteTopics(newNotes);
  };

  // Count completed topics for this substep from global state
  const completedInSubStep = subStep.topics.filter(topic =>
    isProblemCompleted(topic.id)
  ).length;

  const completionPercentage = Math.round(
    (completedInSubStep / subStep.topics.length) * 100
  );

  return (
    <div className={`rounded-lg border mb-6 overflow-hidden shadow-sm ${isDark
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200"
      }`}>
      <div
        className={`p-4 cursor-pointer transition-colors border-b ${isDark
          ? "hover:bg-gray-700 border-gray-700"
          : "hover:bg-gray-50 border-gray-100"
          }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-800 rounded-full text-sm font-bold">
              {stepIndex}.{subStepIndex}
            </span>
            <div>
              <h2 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"
                }`}>
                {subStep.title}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  {subStep.topics.length} problems
                </span>
                <span className="text-sm text-green-600 font-medium">
                  {completedInSubStep} completed
                </span>
                <div className={`w-32 rounded-full h-2 ${isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  {completionPercentage}%
                </span>
              </div>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-400"
              }`} />
          ) : (
            <ChevronRight className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-400"
              }`} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Status
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Problem
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Article
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Video
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  LeetCode
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  GeeksforGeeks
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Coding Ninjas
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Note
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Revision
                </th>
                <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Difficulty
                </th>
              </tr>
            </thead>
            <tbody className={isDark ? "bg-gray-800" : "bg-white"}>
              {subStep.topics.map((topic, topicIndex) => (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  index={topicIndex}
                  isCompleted={isProblemCompleted(topic.id)}
                  onToggleComplete={() => toggleProblemCompletion(topic)}
                  onToggleRevision={handleToggleRevision}
                  onToggleNote={handleToggleNote}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubStepSection;
