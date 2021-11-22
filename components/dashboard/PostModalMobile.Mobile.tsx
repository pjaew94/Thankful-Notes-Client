import { motion, useAnimation } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { PostFormMobileVariant } from "../../motion";
import LanguageDropdown from "../languageToggle/LanguageDropdown";
import LogoLink from "../brand/LogoLink";
import Text from "../reusables/Text";
import TodaysDate from "./TodaysDate";
import TodaysMessage from "./TodaysMessage";
import PostForm from "./PostForm";
import Button from "../reusables/Button";
import { IShowFullPostState } from "../../pages/dashboard";

interface IPostModalMobile {
  setShowPostForm: Dispatch<SetStateAction<boolean>>;
  setShowPostSuccess: Dispatch<SetStateAction<boolean>>
  showPostForm: boolean;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  showErrorModal: boolean

}

const PostModalMobile: React.FC<IPostModalMobile> = ({
  setShowPostForm,
  showPostForm,
  setShowPostSuccess,
  setShowErrorModal,
  showErrorModal,

}) => {
  const controls = useAnimation();


  useEffect(() => {
    if (showPostForm === true) {
      controls.start("animate");
    }
  }, [showPostForm, controls]);

  const closeModal = async () => {
    controls.start("exit");
    setShowPostForm(false);
  };

  return (
    <motion.div
      className="fixed right-0 top-0 w-screen max-h-screen bg-white px-10 py-10 overflow-y-scroll z-50"
      variants={PostFormMobileVariant}
      initial="initial"
      animate={controls}
    >

      <div className="flex flex-col relative w-full">
        {showErrorModal && <PostFormErrorModal setShowErrorModal={setShowErrorModal} />}
        {/* Back button and language toggle */}
        <div className="flex justify-between w-full mb-10">
          <button onClick={() => closeModal()}>
            <ChevronLeftIcon className="text-black h-6 w-6" />
          </button>

          <LogoLink />

          <LanguageDropdown />
        </div>

        {/* Todays Message Info */}
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

        <PostForm setShowErrorModal={setShowErrorModal} closeModal={closeModal} setShowPostSuccess={setShowPostSuccess} />

        {/* Backdrop
        <div
        className="h-full w-full fixed bg-black bg-opacity-60 z-10"
        onClick={() => setShowPostForm(false)}
      /> */}
      </div>
    </motion.div>
  );
};


interface IPostFormErrorModal {
    setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  }
  
  const PostFormErrorModal: React.FC<IPostFormErrorModal> = ({
    setShowErrorModal,
  }) => {
    return (
      <div className="h-screen w-screen fixed bottom-0 left-0 flex justify-center items-center">
        <div
          className="h-full w-full fixed bg-black bg-opacity-60 "
          onClick={() => setShowErrorModal(false)}
        />
  
        <div className="w-3/4 min-h-[150px] bg-white z-10 rounded-md px-6 py-6 max-w-xs">
          <Text
            type="h4"
            textEng="There was an error. Please try again."
            textKor="오류가있었습니다. 다시 시도해 주세요."
            customStyles="mb-5"
          />
  
          <Button
            onClick={() => setShowErrorModal(false)}
            textEng="Close"
            textKor="닫기"
          ></Button>
        </div>
      </div>
    );
  };


  


export default PostModalMobile;
