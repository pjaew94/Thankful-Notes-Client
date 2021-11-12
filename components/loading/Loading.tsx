import Logo from "../brand/Logo";
import Brand from "./../brand/Brand";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./../../motion/index";
import BouncyBall from "./BouncyBall";

const Loading: React.FC = () => {
  return (
    <motion.div
      className="h-screen w-screen flex bg-pink justify-center items-center"
      exit={{
        background: "white",
        transition: { type: "spring", duration: 0.8, bounce: 0 },
      }}
    >
      <motion.div
        className="flex justify-between flex-col items-center relative"
        variants={fadeUpVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <BouncyBall />
        <Logo size="large" />
        <Brand />
      </motion.div>
    </motion.div>
  );
};

export default Loading;
