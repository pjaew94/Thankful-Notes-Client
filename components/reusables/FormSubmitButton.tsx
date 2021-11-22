import Text from "./Text";
import { motion } from "framer-motion";
import TripleBalls from "./../loading/TripleBalls";

const FormSubmitButton: React.FC<{
  loading: boolean | undefined;
  textEng: string;
  textKor: string;
  customStyles?: string;
  black?: boolean;
}> = ({ loading, textEng, textKor, customStyles, black }) => {
  return (
    <motion.button
      className={`w-full flex justify-center items-center text-center ${
        black ? "bg-black" : "bg-hotPink"
      } text-white  py-3 min-h-[60px] disabled:opacity-50 ${customStyles}`}
      type="submit"
      disabled={loading}
      whileHover={{ backgroundColor: "gray" }}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? (
        <TripleBalls />
      ) : (
        <Text type="button" textEng={textEng} textKor={textKor} />
      )}
    </motion.button>
  );
};

export default FormSubmitButton;
