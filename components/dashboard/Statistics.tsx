import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { IStatistic } from "./DashboardContent";
import Image from "next/image";
import Text from "../reusables/Text";
import { GlobalContext } from "../../context/Provider";
import { motion } from "framer-motion";
import { getLocalStorage } from "../../context/call-backs";

interface IStatistics {
  setStatistic: Dispatch<SetStateAction<IStatistic>>;
}

const Statistics: React.FC<IStatistics> = ({ setStatistic }) => {
  const { authState, groupState, postsState } =
    useContext(GlobalContext);

    let userPosts = getLocalStorage("userPosts", postsState.userPosts)
    let groupPosts = getLocalStorage("groupPosts", postsState.groupPosts)


  return (
    <div className="flex flex-col w-full">
      <Text type='h7' textEng='Statistic' textKor='통계' />
      <div className='flex flex-col w-full mt-7 gap-5 md:grid md:grid-cols-3 md:gap-4 md:justify-between'>
      <motion.div
        onClick={() => setStatistic("myPosts")}
        whileTap={{ scale: 0.95 }}
      >
        <StatisticCard
          bgColor="lightPurple"
          imgSrc="/user-puzzle.svg"
          textEng="Your Posts:"
          textKor="본인 게시물:"
          data={userPosts.length}
          setStatTo="myPosts"
        />
      </motion.div>
      {groupState.members && (
        <motion.div
          onClick={() => setStatistic("groupMembers")}
          whileTap={{ scale: 0.95 }}
        >
          <StatisticCard
            bgColor="pink"
            imgSrc="/group-members.svg"
            textEng="Group Members:"
            textKor="그룹 멤머들:"
            data={groupState.members.length}
            setStatTo="myPosts"
          />
        </motion.div>
      )}
      <motion.div
        onClick={() => setStatistic("groupPosts")}
        whileTap={{ scale: 0.95 }}
      >
        <StatisticCard
          bgColor="mint"
          imgSrc="/group-puzzle.svg"
          textEng="Group Posts:"
          textKor="그룹 게시물:"
          data={groupPosts.length}
          setStatTo="myPosts"
        />
      </motion.div>
      </div>
    </div>
  );
};

interface StatisticCard {
  bgColor: string;
  imgSrc: string;
  textEng: string;
  textKor: string;
  data: number;
  setStatTo: IStatistic;
}

const StatisticCard: React.FC<StatisticCard> = ({
  bgColor,
  imgSrc,
  textEng,
  textKor,
  data,
  setStatTo,
}) => {
  return (
    <div
      className={`flex justify-between items-center w-full px-10 py-6 bg-${bgColor} cursor-pointer md:px-3 lg:hover:shadow-md lg:px-10 xl:px-5 2xl:px-10`}
    >
      <Image
        src={imgSrc}
        height="50px"
        width="50px"
        alt="pretty circle"
        className="z-10"
      />
      <div className="flex flex-col items-center w-40 md:w-32">
        <Text
          type="p"
          textEng={textEng}
          textKor={textKor}
          customStyles="text-gray-400"
        />
        <Text type="h5" textEng={data} textKor={data} />
      </div>
    </div>
  );
};
export default Statistics;
