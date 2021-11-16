import Text from "./Text";
import { motion } from 'framer-motion';
import TripleBalls from './../loading/TripleBalls';

const FormSubmitButton: React.FC<{
  loading: boolean | undefined;
  textEng: string;
  textKor: string;
  customStyles?: string
}> = ({ loading, textEng, textKor, customStyles}) => {

  return (
    <motion.button
      className={`w-full flex justify-center items-center text-center text-white bg-hotPink rounded-md py-3 min-h-[60px] disabled:opacity-50 ${customStyles}`}
      type="submit"
      disabled={loading}
      whileHover={{backgroundColor: "#FF1D8E"}}
      whileTap={{scale: 0.95}}
    >
        
      {loading ? <TripleBalls /> : <Text type="button" textEng={textEng} textKor={textKor} />}
    </motion.button>
  );
};

export default FormSubmitButton;
