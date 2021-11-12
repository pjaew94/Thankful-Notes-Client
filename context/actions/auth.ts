import axios from "axios";
import { AuthActionType } from "../action-types";
import { IAuthState, IRegisterForm } from "../types";

const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export const loadUser = (data: IAuthState['user']) => (dispatch: CallableFunction) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
    try {
      dispatch({
        type: AuthActionType.USER_LOADED,
        payload: data,
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: AuthActionType.AUTH_ERROR,
        payload: null,
      });
    }


};

export const register =
  async (data: IRegisterForm) => async (dispatch: CallableFunction) => {
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
      await dispatch({
        type: AuthActionType.REGISTER_SUCCESS,
        payload: userToken,
      });
    } catch (err) {
      console.log(err);
      await dispatch({
        type: AuthActionType.REGISTER_FAIL,
        payload: null,
      });
    }
  };

// Login
export const login =
  async (email: string, password: string) =>
  async (dispatch: CallableFunction) => {
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

      await dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: userToken.data,
      });
    } catch (err) {
      console.log(err);

      await dispatch({
        type: AuthActionType.LOGIN_FAIL,
        payload: null,
      });
    }
  };

export const logout = async () => async (dispatch: CallableFunction) => {
  dispatch({
    type: AuthActionType.LOGOUT,
    payload: null,
  });
};
