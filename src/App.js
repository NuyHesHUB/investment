import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; // createStore 추가
import reducer from './store/reducer/reducer'; // reducer 추가
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Admin from './Components/Admin/Admin';
import Signup from './Components/Signup/Signup';

const store = createStore(reducer); // 리듀서로 스토어 생성

const App = () => {

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/sign_up" element={<Signup/>}></Route>
                    <Route exact path="/admin" element={<Admin />}></Route>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;