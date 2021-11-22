import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import Header from "../../components/dashboard/Header.Mobile";

import { loadUser } from "../../context/actions/auth";
import { GlobalContext } from "../../context/Provider";
import { setValueNav } from "../../context/actions/nav";
import { getTodaysMessage } from "../../context/actions/todaysMessage";
import DashboardContent from "../../components/dashboard/DashboardContent";
import { getGroupBasicInfo } from "../../context/actions/group";
import { getGroupPosts, getUserPosts } from "../../context/actions/posts";
import PostSuccess from "../../components/dashboard/PostSuccess";
import useResponsive from "../../hooks/useResponsive";
import NavDesktop from "../../components/dashboard/NavDesktop";
import PostModalDesktop from "../../components/dashboard/PostModalDesktop";
import FullPostInfoMobile from "./../../components/dashboard/FullPostInfoMobile.Mobile";
import { IPost } from "../../context/types";
import FullPostInfoDesktop from "./../../components/dashboard/FullPostInfoDesktop";

export type IShowFullPostState = IPost | null;

const Dashboard: React.FC = () => {
  const router = useRouter();
  const currentSize = useResponsive();

  const [showPageLoading, setShowPageLoading] = useState(false);
  const [showPostSuccess, setShowPostSuccess] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showFullPost, setShowFullPost] = useState<IShowFullPostState>(null);

  const {
    authState,
    authDispatch,
    navDispatch,
    messageDispatch,
    groupDispatch,
    postsDispatch,
    postsState,
  } = useContext(GlobalContext);

  useEffect(() => {
    setValueNav("Dashboard")(navDispatch);

    const checkAuth = async () => {
      const res = await loadUser()(authDispatch);
      if (res === false) {
        router.push("/login");
      }

      await getTodaysMessage()(messageDispatch);
      await getGroupBasicInfo()(groupDispatch);
    };

    const getPosts = async () => {
      await getUserPosts(authState!.user!.username)(postsDispatch);
      await getGroupPosts(authState!.user!.group_id!)(postsDispatch);
    };
    checkAuth();
    if (authState?.isAuthenticated) {
      getPosts();
    }
  }, []);

  return (
    <div
      className={`flex flex-col w-screen min-h-screen py-10 px-10 md:p-16 bg-white xl:p-0 xl:flex-row`}
    >
      {showPostSuccess && <PostSuccess />}
      {currentSize.isMobile && (
        <FullPostInfoMobile
          showFullPost={showFullPost}
          setShowFullPost={setShowFullPost}
        />
      )}
      {!currentSize.isMobile && showFullPost ?  (
        <FullPostInfoDesktop
          showFullPost={showFullPost}
          setShowFullPost={setShowFullPost}
        />
      ) : null}
      {showPostForm && !currentSize.isMobile ? (
        <PostModalDesktop
          showPostForm={showPostForm}
          setShowPostForm={setShowPostForm}
          setShowPostSuccess={setShowPostSuccess}
          setShowErrorModal={setShowErrorModal}
        />
      ) : null}

      {currentSize.isMobile || currentSize.isTablet ? (
        <Header />
      ) : (
        <NavDesktop />
      )}

      <div className="xl:w-6/12">
        <DashboardContent
          setShowPostSuccess={setShowPostSuccess}
          showPostForm={showPostForm}
          setShowPostForm={setShowPostForm}
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          showFullPost={showFullPost}
          setShowFullPost={setShowFullPost}
        />
      </div>
      {currentSize.isDesktop && <div className="w-4/12"></div>}
    </div>
  );
};

export default Dashboard;
