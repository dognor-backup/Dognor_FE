import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePost = (setImgUrl) => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/file`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("File uploaded successfully:", data);
      setImgUrl(data);
    },
    onError: (error) => {
      console.error("File upload failed:", error);
    },
  });
};
