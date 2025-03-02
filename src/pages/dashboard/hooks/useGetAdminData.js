import { useQuery } from "@tanstack/react-query";
import { getUsersData, manageStatus } from "../api/dashboard";

export const useGetAdminData = () => {
  const { data: dashboardStatus } = useQuery({
    queryKey: ["status"],
    queryFn: manageStatus,
    staleTime: 1000 * 60 * 10,
  });
  return { dashboardStatus };
};

export const useGetUsersData = (params) => {
  const { data: usersData } = useQuery({
    queryKey: ["usersDatas", params],
    queryFn: () => getUsersData(params),
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log(data);
      }
    },
  });

  return { usersData };
};
