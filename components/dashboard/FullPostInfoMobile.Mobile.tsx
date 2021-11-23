import { useAnimation, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostFormMobileVariant } from "../../motion";
import { IShowFullPostState } from "../../pages/dashboard";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import LanguageDropdown from "./../languageToggle/LanguageDropdown";
import Text from "../reusables/Text";
import LogoLink from "../brand/LogoLink";
import { ClockIcon, IdentificationIcon, PencilIcon } from "@heroicons/react/outline";
import { PostEditForm, ShowPost } from './FullPostInfoDesktop';

interface FullPostInfoMobile {
  setShowFullPost: Dispatch<SetStateAction<IShowFullPostState>>;
  showFullPost: IShowFullPostState;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>
}

const FullPostInfoMobile: React.FC<FullPostInfoMobile> = ({
  showFullPost,
  setShowFullPost,
  setShowErrorModal
}) => {
  const [editMode, setEditMode] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    if (showFullPost !== null) {
      controls.start("animate");
    }
  }, [showFullPost, controls]);

  const closeModal = async () => {
    controls.start("exit");
    setTimeout(() => {
      setShowFullPost(null);
    }, 500);
  };

  const today = new Date();
  const date: number = today.getDate();
  const month: number = today.getMonth();
  const year: number = today.getFullYear();
  const todaysDate = year + "-" + (month + 1) + "-" + date;

  const dateModified = showFullPost?.date_posted?.slice(0, 10);

  const dateChecked = dateModified === todaysDate ? "Today" : dateModified;

 

  return (
    <motion.div
      className=" flex flex-col fixed right-0 top-0 w-screen h-screen max-h-screen bg-white px-10 py-10 overflow-y-scroll z-50"
      variants={PostFormMobileVariant}
      initial="initial"
      animate={controls}
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-10">
        <button onClick={() => closeModal()}>
          <ChevronLeftIcon className="text-black h-6 w-6" />
        </button>
        <LogoLink />
        <LanguageDropdown />
      </div>

      {/* Author and the Post time */}
      <div
        className={`relative flex flex-col border border-black px-5 py-3 mb-8 w-full`}
      >
        <div className="flex items-center">
          <IdentificationIcon className="text-black h-4 w-4 mr-2" />

          <Text
            type="h4"
            textEng={showFullPost?.first_name + " " + showFullPost?.last_name}
            textKor={showFullPost?.first_name + " " + showFullPost?.last_name}
          />
        </div>
        <div className="flex items-center">
          <ClockIcon className="text-black h-4 w-4 mr-2" />
          <Text type="h4" textEng={dateChecked} textKor={dateChecked} />
        </div>
        <button className='flex absolute right-5 items-center lg:hover:scale-105' onClick={() => setEditMode(!editMode)}>
                <PencilIcon className="text-black h-4 w-4 mr-2" />
                <Text type='h4' textEng='Edit' textKor='편집' />
            </button>
      </div>

      {/* Message */}
      <div className="flex w-full flex-col mb-10">
        <Text
          type="h6"
          textEng="Message of Post"
          textKor="포스트의 메시지"
          customStyles="mb-5"
        />
        <div className="flex flex-col p-5 bg-pink">
          <Text
            type="p"
            textEng={showFullPost?.message}
            textKor={showFullPost?.message_kor}
            customStyles=""
          />
          <div className="flex justify-end items-center mt-3">
            <Text
              type="p"
              textEng={showFullPost?.book}
              textKor={showFullPost?.book_kor}
              customStyles="mr-2 text-gray-400"
            />
            <Text
              type="p"
              textEng={showFullPost?.chapter_and_verse}
              textKor={showFullPost?.chapter_and_verse}
              customStyles="text-gray-400"
            />
          </div>
        </div>
      </div>

      {editMode ? (
            <PostEditForm
            setShowErrorModal={setShowErrorModal}
              showFullPost={showFullPost}
              setShowFullPost={setShowFullPost}
            />
          ) : (
            <ShowPost
              setShowErrorModal={setShowErrorModal}
              showFullPost={showFullPost}
              setShowFullPost={setShowFullPost}
            />
          )}
    </motion.div>
  );
};

export default FullPostInfoMobile;
