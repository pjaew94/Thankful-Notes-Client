import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useContext } from "react";
import { getLocalStorage } from "../../context/call-backs";
import { IPost } from "../../context/types";
import { PostListCardsVariants, PostListContainer } from "../../motion";
import { GlobalContext } from "./../../context/Provider";
import Text from "./../reusables/Text";
import { IStatistic } from "./DashboardContent";
import useResponsive from "./../../hooks/useResponsive";

interface PostCard {
  postId: string | null;
  firstName: string | null;
  lastName: string | null;
  msgEng: string | null;
  msgKor: string | null;
  preview: string | null;
  datePosted: string | null;
  isPrivate: boolean | null;
  styles?: string;
}

interface IPostList {
  statistic: IStatistic;
}

const PostList: React.FC<IPostList> = ({ statistic }) => {
  const { postsState } = useContext(GlobalContext);
  const userPosts: IPost[] = getLocalStorage("userPosts", postsState.userPosts);
  const groupPosts: IPost[] = getLocalStorage(
    "groupPosts",
    postsState.groupPosts
  );

  const currentSize = useResponsive();

  return (
    <div className="flex flex-col w-full">
      {/* Template */}
      <div className="w-full grid grid-cols-16 gap-x-3 px-3 md:px-5 text-gray-400 mb-5">
        <Text type="p" textEng="Name" textKor="이름" customStyles={!currentSize.isMobile ? 'col-span-2' : 'col-span-6'} />

        {!currentSize.isMobile ? <Text
          type="p"
          textEng="Message"
          textKor="메세지"
          customStyles="col-span-5"
        /> : null}

       {!currentSize.isMobile ? <Text type="p" textEng="Preview" textKor="시연" customStyles="col-span-5" /> : null}

        <Text
          type="p"
          textEng="Date Posted"
          textKor="올린 날"
          customStyles={!currentSize.isMobile ? 'col-span-2' : 'col-span-7'}
        />
        <Text
          type="p"
          textEng="Private"
          textKor="비공개"
          customStyles={!currentSize.isMobile ? 'col-span-1' : 'col-span-3'}
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
                postId={p.id}
                firstName={p.first_name}
                lastName={p.last_name}
                msgEng={p.message}
                msgKor={p.message_kor}
                preview={p.thought_on_verse1}
                datePosted={p.date_posted}
                isPrivate={p.is_private}
                styles="bg-lightPurple hover:bg-purple-200"
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
                postId={p.id}
                firstName={p.first_name}
                lastName={p.last_name}
                msgEng={p.message}
                msgKor={p.message_kor}
                preview={p.thought_on_verse1}
                datePosted={p.date_posted}
                isPrivate={p.is_private}
                styles="bg-mint hover:bg-darkMint"
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

const PostCard: React.FC<PostCard> = ({
  firstName,
  lastName,
  msgEng,
  msgKor,
  preview,
  datePosted,
  isPrivate,
  styles,
}) => {
  const currentSize = useResponsive();

  const today = new Date();
  const date: number = today.getDate();
  const month: number = today.getMonth();
  const year: number = today.getFullYear();
  const todaysDate = year + "-" + (month + 1) + "-" + date;

  const msgEngPreview = msgEng!.slice(0, 50) + "...";
  const msgKorPreview = msgKor!.slice(0, 50) + "...";

  const previewSlice = preview!.slice(0, 50) + "...";

  const datePostedSliced = datePosted?.slice(0, 10);

  const dateChecked =
    datePostedSliced === todaysDate ? "Today" : datePostedSliced;

  const isPrivateString = isPrivate ? (
    <LockClosedIcon className="h-5 w-5 ml-3" />
  ) : (
    <LockOpenIcon className="h-5 w-5 ml-3" />
  );

  return (
    <motion.div
      className={`w-full grid grid-cols-16 gap-x-3 justify-between px-5 py-5 cursor-pointer mb-5 ${styles}`}
      whileTap={{ scale: 0.95 }}
      variants={PostListCardsVariants}
    >
      <div className={`flex ${!currentSize.isMobile ? 'col-span-2' : 'col-span-6'} `}>
        <Text
          type="p"
          textEng={firstName}
          textKor={firstName}
          customStyles="mr-1 font-bold"
        />
        <Text
          type="p"
          textEng={lastName}
          textKor={lastName}
          customStyles="font-bold"
        />
      </div>

      {!currentSize.isMobile ? <div className="flex col-span-5">
        <Text type="p" textEng={msgEngPreview} textKor={msgKorPreview} />
      </div> : null}

     {!currentSize.isMobile ? <div className="flex col-span-5">
        <Text type="p" textEng={previewSlice} textKor={previewSlice} />
      </div> : null}

      <div className={`flex ${!currentSize.isMobile ? 'col-span-2 ' : 'col-span-7'}`}>
        <Text type="p" textEng={dateChecked} textKor={dateChecked} />
      </div>
      <div className={`flex ${!currentSize.isMobile ? 'col-span-1' : 'col-span-3'} `}>{isPrivateString}</div>
    </motion.div>
  );
};

export default PostList;
