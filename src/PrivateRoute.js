import React, { useEffect, useState } from 'react';
 import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = (authenticated) => {
  const navigate = useNavigate();
    // if (!authenticated) {
    //   <Navigate to='/login' {...alert("회원만 접근할 수 있는 페이지입니다.")} />
    // }
    console.log("실험")
  useEffect(() => {
      if (!authenticated) {
        alert("회원만 접근할 수 있는 페이지입니다.")
        navigate("/");
      }
    }, [authenticated, navigate]);
    return null;
 }
 export default PrivateRoute;