import AxiosInstance, { getAccessTokenFromDB } from "@/shared/utils/axiosInstance";
import axios from "axios";

export const getCampaigns = async (data) => {
  const { userSeq, page, size } = data;
  try {
    const response = await AxiosInstance.get(`/campaign/${userSeq}/${page}/${size}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {}
};

export const deleteCampaign = async (data) => {
  try {
    const response = await AxiosInstance.delete(`/campaign/${data}`);
    if (response.data.code === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {}
};

//캠페인 상세 조회
export const getCampaignDetail = async (data) => {
  const { camPaignSeq, userSeq } = data;
  try {
    const response = await AxiosInstance.get(`/campaign/${camPaignSeq}/${userSeq}`);
    if (response.data.code === 200) {
      console.log(data);
      return { success: true, data: response.data.data };
    }
  } catch (error) {}
};

export const likeCampaign = async (data) => {
  try {
    const response = await AxiosInstance.patch(`/campaign/like`, data);
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {}
};

export const saveCampaign = async (formData) => {
  try {
    const token = await getAccessTokenFromDB();
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/campaign`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {}
};

export const editCampaign = async (formData) => {
  try {
    const token = await getAccessTokenFromDB();
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/campaign`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {}
};
