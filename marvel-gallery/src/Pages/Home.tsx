import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
const Wrapper = styled.div``;
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

//한번에 보여주고 싶은 contents 수
const offset = 6;
function Home() {
  const { data, isLoading } = useQuery(['comics', '1'], getComics);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  console.log('comics', data);
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
                  <Box key={comic.id}>
                    {' '}
                    <img src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} />
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
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
