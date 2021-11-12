
import { motion } from 'framer-motion';

const TripleBalls:React.FC = () => {
    return (
<>
            <motion.span
                className='h-2 w-2 bg-white rounded-full '
                animate={{y: [3, -3]}}
                transition={{repeat: Infinity, duration: 0.5, repeatType:"reverse"}}
            />
                      <motion.span
                className='h-2 w-2 bg-white rounded-full mx-2'
                animate={{y: [3, -3]}}
                transition={{repeat: Infinity, duration: 0.5, repeatType:"reverse", delay: 0.1}}
            />
                      <motion.span
                className='h-2 w-2 bg-white rounded-full '
                animate={{y: [3, -3]}}
                transition={{repeat: Infinity, duration: 0.5, repeatType:"reverse", delay: 0.2}}
            />

</>
    )
}

export default TripleBalls
