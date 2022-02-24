import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Slider from '../Components/Slider';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
function Comics() {
  const { data, isLoading } = useQuery(['comics', '1'], getComics);
  return <>{isLoading ? null : <Slider data={data} />}</>;
}

export default Comics;
