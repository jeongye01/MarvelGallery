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

export const fetchComics = () => {
  return marvel
    .get(`/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then((response) => response.data.data)
    .catch((err) => console.log(err));
};
