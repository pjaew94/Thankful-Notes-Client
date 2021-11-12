import Text from "./Text";
import { motion } from 'framer-motion';
import TripleBalls from './../loading/TripleBalls';

const FormSubmitButton: React.FC<{
  loading: boolean | undefined;
  value: string;
}> = ({ loading, value }) => {

  return (
    <motion.button
      className={`w-full flex justify-center items-center text-center text-white bg-hotPink rounded-md py-3 min-h-[60px] disabled:opacity-50`}
      type="submit"
      value={value}
      disabled={loading}
      whileHover={{backgroundColor: "#FF1D8E"}}
      whileTap={{scale: 0.95}}
    >
        
      {loading ? <TripleBalls /> : <Text type="button" textEng="Login" textKor="로그인" />}
    </motion.button>
  );
};

export default FormSubmitButton;
