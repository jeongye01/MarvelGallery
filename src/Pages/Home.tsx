import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Banner from '../Components/Banner';
import Comics from './Comics';
import Characters from './Characters';
import Creators from './Creators';
import Events from './Events';
const Wrapper = styled.div`
  //padding: 0px 60px;
`;

function Home() {
  const history = useHistory();
  const comicMatch = useRouteMatch<{ comicId: string }>('/:comicId');
  const { data, isLoading } = useQuery(['comics', '1'], getComics);

  const { scrollY } = useViewportScroll();

  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Banner data={data[7]} />
          <Comics />
          <Characters />
          <Events />
          <Creators />
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
