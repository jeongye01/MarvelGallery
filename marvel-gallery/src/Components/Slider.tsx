import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { wrap } from 'popmotion';
import { useQuery } from 'react-query';
import { getComics } from '../Api';
const SSlider = styled.div`
  background-color: white;
  border-top: 5px solid black;
  border-bottom: 5px solid black;
  height: 200px;
  display: flex;
  position: relative;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  //height: 100%;
`;
const Box = styled(motion.div)`
  font-size: 64px;
  color: red;
  padding: 5px;
  img {
    box-shadow: 0 1px 15px -7.5px #000000;
    width: 100%;
    height: 180px;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Category = styled.div`
  padding: 5px;
  margin-left: 30px;
  font-size: 25px;
  font-family: 'Bangers', cursive;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: gray;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigComic = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const rowVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? window.outerWidth : -window.outerWidth,
    };
  },
  center: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? window.outerWidth : -window.outerWidth,
    };
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

interface Iprops {
  data: [
    {
      id: number;
      thumbnail: { path: string; extension: string };
      title: string;
      description: string;
    },
  ];
}

//한번에 보여주고 싶은 contents 수
const contents = 6;
function Slider({ data }: Iprops) {
  const history = useHistory();
  const [[page, direction], setPage] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);
  const onBoxClicked = (comicId: number) => {
    history.push(`/${comicId}`);
  };
  const onOverlayClick = () => history.push('/');

  const paginate = (newDirection: number) => {
    if (leaving) return;
    setLeaving((prev) => !prev);
    let newPage = page + newDirection;
    const MaxPage = Math.floor(data.length / contents) - 1;
    console.log(page, newDirection);
    if (newPage < 0) {
      newPage = MaxPage;
    } else if (newPage > MaxPage) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };
  return (
    <>
      <Category>
        Comics<button onClick={() => paginate(1)}>&larr;</button>
        <button onClick={() => paginate(-1)}>&rarr;</button>
      </Category>

      <SSlider>
        <AnimatePresence initial={false} custom={direction} onExitComplete={() => setLeaving((prev) => !prev)}>
          <Row
            variants={rowVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', duration: 1 },
            }}
            key={page}
          >
            {data?.slice(contents * (page || 0), contents * (page || 0) + contents).map((comic: any) => (
              <Box
                layoutId={comic.id + ''}
                onClick={() => onBoxClicked(comic.id)}
                key={comic.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                transition={{ type: 'tween' }}
              >
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
              </Box>
            ))}
          </Row>
        </AnimatePresence>
      </SSlider>
    </>
  );
}

export default Slider;
