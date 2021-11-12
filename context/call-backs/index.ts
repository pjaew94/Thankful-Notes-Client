import axios from "axios";

export const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export const loadUserCallBack = async () => {

try {
    const userData = await axios.get(`http://localhost:5000/api/user`);
    return userData.data
} catch (err) {
    console.log(err)
    return null
}

};
