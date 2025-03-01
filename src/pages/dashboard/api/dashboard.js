import AxiosInstance from "@/shared/utils/axiosInstance";
import { AxiosInstanceAdmin } from "./adminInstance";

export const manageStatus = async () => {
  try {
    const response = await AxiosInstance("/admin/dashboard-info");
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg || "실패" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUsersData = async (data) => {
  const { userSearchParam } = data;
  try {
    const response = await AxiosInstanceAdmin("/user-info", userSearchParam);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.log(error);
  }
};
