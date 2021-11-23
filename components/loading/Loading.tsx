
import { motion } from "framer-motion";
import { fadeUpVariant } from "./../../motion/index";


import Image from "next/image";
import Text from "../reusables/Text";
import useResponsive from './../../hooks/useResponsive';
import TripleBalls from './TripleBalls';

const Loading: React.FC = () => {

  const currentSize = useResponsive();

  return (
    <motion.div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100">

      <motion.div
        className="relative flex flex-col justify-end items-center pb-10 md:w-7/12"
        variants={fadeUpVariant}
        initial="initial"
        animate="animate"
      >

            <div className='absolute -top-20'><TripleBalls /></div>

              
        <div className=" flex justify-center">

          <Image
            src="/homeLoadingManWoman.svg"
            height={currentSize.isDesktop || currentSize.is4k ? 280 : 180}
            width={currentSize.isDesktop || currentSize.is4k ? 280 : 180}
            alt="man with a puzzle for no reason"
          />
  
        </div>
        <Text type="h3" textEng="Welcome!" textKor="어서 오세요!" customStyles='mt-10' />
        <Text
          type="p"
          textEng="Glad you're joining us in Thankful Notes!"
          textKor="준비하고 있습니다. 잠시만 기다려주세요."
          customStyles="text-gray-400 mt-2"
        />
         <Text
          type="p"
          textEng="You will be directed shortly!"
          textKor="준비하고 있습니다. 잠시만 기다려주세요."
          customStyles="text-gray-400"
        />



      </motion.div>
    </motion.div>
  );
};

export default Loading;
