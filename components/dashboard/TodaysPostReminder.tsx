import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import Button from "../reusables/Button";
import Text from "../reusables/Text";

interface ITodaysPostReminder {
  setShowPostForm: Dispatch<SetStateAction<boolean>>;
}

const TodaysPostReminder: React.FC<ITodaysPostReminder> = ({
  setShowPostForm,
}) => {

    const router = useRouter();
  const { messageState } = useContext(GlobalContext);

  return (
    <div className=" flex flex-col w-full px-6 py-6 border border-black items-center mb-10 md:flex-row md:justify-between">
      <div className="flex flex-col items-center md:w-7/12 xl:w-6/12 md:items-start">
        <Text
          type="h5"
          textEng="Today's Thanks"
          textKor="오늘의 감사"
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={
            messageState?.loadedMessage?.message === null
              ? "You've already posted today! Check out in what ways your group was thankful today!"
              : "You haven't posted today. Let's make sure to stay thankful with our daily posts!"
          }
          textKor={
            messageState?.loadedMessage?.message === null
              ? "오늘은 이미 게시했습니다! 나의 그룹이 오늘 어떤부분에서 감사했는지 몰까요?"
              : "오늘도 감사한 일상을 잊지말자!"
          }
          customStyles="text-gray-400 mb-5 md:mb-0"
        />
      </div>

      {messageState?.loadedMessage?.message === null ? (
        <Button
          onClick={() => router.push('/group')}
          textEng="Come Back Tomorrow!"
          textKor="그룹 보기"
          customStyles='md:w-4/12 bg-black text-white md:h-20 xl:h-16'
          disabled={true}
        />
      ) : (
        <Button
          onClick={() => setShowPostForm(true)}
          textEng="Get Started"
          textKor="시작하기"
          customStyles='md:w-4/12 bg-black text-white  md:h-20 xl:h-16'
        />
      )}
    </div>
  );
};

export default TodaysPostReminder;
