import { useQuery } from "@tanstack/react-query";
import { manageStatus } from "../api/dashboard";

export const useGetAdminData = () => {
  const getDashBoardStatus = useQuery({
    queryKey: ["status"],
    queryFn: manageStatus,
    staleTime: 1000 * 60 * 10,
  });
  return { getDashBoardStatus };
};
