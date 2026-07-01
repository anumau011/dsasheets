import React from "react";
import { useTheme } from "../hooks/useTheme";
import { YoutubeIcon, StarIcon, PlusIcon, LeetCodeLogo, FileTextIcon, TicketXIcon, GeeksforGeeksLogo, CodingNinjasLogo } from "./Icons";
import DifficultyBadge from "./DifficultyBadge";

const createRowClassName = (isDark) => () =>
  `border-b transition-colors ${isDark
    ? "border-gray-700 hover:bg-gray-800"
    : "border-gray-200 hover:bg-gray-50"
  }`;

const createPlatformLinkRenderer = (isDark) => (link, title, content) => {
  if (!link) return <span className="text-gray-400">-</span>;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center w-6 h-6 rounded transition-colors ${isDark
        ? "hover:bg-gray-700"
        : "hover:bg-green-50"
        }`}
      title={title}
    >
      {content}
    </a>
  );
};

const TopicRow = ({
  topic,
  index,
  isCompleted,
  onToggleComplete,
  onToggleRevision,
  onToggleNote,
}) => {
  const { isDark } = useTheme();
  const renderPlatformLink = createPlatformLinkRenderer(isDark);
  const getRowClassName = createRowClassName(isDark);

  return (
    <tr className={getRowClassName()}>
      {/* Status Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleComplete(topic.id)}
          className={`w-4 h-4 text-orange-600 rounded focus:ring-orange-500 ${isDark
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-100 border-gray-300"
            }`}
        />
      </td>

      {/* Problem Name */}
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <span className={`font-medium ${isDark ? "text-gray-100" : "text-gray-900"
            }`}>
            {topic.questionTitle}
          </span>
        </div>
      </td>

      {/* article */}
      <td className="px-4 py-4 text-center">
        {renderPlatformLink(topic.postLink, "Article", <FileTextIcon color={isDark ? "white" : "currentColor"} />)}
      </td>

      {/* video */}
      <td className="px-4 py-4 text-center">
        {renderPlatformLink(topic.ytLink, "Video", <YoutubeIcon />)}
      </td>

      {/* LeetCode */}
      <td className="px-4 py-4 text-center">
        {renderPlatformLink(topic.lcLink, "LeetCode", <LeetCodeLogo />)}
      </td>

      {/* GeeksforGeeks */}
      <td className="px-4 py-4 text-center">
        {renderPlatformLink(topic.gfgLink, "GeeksforGeeks", <GeeksforGeeksLogo />)}
      </td>

      {/* Coding Ninjas */}
      <td className="px-4 py-4 text-center">
        {renderPlatformLink(
          topic.csLink,
          "Coding Ninjas",
          <CodingNinjasLogo />
        )}
      </td>

      {/* Note */}
      <td className="px-4 py-4 text-center">
        <button
          onClick={() => onToggleNote(topic.id)}
          className={`inline-flex items-center justify-center w-8 h-8 rounded transition-colors ${isDark
            ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          title="Add Note"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </td>

      {/* Revision */}
      <td className="px-4 py-4 text-center">
        <button
          onClick={() => onToggleRevision(topic.id)}
          className={`inline-flex items-center justify-center w-8 h-8 rounded transition-colors ${isDark
            ? "text-gray-500 hover:text-yellow-400 hover:bg-yellow-900/20"
            : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
          title="Mark for Revision"
        >
          <StarIcon className="w-4 h-4" />
        </button>
      </td>

      {/* Difficulty */}
      <td className="px-4 py-4 text-center">
        <DifficultyBadge difficulty={topic.difficulty} />
      </td>
    </tr>
  );
};

export default TopicRow;