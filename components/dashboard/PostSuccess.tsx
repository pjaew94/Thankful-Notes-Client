import { motion } from "framer-motion";
import Image from "next/image";
import { PostSuccessVariant } from "../../motion";
import Text from "../reusables/Text";

const PostSuccess: React.FC = () => {
  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-50 bg-white">
      <motion.div
      className='w-full h-full flex flex-col justify-center items-center'
        variants={PostSuccessVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Image
          src="/man-puzzle.svg"
          height={300}
          width={200}
          alt="man with a puzzle for no reason"
          priority={true}
        />

        <Text type="h3" textEng="Success!" textKor="성공!" />
        <Text
          type="p"
          textEng="You've submitted your post for today! "
          textKor="오늘의 감사들을 올렸습니다"
          customStyles="text-gray-400 mt-2"
        />
        <Text
          type="p"
          textEng="Please wait while you're being directed back."
          textKor="돌아오는 동안 잠시만 기다려 주십시오."
          customStyles="text-gray-400"
        />
      </motion.div>
    </div>
  );
};

export default PostSuccess;
