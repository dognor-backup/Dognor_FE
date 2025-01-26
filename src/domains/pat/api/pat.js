import { AxiosFormDataInstance } from "../../../shared/utils/axiosInstance";

export const savePatInfo = async (info) => {
  const formData = new FormData();
  formData.append("userSeq", info.userSeq);
  formData.append("name", info.name);
  formData.append("birthday", info.birthday);
  formData.append("weight", parseInt(info.weight, 10));
  formData.append("breedCd", parseInt(info.breedCd, 10));
  formData.append("bloodTypeCd", parseInt(info.bloodTypeCd, 10));
  formData.append("isDonor", parseInt(info.isDonor, 10));
  formData.append("imgFile", info.imgFile);

  console.log(info.imgFile, "dy");

  console.log([...formData.entries()], "formData entries");

  try {
    const response = await AxiosFormDataInstance.post("/pat/info", formData);

    console.log(response, "response임");

    if (response.data.code === 200) {
      return { success: true, data: response.data };
    }
    if (response.data.code === 400) {
      return { success: false, msg: response.data.msg };
    }

    return {
      success: false,
      msg: response.data.msg || "예상치 못한 에러 발생",
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        return {
          success: false,
          msg: data.msg || "Bad Request: 잘못된 요청입니다.",
        };
      } else if (status === 500) {
        return { success: false, msg: "서버 오류가 발생했습니다." };
      }
    }
    return { success: false, msg: "네트워크 오류. 연결 상태를 확인해주세요." };
  }
};
