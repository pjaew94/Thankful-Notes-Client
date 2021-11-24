import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IStatistic } from "./DashboardContent";
import Image from "next/image";
import Text from "../reusables/Text";
import { GlobalContext } from "../../context/Provider";
import { motion } from "framer-motion";
import { getLocalStorage } from "../../context/call-backs";
import Button from "../reusables/Button";
import JoinGroupForm from './JoinGroupForm';

interface IStatistics {
  setStatistic: Dispatch<SetStateAction<IStatistic>>;
}

const Statistics: React.FC<IStatistics> = ({ setStatistic }) => {
  const { authState, groupState, postsState } = useContext(GlobalContext);

  const [showGroupForm, setShowGroupForm] = useState(false);
  let userPosts = getLocalStorage("userPosts", postsState.userPosts);
  let groupPosts = getLocalStorage("groupPosts", postsState.groupPosts);

  return (
    <div className="flex flex-col w-full">
      {showGroupForm && <JoinGroupForm setShowGroupForm={setShowGroupForm }/>}
      <Text type="h7" textEng="Statistic" textKor="통계" />
      <div className="flex flex-col w-full mt-7 gap-5 md:grid md:grid-cols-3 md:gap-4 md:justify-between">
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

        {groupState?.members?.length !== 0 && <motion.div
          onClick={() => setStatistic("groupMembers")}
          whileTap={{ scale: 0.95 }}
        >
          <StatisticCard
            bgColor="pink"
            imgSrc="/group-members.svg"
            textEng="Group Members:"
            textKor="그룹 멤머들:"
            data={groupState?.members?.length}
            setStatTo="myPosts"
          />
        </motion.div>}

        {groupState?.members?.length !== 0 && <motion.div
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
        </motion.div>}

        {groupState?.members?.length === 0 && <div className='flex flex-col justify-between md:flex-row md:col-span-2 w-full py-6 px-5 h-full bg-gray-100 '>
          <div className='flex flex-col'>
          <Text type='label' textEng='You are not in a group.' textKor='그룹에 관련되있지 않습니다.'  customStyles='text-gray-400' />
          <Text type='label' textEng='Join a group to get most out of the app.' textKor='그룹을 가입을해야 최대한 경험을 갖을수있습니다.' customStyles='text-gray-400' />
          </div>

          <Button 
            onClick={() => setShowGroupForm(true)}
            textEng='Join'
            textKor='조인'
            customStyles='mt-5 w-full border border-black md:mt-0 md:w-1/4 lg:hover:bg-black lg:hover:text-white'

          />
          </div>}
      </div>
    </div>
  );
};

interface StatisticCard {
  bgColor: string;
  imgSrc: string;
  textEng: string;
  textKor: string;
  data: number | undefined;
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
