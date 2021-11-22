import { GlobalContext } from "../../context/Provider";
import { SetStateAction, Dispatch, useContext } from "react";
import Text from "../reusables/Text";
import { IStatistic } from "./DashboardContent";
import PostList from "./PostList";
import GroupList from "./GroupList";
import TodaysDate from "./TodaysDate";
import { getLocalStorage } from "../../context/call-backs";
import { IGroupState } from './../../context/types';

interface IStatInfoDesktop {
  setStatistic: Dispatch<SetStateAction<IStatistic>>;
  statistic: IStatistic;
}

const StatInfoDesktop: React.FC<IStatInfoDesktop> = ({
  setStatistic,
  statistic,
}) => {

  const groupInfo: IGroupState = getLocalStorage("groupInfo", null)


  return (
    <div className="w-full flex flex-col mt-10">
      <div className='w-full flex justify-between items-center'>
      <Text
        type="h7"
        textEng={
          statistic === "myPosts"
            ? "My Posts"
            : statistic === "groupMembers"
            ? groupInfo.group_name + " - Members"
            : statistic === "groupPosts"
            ? groupInfo.group_name + " - Posts"
            : null
        }
        textKor={
          statistic === "myPosts"
            ? "본인 게시물"
            : statistic === "groupMembers"
            ? "그룹 멤머들"
            : statistic === "groupPosts"
            ? "그룹 게시물"
            : null
        }
      />
      <TodaysDate 
        notFull={true}
      />
      </div>

      <div className="w-full mt-10">
        {statistic === "myPosts" ? (
          <PostList statistic={statistic} />
        ) : statistic === "groupPosts" ? (
          <PostList statistic={statistic} />
        ) : statistic === "groupMembers" ? (
          <GroupList />
        ) : null}
      </div>
    </div>
  );
};

export default StatInfoDesktop;
