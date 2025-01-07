import apiInstance from "./apiInstance";

export const login = async (credentials) => {
  const { userId, pw, rememberMe } = credentials;
  try {
    const response = await apiInstance.post("/login", {
      userId,
      pw,
      rememberMe,
    });

    switch (response.data.code) {
      case 200:
        return response.data;
      case 400:
        throw new Error("Bad Request: 요청이 잘못되었습니다.");
      default:
        throw new Error(response.data.msg || "Unexpected error occurred.");
    }
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error("HTTP 400: Bad Request - 요청이 잘못되었습니다.");
      } else if (status === 500) {
        throw new Error(
          "HTTP 500: Server Error - 서버에서 문제가 발생했습니다."
        );
      } else {
        throw new Error("Unexpected HTTP error.");
      }
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
