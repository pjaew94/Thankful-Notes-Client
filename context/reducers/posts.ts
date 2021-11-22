import { PostsTypeActionType } from "../action-types";
import { IPostsAction, IPostsState } from "../types";



export const posts =(state: IPostsState, action: IPostsAction): IPostsState => {
    const {type, payload} = action

    switch(type) {
        case PostsTypeActionType.GET_USER_POSTS:
            return {
                ...state,
                userPosts: payload
            }
        case PostsTypeActionType.GET_GROUP_POSTS:
            return {
                ...state,
                groupPosts: payload
            }
        default:
            return state
    }

}