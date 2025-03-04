import AxiosInstance from "@/shared/utils/axiosInstance";
import { data } from "react-router-dom";

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
  try {
    const response = await AxiosInstance.post("/dashboard/user-info", data);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export const approveHospital = async (data) => {
  console.log(data);
  try {
    const response = await AxiosInstance.post("/dashboard/approve-dismissed", data);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.log(error);
  }
};
