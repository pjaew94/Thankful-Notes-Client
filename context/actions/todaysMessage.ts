import axios from "axios";
import { MessageActionType } from "../action-types";

export const getTodaysMessage = () => async (dispatch: CallableFunction) => {
  try {
    const check = await axios.get(
      "http://localhost:5000/api/posts/check/if-posted"
    );

    if (check.data === false) {

      const res = await axios.get(
        `http://localhost:5000/api/posts/todays/post`
      );

      await dispatch({
        type: MessageActionType.GET_MESSAGE_SUCCESS,
        payload: res.data,
      });


    }

    if(check.data === true) {

      await dispatch({
        type: MessageActionType.CLEAR_MESSAGE,
        payload: null
      })
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const clearTodaysMessage = () => async(dispatch: CallableFunction) => {
  try{

    
    await dispatch({
      type: MessageActionType.CLEAR_MESSAGE,
      payload: null
    })

    console.log('hit')
  } catch(err: any) {
    console.log(err)
  }
}
