import api from "./api";

export const createAdvice = async (advice) => {
  const body = {
    advice: advice,
  };
  const response = await api.post("api/v1/advice/", body);
  return response.data;
};

export const findOne = async () => {
  const response = await api.get("api/v1/advice/");
  return response;
};

export const findById = async (id) => {
  const response = await api.get(`api/v1/advice/${id}`);
  return response.data;
};

export const updateAdvice = async (id, advice) => {
  const response = await api.put(`api/v1/advice/${id}`, advice);
  return response.data;
};

export const deleteAdvice = async (id) => {
  const response = await api.delete(`api/v1/advice/${id}`);
  return response.data;
};

export const userAdvices = async () => {
  const reponse = await api.get(`api/v1/userAdvice/`);
  return reponse.data;
};

export const findAllAdvices = async () => {
  const response = await api.get("api/v1/advice/all");
  return response.data;
};

export const createUserAdvice = async (userAdvice) => {
  const response = await api.post("api/v1/userAdvice/", userAdvice);
  return response;
};

export const deleteUserAdvice = async (id) => {
  const response = await api.delete(`api/v1/userAdvice/${id}`);
  return response.data;
};

export const alimentarConselhos = async () => {
  const response = await api.get(`api/v1/advice/alimentar`);
  return response;
}
