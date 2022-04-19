import styled from 'styled-components';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Slider from '../Components/Slider';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';

function Events() {
  const { data, isLoading } = useQuery(['events'], getEvents);
  return <>{isLoading ? null : <Slider data={data} category="events" />}</>;
}

export default Events;
