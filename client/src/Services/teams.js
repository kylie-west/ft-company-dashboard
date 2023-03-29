import api from "./api";

export const getTeams = async (companyId) => {
  return api.get(`/company/${companyId}/teams/`);
};
