import { useEffect, useContext } from "react";
import { loadUser } from "../context/actions/auth";
import { loadUserCallBack } from "../context/call-backs";
import { GlobalContext } from "./../context/Provider";


const Dashboard: React.FC = () => {
    const { authState, authDispatch } = useContext(GlobalContext);

    const magic = () => {
        setAuthToken(localStorage.token)
        loadUserCallBack()
        .then((userData) => {
          loadUser()(authDispatch);
        })
        .catch((err) => {
          console.log(err);
        });


        console.log(authState);
    }

    return (
        <button onClick={() => magic()}>
           Click me
        </button>
    )
}

export default Dashboard
