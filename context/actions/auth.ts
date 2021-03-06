import axios from "axios";
import { IRegisterFormData2 } from "../../components/auth/RegisterFormPt2";
import { IData } from "../../pages/register";
import { AuthActionType } from "../action-types";
import { IRegisterFormData3 } from "./../../components/auth/RegisterFormPt3";

const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export const loadUser = () => async (dispatch: CallableFunction): Promise<boolean> => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const userData = await axios.get(`https://thankful-notes-server.herokuapp.com/api/user`);

    await dispatch({
      type: AuthActionType.USER_LOADED,
      payload: userData.data,
    });

    return true

  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: AuthActionType.AUTH_ERROR,
    //   payload: null,
    // });

    return false
  }
};

// Login
export const login =
  (email: string, password: string) => async (dispatch: CallableFunction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        `https://thankful-notes-server.herokuapp.com/api/user/login`,
        body,
        config
      );
      const token = res.data.token;
      await dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: token,
      });
    } catch (err: any) {
      console.log(err.response);
      dispatch({
        type: AuthActionType.LOGIN_FAIL,
        payload: err.response.data,
      });
    }
  };

export const secondStepRegistrationCheckPoint =
  (data: IRegisterFormData2) =>
  async (dispatch: CallableFunction): Promise<"success" | "error"> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ data });

    try {
      await axios.post(
        `https://thankful-notes-server.herokuapp.com/api/user/check-auth-section`,
        body,
        config
      );

      return "success";
    } catch (err: any) {
      await dispatch({
        type: AuthActionType.REGISTER_FAIL,
        payload: err.response.data,
      });
      return "error";
    }
  };

export const checkIfGroupExists =
  (data: IRegisterFormData3, groupOption: "join" | "create") =>
  async (
    dispatch: CallableFunction
  ): Promise<"success" | "error" | undefined> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    const body = JSON.stringify({ data });
 
    if (groupOption === "join") {
      try {
        await axios.post(
          "https://thankful-notes-server.herokuapp.com/api/user/check-group-join",
          body,
          config
        );

        return "success";
      } catch (err: any) {
        await dispatch({
          type: AuthActionType.REGISTER_FAIL,
          payload: err.response.data,
        });
        return "error";
      }
    }
    if (groupOption === "create") {
      try {
        await axios.post(
          "https://thankful-notes-server.herokuapp.com/api/group/",
          body,
          config
        );
        return "success";
      } catch (err: any) {
        await dispatch({
          type: AuthActionType.REGISTER_FAIL,
          payload: err.response.data,
        });
        return "error";
      }
    }
  };

export const register =
  (data: IData) => async (dispatch: CallableFunction): Promise<"success" | "error"> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ data });


    try {
      const res = await axios.post(
        `https://thankful-notes-server.herokuapp.com/api/user`,
        body,
        config
      );
      await dispatch({
        type: AuthActionType.REGISTER_SUCCESS,
        payload: res.data.token,
      });

      return "success";
    } catch (err: any) {
      await dispatch({
        type: AuthActionType.REGISTER_FAIL,
        payload: err.response.data,
      });

      return "error"
    }
  };

export const removeWarning = () => async (dispatch: CallableFunction) => {
  dispatch({
    type: AuthActionType.REMOVE_WARNING,
    payload: null,
  });
};

export const logout = () => async (dispatch: CallableFunction) => {
  dispatch({
    type: AuthActionType.LOGOUT,
    payload: null,
  });
};
