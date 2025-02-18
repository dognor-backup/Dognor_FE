import useUserStore from "@/domains/auth/store/useUserStore";

export function useGetUserId() {
  const { user } = useUserStore();
  const userInfo = user?.userData;
  const { userId, userRole } = userInfo || {};
  return { userId, userRole };
}
