import React, { createContext, useState, useEffect } from "react";
import { getQuestions } from "../api/question.api";
import { getUserProgress, markDone, markUndo } from "../api/progress.api";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export const DSAProgressContext = createContext();

const initialStats = {
  totalProblems: 0,
  easyCount: 0,
  mediumCount: 0,
  hardCount: 0,
};

export const DSAProgressProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [steps, setSteps] = useState([]);
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [stats, setStats] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(true);

  const resetQuestions = () => {
    setSteps([]);
    setCompletedProblems(new Set());
    setStats(initialStats);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const questionsResponse = await getQuestions();
        setSteps(questionsResponse.data);

        if (user) {
          const progressResponse = await getUserProgress();

          setCompletedProblems(
            new Set(progressResponse.data.map((item) => item.topicId))
          );
        } else {
          setCompletedProblems(new Set());
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load data."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  useEffect(() => {
    let totalProblems = 0;
    const difficultyCount = {
      1: 0,
      2: 0,
      3: 0,
    };

    steps.forEach((step) => {
      step.subSteps.forEach((subStep) => {
        subStep.topics.forEach((topic) => {
          totalProblems++;

          const difficulty = topic.difficulty || 1;
          difficultyCount[difficulty]++;
        });
      });
    });

    setStats({
      totalProblems,
      easyCount: difficultyCount[1],
      mediumCount: difficultyCount[2],
      hardCount: difficultyCount[3],
    });
  }, [steps]);

  const isProblemCompleted = (problemId) => {
    return completedProblems.has(problemId);
  };

  const markProblemCompleted = async (problemData) => {
    if (!user) {
      toast.error("Please log in to track your progress.");
      return { success: false };
    }

    try {
      const alreadyCompleted = completedProblems.has(problemData.id);

      if (alreadyCompleted) {
        // await markUndo(problemData.id);
        toast.promise(
          markUndo(problemData.id),
          {
            loading: "Marking as incomplete...",
            success: "Problem marked as incomplete!",
            error: "Failed to undo completion.",
          }
        );
        setCompletedProblems((prev) => {
          const updated = new Set(prev);
          updated.delete(problemData.id);
          return updated;
        });
      } else {
        toast.promise(
          markDone(problemData.id),
          {
            loading: "Marking as complete...",
            success: "Problem marked as complete!",
            error: "Failed to mark as complete.",
          }
        );

        setCompletedProblems((prev) => {
          const updated = new Set(prev);
          updated.add(problemData.id);
          return updated;
        });
      }

      return { success: true };
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update progress."
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

  const toggleProblemCompletion = (problemData) => {
    return markProblemCompleted(problemData);
  };

  const getOverallProgress = () => {
    if (!stats.totalProblems) return 0;

    return Math.round(
      (completedProblems.size / stats.totalProblems) * 100
    );
  };

  const getDifficultyProgress = () => {
    const completed = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    steps.forEach((step) => {
      step.subSteps.forEach((subStep) => {
        subStep.topics.forEach((topic) => {
          if (!completedProblems.has(topic.id)) return;

          switch (topic.difficulty) {
            case 1:
              completed.easy++;
              break;
            case 2:
              completed.medium++;
              break;
            case 3:
              completed.hard++;
              break;
            default:
              completed.easy++;
          }
        });
      });
    });

    return {
      progress: {
        easy:
          stats.easyCount > 0
            ? Math.round((completed.easy / stats.easyCount) * 100)
            : 0,

        medium:
          stats.mediumCount > 0
            ? Math.round((completed.medium / stats.mediumCount) * 100)
            : 0,

        hard:
          stats.hardCount > 0
            ? Math.round((completed.hard / stats.hardCount) * 100)
            : 0,
      },

      completed,
    };
  };

  const value = {
    steps,
    completedProblems,
    stats,
    isLoading,

    markProblemCompleted,
    toggleProblemCompletion,
    resetQuestions,

    isProblemCompleted,
    getOverallProgress,
    getDifficultyProgress,

    isAuthenticated,
  };

  return (
    <DSAProgressContext.Provider value={value}>
      {children}
    </DSAProgressContext.Provider>
  );
};