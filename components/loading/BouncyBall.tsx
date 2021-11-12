
import { motion } from 'framer-motion';

const BouncyBall: React.FC = () => {


    return (
        <motion.div 
        className=" h-3 w-3 bg-red absolute left-1/2 -top-5 rounded-full 3xl:h-6 3xl:w-6"
            animate={{y: -30, background: "#478D4F"}}
            transition={{repeat: Infinity, duration: 1, repeatType:"reverse"}}
        />


        
    )
}

export default BouncyBall
