import styled from 'styled-components';
import React from 'react';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { wrap } from 'popmotion';
import { useQuery } from 'react-query';
import { getComics } from '../Api';
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//<i class="fa-solid fa-circle-chevron-right"></i>

const Header = styled.header`
  display: flex;
  padding: 5px;
  margin-left: 30px;
  h2 {
    font-size: 35px;
    font-family: 'Bangers', cursive;
  }
  button {
    all: unset;
    margin-left: 15px;
    font-size: 25px;
    cursor: pointer;
  }
`;
const SSlider = styled.div`
  background-color: white;
  border-top: 5px solid black;
  border-bottom: 5px solid black;
  height: 200px;
  display: flex;
  position: relative;
  margin-bottom: 25px;
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
  padding: 5px 0;
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

const Info = styled(motion.div)`
  background-color: black;
  color: white;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 40%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 16px;
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
  category: string;
  data: [
    {
      id: number;
      thumbnail: { path: string; extension: string };
      title?: string;
      firstName?: string;
      name?: string;
      description: string;
    },
  ];
}

//한번에 보여주고 싶은 contents 수
const contents = 6;
function Slider({ data, category }: Iprops) {
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
      <Header>
        <h2>{category}</h2>
        <button onClick={() => paginate(1)}>
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button onClick={() => paginate(-1)}>
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </Header>
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
            {data?.slice(contents * (page || 0), contents * (page || 0) + contents).map((element: any) => (
              <Box
                layoutId={element.id + ''}
                onClick={() => onBoxClicked(element.id)}
                key={element.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                transition={{ type: 'tween' }}
              >
                <img src={`${element.thumbnail.path}.${element.thumbnail.extension}`} />

                <Info variants={infoVariants}>
                  <h4>{element.title || element.name || element.firstName}</h4>
                </Info>
              </Box>
            ))}
          </Row>
        </AnimatePresence>
      </SSlider>
    </>
  );
}

export default React.memo(Slider);
