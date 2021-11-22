import { Dispatch, SetStateAction } from "react";
import LogoLink from "../brand/LogoLink";
import PostForm from "./PostForm";
import LanguageDropdown from "./../languageToggle/LanguageDropdown";
import { XIcon } from "@heroicons/react/outline";
import Text from "../reusables/Text";
import TodaysDate from "./TodaysDate";
import TodaysMessage from "./TodaysMessage";
import { motion } from "framer-motion";
import { PostModalDesktopVariant } from "../../motion";

interface IPostModalDesktop {
  setShowPostForm: Dispatch<SetStateAction<boolean>>;
  setShowPostSuccess: Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  showPostForm: boolean;
}

const PostModalDesktop: React.FC<IPostModalDesktop> = ({
  setShowPostSuccess,
  setShowPostForm,
  showPostForm,
  setShowErrorModal,
}) => {
    const closeModal = () => {
        setShowPostForm(false);
    }

  return (
    <div className="fixed right-0 top-0 w-screen max-h-screen h-screen z-50">
      <div className="w-full h-full flex px-10 py-10 relative justify-center items-center">
        {/* Backdrop */}
        <div
          className="h-full w-full fixed bg-black bg-opacity-60 "
          onClick={() => setShowPostForm(false)}
        />

        {/* Form Content */}
        <motion.div className=" flex flex-col h-full w-9/12 bg-white z-50 p-10 overflow-y-scroll lg:w-7/12 xl:w-5/12" 
        variants={PostModalDesktopVariant}
        initial='initial'
        animate='animate'>
          <div className="flex justify-between w-full mb-10">
            <button onClick={() => setShowPostForm(false)}>
              <XIcon className="text-black h-6 w-6" />
            </button>

            <LogoLink />

            <LanguageDropdown />
          </div>

          <div className="flex flex-col w-full mb-10">
          <Text
            type="h5"
            textEng="Daily Thanks"
            textKor="오늘의 감사"
            customStyles="mb-5"
          />
          <TodaysDate />
          <TodaysMessage />
        </div>

          <PostForm
            setShowPostSuccess={setShowPostSuccess}
            setShowErrorModal={setShowErrorModal}
            closeModal={closeModal}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PostModalDesktop;
