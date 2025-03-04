import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "@/shared/utils/axiosInstance";

export const fetchRegisteredHospitals = async ({ text, x, y, radius = 2000, page = 1, size = 20 }) => {
  try {
    const response = await AxiosInstance.post("/hospital/search-map", {
      text,
      x,
      y,
      radius,
      page,
      size,
    });

    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, msg: response.data.msg || "데이터를 불러오지 못했습니다." };
    }
  } catch (error) {
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};
