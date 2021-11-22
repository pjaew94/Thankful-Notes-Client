import { Dispatch, useContext, useState, SetStateAction } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { GlobalContext } from "../../context/Provider";
import Text from "../reusables/Text";
import TextareaAutoSize from "react-textarea-autosize";
import FormSubmitButton from "../reusables/FormSubmitButton";
import { Switch } from "@headlessui/react";
import { createPost } from "../../context/call-backs";
import { clearTodaysMessage } from "../../context/actions/todaysMessage";
import { getUserPosts, getGroupPosts } from './../../context/actions/posts';
import { loadUser } from './../../context/actions/auth';

interface IPostFormFC {
  setShowErrorModal: Dispatch<SetStateAction<boolean>>
  setShowPostSuccess: Dispatch<SetStateAction<boolean>>
  closeModal: () => void
}
export interface IPostForm {
  thought_on_verse1: string;
  thought_on_verse2: string;
  thought_on_verse3: string;
  thought_on_verse4: string;
  thought_on_verse5: string;
  show_thanks1: string;
  show_thanks2: string;
  show_thanks3: string;
  is_private: boolean;
}

interface IPostFormField {
  register: UseFormRegister<IPostForm>;
  step: "1." | "2." | "3." | "4." | "5.";
  field:
    | "thought_on_verse1"
    | "thought_on_verse2"
    | "thought_on_verse3"
    | "thought_on_verse4"
    | "thought_on_verse5"
    | "show_thanks1"
    | "show_thanks2"
    | "show_thanks3"
    | "is_private";
}

interface IPostFormPrivateToggle {
  isPrivate: boolean;
  setIsPrivate: Dispatch<SetStateAction<boolean>>;
}

const PostForm: React.FC<IPostFormFC> = ({setShowErrorModal, closeModal, setShowPostSuccess}) => {
  const { messageState, authState, postsDispatch, authDispatch, messageDispatch } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>();

  const onSubmit = async (data: IPostForm) => {
    setIsLoading(true);

    const finalData = {
      ...data,
      is_private: isPrivate,
      message: messageState?.loadedMessage?.message,
      message_kor: messageState?.loadedMessage?.message_kor,
      book: messageState?.loadedMessage?.book,
      book_kor: messageState?.loadedMessage?.book_kor,
      chapter_and_verse: messageState?.loadedMessage?.chapter_and_verse,
    };


    const res = await createPost(finalData);

    const getPosts = async() => {
      await loadUser()(authDispatch)
      await getUserPosts(authState!.user!.username)(postsDispatch);
      await getGroupPosts(authState!.user!.group_id!)(postsDispatch);
    }


    if (res === "success") {
      await getPosts()
      await clearTodaysMessage()(messageDispatch);
      setShowPostSuccess(true)

        closeModal() 
      
      setTimeout(( ) => {
        setShowPostSuccess(false)
      }, 3000)
    }
    if (res === "error") {
      console.log('hit');
      setShowErrorModal(true)
    }

    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col w-full relative "
      onSubmit={handleSubmit(onSubmit)}
    >
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
        textEng="Post"
        textKor="포스트"
        black={true}
        customStyles="mt-16"
      />
    </form>
  );
};









const PostFormField: React.FC<IPostFormField> = ({ register, step, field }) => {
  return (
    <div className="flex w-full items-start mb-5">
      <Text type="p" textEng={step} textKor={step} customStyles="py-1 mr-4" />
      <TextareaAutoSize
        className="px-3 py-1 bg-transparent text-sm border-b-[1px] border-gray-300 text-black font-serif focus:outline-none focus:border-black  focus:ring-black resize-none w-full"
        {...register(field, {
          required: "You must include at least 5 thanks from today.",
        })}
        name={field}
      />
    </div>
  );
};

const PostFormPrivateToggle: React.FC<IPostFormPrivateToggle> = ({
  setIsPrivate,
  isPrivate,
}) => {
  return (
    <div className="flex flex-col w-full mt-10">
      <div className="flex items-center">
        <Text type="h6" textEng="Private" textKor="사적" customStyles="mr-6" />
        <Switch
          checked={isPrivate}
          onChange={setIsPrivate}
          className={`${
            isPrivate ? "bg-black" : "bg-gray-400"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Set Private</span>
          <span
            className={`${
              isPrivate ? "translate-x-1" : "translate-x-6"
            } inline-block w-4 h-4 transform bg-white rounded-full transition duration-500 ease-in-out`}
          />
        </Switch>
      </div>
      <Text
        type="p"
        textEng="Toggling this will only allow you to see the post."
        textKor="토글하면 이 게시물은 개인만 볼수있습니다."
        customStyles="text-gray-400"
      />
    </div>
  );
};


export default PostForm;
