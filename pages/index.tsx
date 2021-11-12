import type { NextPage } from "next";
import router, { useRouter } from "next/router";

import { useEffect, useContext } from "react";
import { loadUser } from "../context/actions/auth";
import { loadUserCallBack } from "../context/call-backs";
import { GlobalContext } from "./../context/Provider";
import Loading from "../components/loading/Loading";

const Home: NextPage = () => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.token) {
      loadUserCallBack(localStorage.token)
        .then((userData) => {
          loadUser(userData)(authDispatch);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setTimeout(() => {
      if (authState?.isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }, 2000);
  }, [authDispatch, authState?.isAuthenticated, router]);

  return <Loading />;
};

export default Home;
