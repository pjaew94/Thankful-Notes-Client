import { useAnimation, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { PostFormMobileVariant } from "../../motion";
import { IShowFullPostState } from "../../pages/dashboard";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import LanguageDropdown from "./../languageToggle/LanguageDropdown";
import Text from "../reusables/Text";
import LogoLink from "../brand/LogoLink";
import { ClockIcon, IdentificationIcon } from "@heroicons/react/outline";

interface FullPostInfoMobile {
  setShowFullPost: Dispatch<SetStateAction<IShowFullPostState>>;
  showFullPost: IShowFullPostState;
}

const FullPostInfoMobile: React.FC<FullPostInfoMobile> = ({
  showFullPost,
  setShowFullPost,
}) => {
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
        className={`flex flex-col border border-black px-5 py-3 mb-8 w-full`}
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

      {/* 5 Thoughts */}
      <Text type="h6" textEng="Gratitude" textKor="감사" customStyles="mb-px" />
      <div className="flex flex-col w-full mt-6 px-5 py-5 bg-mint mb-10">
        <Text
          type="p"
          textEng={"1. " + showFullPost?.thought_on_verse1}
          textKor={"1. " + showFullPost?.thought_on_verse1}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={"2. " + showFullPost?.thought_on_verse2}
          textKor={"2. " + showFullPost?.thought_on_verse2}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={"3. " + showFullPost?.thought_on_verse3}
          textKor={"3. " + showFullPost?.thought_on_verse3}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={"4. " + showFullPost?.thought_on_verse4}
          textKor={"4. " + showFullPost?.thought_on_verse4}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={"5. " + showFullPost?.thought_on_verse5}
          textKor={"5. " + showFullPost?.thought_on_verse5}
        />
      </div>

      {/* 5 Thoughts */}
      <Text
        type="h6"
        textEng="Show Thanks"
        textKor="감사 표현"
        customStyles="mb-px"
      />
      <div className="flex flex-col w-full mt-6 px-5 py-5 bg-lightPurple mb-10">
        <Text
          type="p"
          textEng={"1. " + showFullPost?.show_thanks1}
          textKor={"1. " + showFullPost?.show_thanks1}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={"2. " + showFullPost?.show_thanks2}
          textKor={"2. " + showFullPost?.show_thanks2}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={"3. " + showFullPost?.show_thanks3}
          textKor={"3. " + showFullPost?.show_thanks3}
        />
      </div>
    </motion.div>
  );
};

export default FullPostInfoMobile;
