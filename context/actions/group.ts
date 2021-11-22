import axios from "axios";
import { GroupTypeActionType } from "../action-types";
import { setLocalStorage } from './../call-backs/index';
import { IGroupState } from './../types';

export const getGroupBasicInfo = () => async (dispatch: CallableFunction) => {
    try {

        const res = await axios.get('http://localhost:5000/api/group')

        
        setLocalStorage("groupInfo", res.data)
        
        await dispatch({
            type: GroupTypeActionType.GET_BASIC_INFO,
            payload: res.data,
          });

        
    } catch (err: any) {
        console.log(err.response);
    }
}