import {
    ViewBoardsIcon,
    UserGroupIcon,
    LogoutIcon,
    CogIcon,
  } from "@heroicons/react/outline";
  import { useContext, useState } from "react";
  import LogoLink from "../brand/LogoLink";
  import { GlobalContext } from "./../../context/Provider";
  import Text from "../reusables/Text";
  import { useRouter } from "next/router";
  import LogoutWarning from './../warnings/LogoutWarning';
  
  
  const NavDesktop: React.FC = () => {
    const router = useRouter();
    const { navState } = useContext(GlobalContext);
  
    const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  

  
    const navLinkClicked = async (route: string) => {
        router.push(route)
    };
  
  
    return (
      <div
        className={`flex w-full h-screen md:w-5/12 lg:w-3/12 xl:w-2/12`}
      >
          {showLogoutWarning && <LogoutWarning setShowLogoutWarning={setShowLogoutWarning} />}
        <div className="relative flex flex-col w-full h-full bg-black px-10 py-10 xl:px-16 xl:py-16" >
          {/* Logo and Back Button */}
          <div className="flex w-full mb-32">
            <LogoLink white={true} />
          </div>
  
          {/* Dashboard/Group Links */}
          <div className="flex flex-col w-full">
            <button className="flex items-center mb-8 lg:hover:scale-110" onClick={() => navLinkClicked('/dashboard')}>
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
            <button className="flex items-center lg:hover:scale-110" onClick={() => navLinkClicked('/group')}>
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
          <div className="w-full  mt-auto ">
            <button className="flex items-center mb-8 lg:hover:scale-110" onClick={() => navLinkClicked('/settings')}>
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
            <button className="flex items-center lg:hover:scale-110" onClick={() => setShowLogoutWarning(true)}>
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
      </div>
    );
  };
  
  export default NavDesktop;
  