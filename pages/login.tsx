import { NextPage } from "next"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import LoginContent from '../components/auth/LoginContent';
import AuthWarning from "../components/warnings/AuthWarning";
import { GlobalContext } from "../context/Provider";
import { loadUser } from './../context/actions/auth';


const Login: NextPage = () => {
    const {authState, authDispatch} = useContext(GlobalContext)
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async() => {
            const res = await loadUser()(authDispatch)
            if (res === true) {
                router.push('/dashboard/loading')
              }
        }
        checkAuth()
    }, [authState?.isAuthenticated])

    return (
        <div className='h-screen min-h-screen w-screen'>
            {authState?.error && <AuthWarning />}
            <LoginContent />

      
        </div>
    )
}

export default Login
