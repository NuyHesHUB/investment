import React from 'react';
 import { Navigate } from 'react-router-dom';

 function PrivateRoute({ authenticated, b_no, component: Component }) {
   return (
     authenticated ? Component : <Navigate to='/login' {...alert("회원만 접근할 수 있는 페이지입니다.")} />
   )
 }

 export default PrivateRoute 