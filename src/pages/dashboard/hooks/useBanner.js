import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessTokenFromDB } from "@/shared/utils/axiosInstance";
import axios from "axios";
import { deleteBanner, getBannerList } from "../api/dashboard";

export function useBannerMutations() {
  const queryClient = useQueryClient();
  const saveBannerMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const token = await getAccessTokenFromDB();
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/dashboard/banner`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === 200) {
          return { success: true, data: response.data };
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: ({ success, data }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["banner"] });
      }
    },
  });

  const getBannerQuery = useQuery({
    queryKey: ["banner"],
    queryFn: getBannerList,
  });

  const deleteBannerMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log(data);
      }
    },
  });
  return { saveBannerMutation, deleteBannerMutation, getBannerQuery };
}
