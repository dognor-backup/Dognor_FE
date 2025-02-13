import axios from "axios";
import { getAccessTokenFromDB } from "@/shared/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useConvetImg = (quillObj, range) => {
  return useMutation({
    mutationFn: async (formData) => {
      const token = await getAccessTokenFromDB();
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/file`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      const { msg, code, data: nestedDate, totalPage } = data;
      quillObj?.insertEmbed(range.index, "image", `${nestedDate}`);
    },
    onError: (error) => {
      console.error("File upload failed:", error);
    },
  });
};
