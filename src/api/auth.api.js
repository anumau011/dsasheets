import api from "./api";

export const login = (data) => {
  return api.post("/login", data);
};

export const register = (data) => {
  return api.post("/signup", data);
};

export const logout = () => {
  return api.post("/logout", {});
};