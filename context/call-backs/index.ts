import axios, { Axios, AxiosResponse }  from "axios";
import { json } from "stream/consumers";
import { IPostForm } from './../../components/dashboard/PostForm';

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
      `https://thankful-notes-server.herokuapp.com/api/user`
    );
    return userData.data;
  } catch (err: any) {
    console.log(err.response.data);
    return err.response.data;
  }
};


export const createPost = async(data: IPostForm): Promise<"success" | "error"> => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ data });

    const newPost = await axios.post('https://thankful-notes-server.herokuapp.com/api/posts', body, config)


    return "success"
    
  } catch (err: any) {
    console.log(err.response.data);
    return "error";
  }
}


export const editPost = async(data: IPostForm, id: string): Promise<"success" | "error"> => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };



    const body = JSON.stringify({ data });



    const editedPost = await axios.put(`http://localhost:5000/api/posts/${id}`, body, config)


    return 'success'
  } catch (err: any) {
    console.log(err.response.data)
    return 'error'
  }
}




export const setLocalStorage = (key: string, value: any) => {
  try{
    window.localStorage.setItem(key, JSON.stringify(value));
  }catch(err) {
    console.log(err)
  }
} 

export const getLocalStorage = (key: string, initialValue: any) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue
  } catch (err) {
    console.log(err)
    return initialValue
  }
}