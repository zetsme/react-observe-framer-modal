import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: { duration: 1 },
  },
};

const Modal = ({ handleClose, children }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className='modal bg-white pt-10'
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <motion.button
          className='absolute top-2 right-2 w-4 h-4 flex justify-center items-center'
          onClick={handleClose}
          whileHover={{ color: 'rgb(255,0,0)', scale: 2 }}
        >
          &times;
        </motion.button>
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
