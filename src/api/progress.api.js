import api from "./api";

export const markDone = (questionId) => {
  return api.post(`/mark-complete`, { questionId });
};

export const markUndo = (questionId) => {
  return api.post(`/mark-undo`, { questionId });
};

export const getUserProgress = () => {
  return api.get(`/user-progress`);
}