export const AxiosInstanceAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/dashboard`,
  headers: {
    "Content-Type": "application/json",
  },
});
