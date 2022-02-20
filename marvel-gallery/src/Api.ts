import React from 'react';
import axios from 'axios';
import md5 from 'js-md5';

const PUBLIC_KEY = process.env.REACT_APP_publicKey;
const PRIVATE_KEY = process.env.REACT_APP_privateKey;
// youur private key
const baseURL = `https://gateway.marvel.com/v1/public`;
const ts = Number(new Date());
const hash = md5(ts + (PRIVATE_KEY || '') + PUBLIC_KEY);

const marvel = axios.create({ baseURL });

export const getComics = () => {
  return marvel
    .get(`/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then((response) => {
      const toReturn = response.data.data.results.filter((d: any) => {
        console.log(d.thumbnail.path.substr(-19), d.thumbnail.path.substr(-19) !== 'image_not_available');
        return d.thumbnail.path.substr(-19) !== 'image_not_available';
      });
      console.log(toReturn);
      return toReturn;
    })
    .catch((err) => console.log(err));
};

export const getSeries = () => {
  return marvel
    .get(`/series?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then((response) => response.data.data.results)
    .catch((err) => console.log(err));
};

export const getCharacters = () => {
  return marvel
    .get(`/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=100`)
    .then((response) => {
      const toReturn = response.data.data.results.filter((d: any) => {
        console.log(d.thumbnail.path.substr(-19), d.thumbnail.path.substr(-19) !== 'image_not_available');
        return d.thumbnail.path.substr(-19) !== 'image_not_available';
      });
      console.log(toReturn);
      return toReturn;
    })
    .catch((err) => console.log(err));
};

export const getCreators = () => {
  return marvel
    .get(`/creators?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then((response) => response.data.data.results)
    .catch((err) => console.log(err));
};

export const getEvents = () => {
  return marvel
    .get(`/events?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then((response) => response.data.data.results)
    .catch((err) => console.log(err));
};
