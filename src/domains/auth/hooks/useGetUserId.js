import useUserStore from "@/domains/auth/store/useUserStore";

export function useGetUserId() {
  const { user } = useUserStore();
  const userInfo = user || {};
  const { userId, userRole, userSeq } = userInfo;
  return { userId, userRole, userSeq };
}
