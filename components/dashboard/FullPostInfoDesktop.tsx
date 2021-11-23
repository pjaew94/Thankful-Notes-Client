import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { PostModalDesktopVariant } from "../../motion";
import { IShowFullPostState } from "../../pages/dashboard";
import LogoLink from "../brand/LogoLink";
import Text from "../reusables/Text";
import LanguageDropdown from "./../languageToggle/LanguageDropdown";
import { ClockIcon, IdentificationIcon, XIcon, PencilIcon } from "@heroicons/react/outline";
import Button from "../reusables/Button";
import { useForm } from "react-hook-form";
import { IPostForm, PostFormField, PostFormPrivateToggle } from "./PostForm";
import FormSubmitButton from "./../reusables/FormSubmitButton";
import { loadUser } from './../../context/actions/auth';
import { getUserPosts , getGroupPosts} from './../../context/actions/posts';
import { clearTodaysMessage } from "../../context/actions/todaysMessage";
import { GlobalContext } from './../../context/Provider';
import { editPost } from "../../context/call-backs";

interface FullPostInfoDesktop {
  setShowFullPost: Dispatch<SetStateAction<IShowFullPostState>>;
  showFullPost: IShowFullPostState;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>
}

const FullPostInfoDesktop: React.FC<FullPostInfoDesktop> = ({
  setShowFullPost,
  showFullPost,
  setShowErrorModal
}) => {
  const [editMode, setEditMode] = useState(false);
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
            className={`relative flex justify-center border border-black px-5 py-3 mb-8 w-full`}
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
      </div>
    </div>
  );
};

export const PostEditForm: React.FC<FullPostInfoDesktop> = ({
  showFullPost,
  setShowFullPost,
  setShowErrorModal
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({
    defaultValues: {
      thought_on_verse1: showFullPost!.thought_on_verse1!,
      thought_on_verse2: showFullPost!.thought_on_verse2!,
      thought_on_verse3: showFullPost!.thought_on_verse3!,
      thought_on_verse4: showFullPost!.thought_on_verse4!,
      thought_on_verse5: showFullPost!.thought_on_verse5!,
      show_thanks1: showFullPost!.show_thanks1!,
      show_thanks2: showFullPost!.show_thanks2!,
      show_thanks3: showFullPost!.show_thanks3!
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(showFullPost?.is_private!);

  const {authState, postsDispatch, authDispatch} = useContext(GlobalContext)

  const onSubmit = async (data: IPostForm) => {
        setIsLoading(true);
        const finalData = {
          ...data,
          is_private: isPrivate
        };



        const res = await editPost(finalData, showFullPost!.id!)

        if (res === "success") {
          setShowFullPost(null)
        } else (
          setShowErrorModal(true)
        )

        setIsLoading(false);
  };

  useEffect(() => {
    const getPosts = async() => {
      await loadUser()(authDispatch)
      await getUserPosts(authState!.user!.username)(postsDispatch);
      await getGroupPosts(authState!.user!.group_id!)(postsDispatch);
    }

    return function cleanup() {
      getPosts()
    }
  })

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <Text
        type="h6"
        textEng="Today's Thanks"
        textKor="오늘의 감사"
        customStyles="mb-px"
      />
      <Text
        type="p"
        textEng="What are 5 things you were thankful for today?"
        textKor="오늘은 다섯가지 감사한게 무엇이있었습니까?"
        customStyles=" text-gray-400"
      />

      <div className="flex flex-col w-full mt-6 px-5 py-5 bg-lightPurple">
        <PostFormField
          register={register}
          step="1."
          field="thought_on_verse1"
        />
        <PostFormField
          register={register}
          step="2."
          field="thought_on_verse2"
        />
        <PostFormField
          register={register}
          step="3."
          field="thought_on_verse3"
        />
        <PostFormField
          register={register}
          step="4."
          field="thought_on_verse4"
        />
        <PostFormField
          register={register}
          step="5."
          field="thought_on_verse5"
        />
      </div>
      {errors.thought_on_verse1 ||
      errors.thought_on_verse2 ||
      errors.thought_on_verse3 ||
      errors.thought_on_verse4 ||
      errors.thought_on_verse5 ? (
        <Text
          type="p"
          textEng="*Make sure to include all 5 fields!"
          textKor="*5개의 필드를 모두 포함해야 합니다!"
          customStyles="text-red-400"
        />
      ) : null}

      <Text
        type="h6"
        textEng="Show Gratitude"
        textKor="감사의 표시"
        customStyles="mb-px mt-10"
      />
      <Text
        type="p"
        textEng="In what 3 ways did you show your gratitude today?"
        textKor="오늘 감사를 표현한 3가지 방법은?"
        customStyles=" mb-6 text-gray-400"
      />

      <div className="flex flex-col w-full px-5 py-5 bg-mint">
        <PostFormField register={register} step="1." field="show_thanks1" />
        <PostFormField register={register} step="2." field="show_thanks2" />
        <PostFormField register={register} step="3." field="show_thanks3" />
      </div>
      {errors.show_thanks1 || errors.show_thanks2 || errors.show_thanks3 ? (
        <Text
          type="p"
          textEng="*Make sure to include all 3 fields!"
          textKor="*3개의 필드를 모두 포함해야 합니다!"
          customStyles="text-red-400"
        />
      ) : null}

      <PostFormPrivateToggle
        setIsPrivate={setIsPrivate}
        isPrivate={isPrivate}
      />

      <FormSubmitButton
        loading={isLoading}
        textEng="Edit Post"
        textKor="포스트 편집"
        black={true}
        customStyles="mt-16"
      />
    </form>
  );
};

export const ShowPost: React.FC<FullPostInfoDesktop> = ({
  showFullPost,
  setShowFullPost,
}) => {
  return (
    <>
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

      <Button
        onClick={() => setShowFullPost(null)}
        textEng="Close"
        textKor="닫기"
      />
    </>
  );
};
export default FullPostInfoDesktop;
