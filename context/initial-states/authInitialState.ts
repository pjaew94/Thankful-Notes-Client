import { IAuthState } from '../types';

const authInitialState:IAuthState = {
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null
    
}


export default authInitialState