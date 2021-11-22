import axios from "axios"
import { PostsTypeActionType } from "../action-types"
import { setLocalStorage } from './../call-backs/index';


export const getUserPosts = (username: string) => async(dispatch:CallableFunction) => {
    try {

        const res = await axios.get(`http://localhost:5000/api/user/posts/${username}`)

        setLocalStorage("userPosts", res.data)

        dispatch({
            type: PostsTypeActionType.GET_USER_POSTS,
            payload: res.data
        })
    } catch (err: any) {
        console.log(err.response)
    }
}

export const getGroupPosts = (groupId: string) => async(dispatch: CallableFunction) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/group/posts/${groupId}`)
        
        setLocalStorage("groupPosts", res.data)
        
        dispatch({
            type: PostsTypeActionType.GET_GROUP_POSTS,
            payload: res.data
        })
    } catch (err:any) {
        console.log(err.response)
    }
}