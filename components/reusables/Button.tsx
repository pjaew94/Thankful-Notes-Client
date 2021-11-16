import Text from "./Text";
import { motion } from 'framer-motion';
interface IButton {
  onClick: () => void;
  textEng: string;
  textKor: string;
  customStyles?: string;
  disabled?: boolean;
}



const Button: React.FC<IButton> = ({
  onClick,
  textEng,
  textKor,
  customStyles,
  disabled
}) => {
  return (
    <motion.button
      className={`w-full flex justify-center items-center text-center ${!customStyles && "text-white bg-hotPink"} rounded-md py-3 min-h-[50px] disabled:opacity-50 ${customStyles}`}
      onClick={() => onClick()}
      disabled={disabled}
      whileTap={{scale: 0.95}}
    >
      <Text type="button" textEng={textEng} textKor={textKor} />
    </motion.button>
  );
};

export default Button;
