import { useAnimation, motion } from "framer-motion";
import { PostFormMobileVariant } from "../../motion";
import { Dispatch, useEffect, SetStateAction, useContext } from "react";
import { IStatistic } from "./DashboardContent";
import { GlobalContext } from "../../context/Provider";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import LanguageDropdown from "./../languageToggle/LanguageDropdown";
import Text from "../reusables/Text";
import PostList from "./PostList";
import GroupList from "./GroupList";

interface IStatInfoMobile {
  statistic: IStatistic;
  setStatistic: Dispatch<SetStateAction<IStatistic>>;
}

const StatInfoMobile: React.FC<IStatInfoMobile> = ({
  statistic,
  setStatistic,
}) => {
  const controls = useAnimation();

  const { postsState, groupState } = useContext(GlobalContext);

  useEffect(() => {
    if (statistic !== null) {
      controls.start("animate");
    }
  }, [statistic, controls]);

  const closeModal = async () => {
    controls.start("exit");
    setTimeout(() => {
      setStatistic(null);
    }, 500);
  };

  return (
    <motion.div
      className="fixed right-0 top-0 w-screen h-screen max-h-screen bg-white px-10 py-10 overflow-y-scroll z-50"
      variants={PostFormMobileVariant}
      initial="initial"
      animate={controls}
    >
      <div className="flex justify-between items-center w-full mb-10">
        <button onClick={() => closeModal()}>
          <ChevronLeftIcon className="text-black h-6 w-6" />
        </button>
        <Text
          type="h4"
          customStyles="text-xl"
          textEng={
            statistic === "myPosts"
              ? "Your Posts"
              : statistic === "groupPosts"
              ? "Group's Posts"
              : "Group Members"
          }
          textKor={
            statistic === "myPosts"
              ? "본인 게시물"
              : statistic === "groupPosts"
              ? "그룹 게시물"
              : "그룹 멤버"
          }
        />
        <LanguageDropdown />
      </div>

      {statistic === "groupMembers" && <GroupList />}

      {statistic === "myPosts" && <PostList statistic={statistic} />}

      {statistic === "groupPosts" && <PostList statistic={statistic} />}
    </motion.div>
  );
};

export default StatInfoMobile;