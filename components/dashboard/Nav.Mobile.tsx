import {
  ChevronLeftIcon,
  ViewBoardsIcon,
  UserGroupIcon,
  LogoutIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { useContext, useState } from "react";
import { hideNav } from "../../context/actions/nav";
import LogoLink from "../brand/LogoLink";
import { GlobalContext } from "./../../context/Provider";
import Text from "../reusables/Text";
import { useRouter } from "next/router";
import LogoutWarning from './../warnings/LogoutWarning';



const Nav: React.FC = () => {
  const router = useRouter();
  const { navState, navDispatch, authDispatch } = useContext(GlobalContext);

  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  const closeNav = async () => {
    hideNav()(navDispatch);
  };

  const navLinkClicked = async (route: string) => {
      await closeNav()
      router.push(route)
  };


  return (
    <div
      className={`flex w-screen h-screen fixed top-0 left-[-100vw] transition-all duration-500 ease-out overflow-x-hidden z-50 ${
        navState.show && "left-0"
      }`}
    >
        {showLogoutWarning && <LogoutWarning setShowLogoutWarning={setShowLogoutWarning} />}
      <div className="relative flex flex-col w-8/12 h-full bg-black px-10 py-10 md:pl-16 md:py-16 md:pr-8 shadow-2xl md:w-5/12 md:max-w-[280px]">
        {/* Logo and Back Button */}
        <div className="flex justify-between w-full mb-32">
          <LogoLink white={true} />
          <button onClick={() => closeNav()}>
            <ChevronLeftIcon className="text-white h-6 w-6" />
          </button>
        </div>

        {/* Dashboard/Group Links */}
        <div className="flex flex-col w-full">
          <button className="flex items-center mb-8" onClick={() => navLinkClicked('/dashboard')}>
            <ViewBoardsIcon
              className={`text-gray-400 h-5 w-5 mr-3  ${
                navState.value === "Dashboard" && "text-white"
              }`}
            />

            <Text
              type="nav"
              textEng="Dashboard"
              textKor="홈"
              customStyles={
                navState.value === "Dashboard" ? "text-white" : "text-gray-400"
              }
            />
          </button>
          <button className="flex items-center" onClick={() => navLinkClicked('/group')}>
            <UserGroupIcon
              className={`text-gray-400 h-5 w-5 mr-3  ${
                navState.value === "Group" && "text-white"
              }`}
            />

            <Text
              type="nav"
              textEng="Group"
              textKor="그룹"
              customStyles={
                navState.value === "Group" ? "text-white" : "text-gray-400"
              }
            />
          </button>
        </div>
        
    

        {/* Settings Link */}
        <div className="w-full  mt-auto">
          <button className="flex items-center mb-8" onClick={() => navLinkClicked('/settings')}>
            <CogIcon
              className={`text-gray-400 h-5 w-5 mr-3  ${
                navState.value === "Settings" && "text-white"
              }`}
            />

            <Text
              type="nav"
              textEng="Settings"
              textKor="설정"
              customStyles={
                navState.value === "Settings" ? "text-white" : "text-gray-400"
              }
            />
          </button>
          <button className="flex items-center" onClick={() => setShowLogoutWarning(true)}>
            <LogoutIcon className={`text-gray-400 h-5 w-5 mr-3`} />

            <Text
              type="nav"
              textEng="Logout"
              textKor="로그 아웃"
              customStyles={"text-gray-400"}
            />
          </button>
        </div>
      </div>

      <div
        className="w-4/12 h-full bg-transparent"
        onClick={() => closeNav()}
      />
    </div>
  );
};

export default Nav;
