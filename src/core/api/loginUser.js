import axios from "axios";

const loginUser = async (credentials) => {
  const { data } = await axios.post("/api/login", credentials);
  return data; 
};

export default loginUser;
