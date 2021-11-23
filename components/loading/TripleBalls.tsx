
import { motion } from 'framer-motion';

interface ITripleBalls {
    white?: boolean
}

const TripleBalls:React.FC<ITripleBalls> = ({white}) => {
    return (
<div className='flex'>
            <motion.span
                className={`h-2 w-2 rounded-full ${white ? "bg-white" : "bg-black"}`}
                animate={{y: [3, -3]}}
                transition={{repeat: Infinity, duration: 0.5, repeatType:"reverse", delay: 0.5}}
            />
                      <motion.span
                className={`h-2 w-2 rounded-full mx-2 ${white ? "bg-white" : "bg-black"}`}
                animate={{y: [3, -3]}}
                transition={{repeat: Infinity, duration: 0.5, repeatType:"reverse", delay: 0.65}}
            />
                      <motion.span
                className={`h-2 w-2 rounded-full ${white ? "bg-white" : "bg-black"}`}
                animate={{y: [3, -3]}}
                transition={{repeat: Infinity, duration: 0.5, repeatType:"reverse", delay: 0.8}}
            />

</div>
    )
}

export default TripleBalls
