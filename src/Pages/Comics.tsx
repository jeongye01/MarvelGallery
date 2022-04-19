import styled from 'styled-components';
import React from 'react';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Slider from '../Components/Slider';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
function Comics() {
  const { data, isLoading } = useQuery(['comics'], getComics);
  return <>{isLoading ? null : <Slider data={data} category="comics" />}</>;
}

export default React.memo(Comics);
