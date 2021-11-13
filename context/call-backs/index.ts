import axios from "axios";

const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export const loadUserCallBack = async () => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  try {
    const userData = await axios.get(
      `http://localhost:5000/api/user`
    );
    return userData.data;
  } catch (err: any) {
    console.log(err.response.data);
    return err.response.data;
  }
};
