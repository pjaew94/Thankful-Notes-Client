import { motion } from "framer-motion";
import { NextPage } from "next";
import { useEffect } from "react";
import Text from "../../components/reusables/Text";
import Image from "next/image";
import PostSuccess from "./../../components/dashboard/PostSuccess";
import { PostSuccessVariant } from "./../../motion/index";
import { useRouter } from "next/router";

const Loading: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard')

    }, 2500);
  }, []);
  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-50 bg-white">
      <motion.div
        className="w-full h-full flex flex-col justify-center items-center"
        variants={PostSuccessVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Image
          src="/dashboardLoadingWoman.svg"
          height={300}
          width={200}
          alt="man with a puzzle for no reason"
          priority={true}
        />

        <Text type="h3" textEng="Welcome!" textKor="어서 오세요!" />
        <Text
          type="p"
          textEng="Sit back and relax while we're setting up for you!"
          textKor="준비하고 있습니다. 잠시만 기다려주세요."
          customStyles="text-gray-400 mt-2"
        />
      </motion.div>
    </div>
  );
};

export default Loading;
