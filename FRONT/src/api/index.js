import axios from 'axios';

export default axios.create({
  baseURL: 'https://mjc-boardgames.herokuapp.com/v1/',
  timeout: 10000,
});
/*
export default axios.create({
  baseURL: 'http://localhost:3000/v1/',
  timeout: 10000,
});
*/
