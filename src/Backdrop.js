import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, transition: { duration: 1 } }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className='z-40 overflow-hidden fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80'
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
