import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { IAuthAction, IAuthState } from "../types";
import { IRegisterForm } from "./../types";

const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

// Load User - need set alarm
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const userData: IAuthState["user"] = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL!}/api/user`
    );
    return (dispatch: Dispatch<IAuthAction>) => {
      dispatch({
        type: ActionType.USER_LOADED,
        payload: userData,
      });
    };
  } catch (err) {
    console.log(err);
  }
};

// Register
export const register = async (data: IRegisterForm) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ data });
  console.log(body);

  try {
    const userToken = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL!}/api/user`,
      body,
      config
    );

    return (dispatch: Dispatch<IAuthAction>) => {
        dispatch({
            type: ActionType.REGISTER_SUCCESS,
            payload: userToken
        })
    }
    
  } catch (err) {
    console.log(err);
    return (dispatch: Dispatch<IAuthAction>) => {
      dispatch({
        type: ActionType.REGISTER_FAIL,
        payload: null,
      });
    };
  }
};

// Login - need to set alarm
export const login = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const userToken = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL!}/api/user/login`,
      body,
      config
    );

    return (dispatch: Dispatch<IAuthAction>) => {
      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: userToken.data,
      });
    };
  } catch (err) {
    console.log(err);

    return (dispatch: Dispatch<IAuthAction>) => {
      dispatch({
        type: ActionType.LOGIN_FAIL,
        payload: null,
      });
    };
  }
};

// Logout
export const logout = () => {
  return (dispatch: Dispatch<IAuthAction>) => {
    dispatch({
      type: ActionType.LOGOUT,
      payload: null,
    });
  };
};
