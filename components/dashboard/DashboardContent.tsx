import {
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import TodaysPostReminder from "./TodaysPostReminder";
import PostModalMobile from "./PostModalMobile.Mobile";
import useResponsive from "../../hooks/useResponsive";
import Statistics from "./Statistics";
import { GlobalContext } from "../../context/Provider";
import StatInfoMobile from "./StatInfoMobile.Mobile";
import StatInfoDesktop from "./StatInfoDesktop";

export type IStatistic = "myPosts" | "groupMembers" | "groupPosts" | null;

interface IDashboardContent {
  setShowPostSuccess: Dispatch<SetStateAction<boolean>>;
  setShowPostForm: Dispatch<SetStateAction<boolean>>;
  showPostForm: boolean;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  showErrorModal: boolean;
}

const DashboardContent: React.FC<IDashboardContent> = ({
  setShowPostSuccess,
  setShowPostForm,
  showPostForm,
  setShowErrorModal,
  showErrorModal,
}) => {
  const [statistic, setStatistic] = useState<IStatistic>(null);
  const currentSize = useResponsive();

  const { authState } = useContext(GlobalContext);

  useEffect(() => {}, []);

  return (
    <div className={`flex flex-col w-full overflow-x-hidden z-10 xl:px-10 py-10 xl:h-screen overflow-y-scroll ${showPostForm && "md:overflow-y-hidden"}`}>
      {currentSize.isMobile && (
        <PostModalMobile
          setShowPostForm={setShowPostForm}
          showPostForm={showPostForm}
          setShowPostSuccess={setShowPostSuccess}
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
        />
      )}
      {currentSize.isMobile && (
        <StatInfoMobile setStatistic={setStatistic} statistic={statistic} />
      )}
      {/* Dashboard left field content */}
      <div className="flex flex-col w-full">
        <TodaysPostReminder setShowPostForm={setShowPostForm} />
        {authState?.user && <Statistics setStatistic={setStatistic} />}
        {!currentSize.isMobile && <StatInfoDesktop statistic={statistic} setStatistic={setStatistic}  />}
      </div>

      {/* Dashboard right field content */}
      <div className=""></div>
    </div>
  );
};

export default DashboardContent;
