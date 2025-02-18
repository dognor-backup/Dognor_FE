import axios from "axios";
import { openDatabase } from "@/domains/auth/utils/indexedDB";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosFormDataInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessTokenFromDB();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Authorization 헤더 설정 실패:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosFormDataInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessTokenFromDB();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAccessTokenFromDB = async () => {
  const db = await openDatabase();
  const transaction = db.transaction("AuthStore", "readonly");
  const store = transaction.objectStore("AuthStore");

  return new Promise((resolve, reject) => {
    const request = store.get("currentUser");

    request.onsuccess = (event) => {
      const user = event.target.result;
      if (user && user.accessToken) {
        resolve(user.accessToken);
      } else {
        resolve(null);
      }
    };

    request.onerror = (event) => {
      reject("Access Token 로드 실패: " + event.target.error);
    };
  });
};

export default AxiosInstance;
