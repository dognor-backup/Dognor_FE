import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/domains/user/api/user";
import useUserStore from "@/domains/auth/store/useUserStore";

export const useGetUserInfo = () => {
  const { user } = useUserStore();
  const userId = user?.userData?.userId;

  return useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => {
      return getUserInfo(userId);
    },
    enabled: !!userId,
    staleTime: 0,
    retry: 1,
    initialData: {
      name: "",
      phone: "",
      email: "",
    },
    onError: (error) => {
      console.error("유저 정보 조회 중 에러:", error);
    },
  });
};
