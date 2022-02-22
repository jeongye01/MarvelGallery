import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #eee;
  /* center the content in the page (mainly horizontally) */
  display: grid;
  place-items: center;
  /* include the same texture used for the .bubble containers, but with notably less opacity */
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(0)" opacity="0.2" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g  fill="%23250E17"><circle cx="25" cy="25" r="12.5"/><circle cx="75" cy="75" r="12.5"/><circle cx="75" cy="25" r="12.5"/><circle cx="25" cy="75" r="12.5"/></g></svg>'),
    white;
  background-size: 10px, 100%;
`;
const Banner = styled.div`
  padding: 100px;
  margin-top: 30px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 500px;

  div:first-child {
    img {
    }
  }
  div:last-child {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    //position: relative;
    margin-bottom: 50px;
    height: 100%;
    //align-items: flex-start;
    span {
      font-weight: 600;
      font-size: 40px;
      margin-bottom: 60px;
    }
  }
`;
const Slider = styled.div`
  position: relative;
  background-color: black;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)`
  background-color: black;
  height: 200px;
  font-size: 64px;
  color: red;
  img {
    width: 100%;
    height: 100%;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
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
  width: 100%;
  height: 100%;
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
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
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
//한번에 보여주고 싶은 contents 수
const offset = 6;
function Home() {
  const history = useHistory();
  const comicMatch = useRouteMatch<{ comicId: string }>('/:comicId');
  const { data, isLoading } = useQuery(['comics', '1'], getComics);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useViewportScroll();
  const onBoxClicked = (comicId: number) => {
    history.push(`/${comicId}`);
  };
  const onOverlayClick = () => history.push('/');
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const maxIndex = Math.floor(data.length / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Banner onClick={incraseIndex}>
            <div>
              <img src={`${data[1].thumbnail.path}/portrait_incredible.${data[1].thumbnail.extension}`} />
            </div>
            <div>
              <span>{data[1].title}</span>
              <p>{data[1].description.substr(0, 200)}.....자세히 보기</p>
            </div>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {data?.slice(offset * index, offset * index + offset).map((comic: any) => (
                  <Box
                    layoutId={comic.id + ''}
                    onClick={() => onBoxClicked(comic.id)}
                    key={comic.id}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    transition={{ type: 'tween' }}
                  >
                    <img src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} />
                    <Info variants={infoVariants}>
                      <h4>{comic.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {comicMatch ? (
              <>
                <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <BigComic style={{ top: scrollY.get() + 100 }} layoutId={comicMatch.params.comicId}>
                  hello
                </BigComic>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
/**
 * 
 * <ul>
            {data1?.map((d: any, index: number) => (
              <li key={index}>
                <img src={`${d.thumbnail.path}/portrait_xlarge.${d.thumbnail.extension}`} />
              </li>
            ))}
          </ul>
*/
