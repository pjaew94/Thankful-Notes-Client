import { Dispatch, SetStateAction, useContext } from "react";
import { motion } from "framer-motion";
import { GlobalContext } from './../../context/Provider';
import { showNav } from "../../context/actions/nav";

interface IHamburger {

}

const Hamburger: React.FC<IHamburger> = ({}) => {

  const {navDispatch} = useContext(GlobalContext)



  return (
    <motion.div
      className="flex flex-col justify-between w-5 h-4 cursor-pointer"
      onClick={() => showNav()(navDispatch)}
      whileTap={{ scale: 0.95 }}
    >
      <span className="bg-black h-1 w-full rounded-full" />
      <span className="bg-black h-1 w-full rounded-full" />
    </motion.div>
  );
};

export default Hamburger;
