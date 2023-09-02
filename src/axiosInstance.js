import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://39.117.244.34:3385/v1',
});

export default instance;