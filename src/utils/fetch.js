import fetch from 'isomorphic-fetch';
import decorator from './decorator';

export default async (url) => {
  return fetch(url)
    .then(res => res.json())
    .then(decorator);
}
