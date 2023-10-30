import React, { useEffect } from 'react';
import axios from 'axios';

const PageLog = (page) => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const userUid = sessionStorage.getItem('userUid');
  const uid = userUid === null ? '' : userUid;

  useEffect(() => {
    axios.post(`${baseURL}/v1/log/movement/form`, { userUid: uid, "page": page }).then((res) => {
  }).catch((error) => {
    console.error(error)
  })
  }, []);

  return null;
}
export default PageLog;