import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { logout } from "../../context/actions/auth";
import { GlobalContext } from "../../context/Provider";
import Button from "../reusables/Button";
import Text from "../reusables/Text";

interface ILogoutWarning {
  setShowLogoutWarning: Dispatch<SetStateAction<boolean>>;
}

const LogoutWarning: React.FC<ILogoutWarning> = ({ setShowLogoutWarning }) => {
  const router = useRouter();

  const { authDispatch } = useContext(GlobalContext);

  const logoutFinal = async () => {

    await logout()(authDispatch);
    localStorage.removeItem("groupPosts");
    localStorage.removeItem("userPosts");
    router.reload();
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50">
      <div
        className="h-full w-full fixed bg-black bg-opacity-60 "
        onClick={() => setShowLogoutWarning(false)}
      />
      <div className="w-3/4 min-h-[150px] bg-white z-10  shadow-lg px-6 py-6 max-w-xs">
        <Text
          type="h4"
          textEng="Are you sure you want to logout?"
          textKor="로그아웃 하시겠습니까?"
          customStyles="mb-10"
        />

        <div className="flex w-full justify-between">
          <Button
            onClick={() => setShowLogoutWarning(false)}
            textEng="Stay"
            textKor="아니요"
            customStyles="bg-black text-white w-5/12 hover:scale-105"
          />
          <Button
            onClick={() => logoutFinal()}
            textEng="Logout"
            textKor="네"
            customStyles="bg-white text-black border border-black w-5/12 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutWarning;
