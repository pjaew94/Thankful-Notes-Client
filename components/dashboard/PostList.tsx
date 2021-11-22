import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { Dispatch, useContext, SetStateAction, useState } from "react";
import { getLocalStorage } from "../../context/call-backs";
import { IPost } from "../../context/types";
import { PostListCardsVariants, PostListContainer } from "../../motion";
import { GlobalContext } from "./../../context/Provider";
import Text from "./../reusables/Text";
import { IStatistic } from "./DashboardContent";
import useResponsive from "./../../hooks/useResponsive";
import { IShowFullPostState } from "../../pages/dashboard";
import PrivateWarning from "./../warnings/PrivateWarning";

interface PostCard {
  postInfo: IPost;
  styles?: string;
  setShowFullPost: Dispatch<SetStateAction<IShowFullPostState>>;
  setShowPrivateWarning: Dispatch<SetStateAction<boolean>>;
}

interface IPostList {
  statistic: IStatistic;
  setShowFullPost: Dispatch<SetStateAction<IShowFullPostState>>;
  showFullPost: IShowFullPostState;
}

const PostList: React.FC<IPostList> = ({
  statistic,
  setShowFullPost,
  showFullPost,
}) => {
  const [showPrivateWarning, setShowPrivateWarning] = useState(false);
  const { postsState } = useContext(GlobalContext);
  const userPosts: IPost[] = getLocalStorage("userPosts", postsState.userPosts);
  const groupPosts: IPost[] = getLocalStorage(
    "groupPosts",
    postsState.groupPosts
  );

  const currentSize = useResponsive();

  return (
    <div className="flex flex-col w-full">
      {showPrivateWarning && (
        <PrivateWarning setShowPrivateWarning={setShowPrivateWarning} />
      )}
      {/* Template */}
      <div className="w-full grid grid-cols-16 gap-x-3 px-3 md:px-5 text-gray-400 mb-5">
        <Text
          type="p"
          textEng="Name"
          textKor="이름"
          customStyles={!currentSize.isMobile ? "col-span-2" : "col-span-6"}
        />

        {!currentSize.isMobile ? (
          <Text
            type="p"
            textEng="Message"
            textKor="메세지"
            customStyles="col-span-5"
          />
        ) : null}

        {!currentSize.isMobile ? (
          <Text
            type="p"
            textEng="Preview"
            textKor="시연"
            customStyles="col-span-5"
          />
        ) : null}

        <Text
          type="p"
          textEng="Date Posted"
          textKor="올린 날"
          customStyles={!currentSize.isMobile ? "col-span-2" : "col-span-7"}
        />
        <Text
          type="p"
          textEng="Private"
          textKor="비공개"
          customStyles={!currentSize.isMobile ? "col-span-1" : "col-span-3"}
        />
      </div>

      {statistic === "myPosts" && (
        <motion.div
          className=""
          variants={PostListContainer}
          initial="initial"
          animate="animate"
        >
          {userPosts.map((p) => {
            return (
              <PostCard
                key={p.id}
                postInfo={p}
                setShowFullPost={setShowFullPost}
                setShowPrivateWarning={setShowPrivateWarning}
                styles="bg-lightPurple lg:hover:bg-purple-200"
              />
            );
          })}
        </motion.div>
      )}
      {statistic === "groupPosts" && (
        <motion.div
          className=""
          variants={PostListContainer}
          initial="initial"
          animate="animate"
        >
          {groupPosts.map((p) => {
            return (
              <PostCard
                key={p.id}
                postInfo={p}
                setShowFullPost={setShowFullPost}
                setShowPrivateWarning={setShowPrivateWarning}
                styles="bg-mint lg:hover:bg-darkMint"
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

const PostCard: React.FC<PostCard> = ({
  postInfo,
  styles,
  setShowFullPost,
  setShowPrivateWarning,
}) => {
  const currentSize = useResponsive();

  const { authState } = useContext(GlobalContext);

  const today = new Date();
  const date: number = today.getDate();
  const month: number = today.getMonth();
  const year: number = today.getFullYear();
  const todaysDate = year + "-" + (month + 1) + "-" + date;

  const msgEngPreview = postInfo.message!.slice(0, 50) + "...";
  const msgKorPreview = postInfo.message_kor!.slice(0, 50) + "...";

  const previewSlice = postInfo.thought_on_verse1!.slice(0, 50) + "...";

  const datePostedSliced = postInfo.date_posted?.slice(0, 10);

  const dateChecked =
    datePostedSliced === todaysDate ? "Today" : datePostedSliced;

  const isPrivateString = postInfo.is_private ? (
    <LockClosedIcon className="h-5 w-5 ml-3" />
  ) : (
    <LockOpenIcon className="h-5 w-5 ml-3" />
  );

  const postClicked = () => {
    if (postInfo.is_private) {
      if (authState?.user?.username === postInfo.username) {
        setShowFullPost(postInfo);
      } else {
        setShowPrivateWarning(true);
      }
    } else {
      setShowFullPost(postInfo);
    }
  };

  return (
    <motion.div
      className={`w-full grid grid-cols-16 gap-x-3 justify-between px-5 py-5 cursor-pointer mb-5 ${styles}`}
      whileTap={{ scale: 0.95 }}
      variants={PostListCardsVariants}
      onClick={() => postClicked()}
    >
      <div
        className={`flex break-words ${
          !currentSize.isMobile ? "col-span-2" : "col-span-6"
        } `}
      >
        <Text
          type="p"
          textEng={postInfo!.first_name + " " + postInfo!.last_name!}
          textKor={postInfo!.first_name + " " + postInfo!.last_name!}
          customStyles="font-bold break-words"
        />
      </div>

      {!currentSize.isMobile ? (
        <div className="flex col-span-5">
          <Text type="p" textEng={msgEngPreview} textKor={msgKorPreview} />
        </div>
      ) : null}

      {!currentSize.isMobile ? (
        <div className="flex col-span-5">
          <Text type="p" textEng={previewSlice} textKor={previewSlice} />
        </div>
      ) : null}

      <div
        className={`flex ${
          !currentSize.isMobile ? "col-span-2 " : "col-span-7"
        }`}
      >
        <Text type="p" textEng={dateChecked} textKor={dateChecked} />
      </div>
      <div
        className={`flex ${
          !currentSize.isMobile ? "col-span-1" : "col-span-3"
        } `}
      >
        {isPrivateString}
      </div>
    </motion.div>
  );
};

export default PostList;
