import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import useModal from './useModal';
import useObserve from './useObserve';

const App = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);

  const initialFetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`);
      const data = await res.json();
      if (data?.length) {
        setPosts((prev) => {
          if (prev?.length) {
            return [...prev, ...data];
          } else {
            return data;
          }
        });
      } else {
        setMore(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    initialFetchPosts(page);
  }, [page]);

  const { setObservingElement } = useObserve(() => setPage((prev) => prev + 1));

  const { modalOpen, close, open } = useModal();

  const [openPost, setOpenPost] = useState(null);

  const openModal = (postId) => {
    open();
    setOpenPost(posts.find((i) => i.id === postId));
  };

  const closeModal = () => {
    close();
    setOpenPost(null);
  };

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modalOpen && (
          <Modal handleClose={closeModal}>
            <h1>Some random Text to test</h1>
            <h2>
              {openPost.id} - {openPost.title}
            </h2>
            <p>{openPost.body}</p>
          </Modal>
        )}
      </AnimatePresence>

      <div className='p-4 '>
        {posts?.length && (
          <div>
            <ul className='flex flex-col gap-4'>
              {posts.map((post) => (
                <li key={post.id} className='flex justify-between border-2 bg-white'>
                  <p>
                    {post.id.toString().padStart(2, 0)} - {post.title}
                  </p>
                  <motion.button
                    whileHover={{ scaleX: 1.2, duration: 0.5 }}
                    onClick={() => openModal(post.id)}
                    className='p-2 bg-cyan-500 whitespace-nowrap origin-right '
                  >
                    Show More
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {loading && <h3>Loading</h3>}
        {!loading && more && <hr ref={setObservingElement} />}
      </div>
    </>
  );
};
export default App;
