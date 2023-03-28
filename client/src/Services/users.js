import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/users/login", {
    username: username,
    password: password,
  });
  return response.data;
};

export const postProject = async (
  name,
  description,
  teamId,
  username,
  password
) => {
  const response = await api.post(`/projects/${teamId}`, {
    name,
    description,
    active: false,
    credentials: {
      username,
      password,
    },
  });
  return response.data;
};
