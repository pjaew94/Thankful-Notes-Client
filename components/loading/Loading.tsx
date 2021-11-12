import Logo from "../brand/Logo";
import Brand from "./../brand/Brand";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./../../motion/index";
import BouncyBall from "./BouncyBall";

const Loading: React.FC = () => {
  return (
    <div className="h-screen w-screen flex bg-pink justify-center items-center">
      <motion.div
        className="flex justify-between flex-col items-center relative"
        variants={fadeUpVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <BouncyBall />
        <Logo />
        <Brand />
      </motion.div>
    </div>
  );
};

export default Loading;
