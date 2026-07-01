import api from "./api";

export const getQuestions = () => {
  return api.get("/questions");
};
