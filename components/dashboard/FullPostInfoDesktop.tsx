import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { PostModalDesktopVariant } from "../../motion";
import { IShowFullPostState } from "../../pages/dashboard";
import LogoLink from "../brand/LogoLink";
import Text from "../reusables/Text";
import LanguageDropdown from "./../languageToggle/LanguageDropdown";
import { ClockIcon, IdentificationIcon, XIcon } from "@heroicons/react/outline";
import Button from "../reusables/Button";

interface FullPostInfoDesktop {
  setShowFullPost: Dispatch<SetStateAction<IShowFullPostState>>;
  showFullPost: IShowFullPostState;
}

const FullPostInfoDesktop: React.FC<FullPostInfoDesktop> = ({
  setShowFullPost,
  showFullPost,
}) => {
  const today = new Date();
  const date: number = today.getDate();
  const month: number = today.getMonth();
  const year: number = today.getFullYear();
  const todaysDate = year + "-" + (month + 1) + "-" + date;

  const dateModified = showFullPost?.date_posted?.slice(0, 10);

  const dateChecked = dateModified === todaysDate ? "Today" : dateModified;

  return (
    <div className="fixed right-0 top-0 w-screen max-h-screen h-screen z-50">
      <div className="w-full h-full flex px-10 py-10 relative justify-center items-center">
        {/* Backdrop */}
        <div
          className="h-full w-full fixed bg-black bg-opacity-60 "
          onClick={() => setShowFullPost(null)}
        />

        <motion.div
          className=" flex flex-col h-full w-9/12 bg-white z-50 p-10 overflow-y-scroll lg:w-7/12 xl:w-5/12"
          variants={PostModalDesktopVariant}
          initial="initial"
          animate="animate"
        >
          {/*  Header*/}
          <div className="flex justify-between w-full mb-10">
            <button onClick={() => setShowFullPost(null)}>
              <XIcon className="text-black h-6 w-6" />
            </button>
            <LogoLink />
            <LanguageDropdown />
          </div>

          {/* Author and the Post time */}
          <div
            className={`flex justify-center border border-black px-5 py-3 mb-8 w-full`}
          >
            <div className="flex items-center mr-5">
              <IdentificationIcon className="text-black h-4 w-4 mr-2" />

              <Text
                type="h4"
                textEng={
                  showFullPost?.first_name + " " + showFullPost?.last_name
                }
                textKor={
                  showFullPost?.first_name + " " + showFullPost?.last_name
                }
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
          <Text
            type="h6"
            textEng="Gratitude"
            textKor="감사"
            customStyles="mb-px"
          />
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

          <Button 
        onClick={() => setShowFullPost(null)}
        textEng='Close'
        textKor='닫기'
      />
      
        </motion.div>
      </div>
    </div>
  );
};

export default FullPostInfoDesktop;
