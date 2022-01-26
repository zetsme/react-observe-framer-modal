import { useState } from 'react';

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => {
    document.body.style.overflowY = 'visible';

    setModalOpen(false);
  };
  const open = () => {
    document.body.style.overflowY = 'hidden';
    setModalOpen(true);
  };
  return { modalOpen, close, open };
};

export default useModal;
