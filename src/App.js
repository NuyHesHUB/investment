import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'; // createStore 추가
import reducer from './store/reducer/reducer'; // reducer 추가
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Admin from './Components/Admin/Admin';
import Signup from './Components/Signup/Signup';

import Apage from './Components/CategoryPage/Apage';
import Bpage from './Components/CategoryPage/Bpage';
import MemberEditPage from './Components/MemberEdit/MemberEditPage';

const rootReducer = combineReducers({
    reducer: reducer, // 리듀서 추가
  });

const store = createStore(rootReducer); // 리듀서로 스토어 생성

const App = () => {

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/sign_up" element={<Signup/>}></Route>
                    <Route exact path="/admin" element={<Admin />}></Route>
                    <Route exact path="/myinfo" element={<MemberEditPage />}></Route>
                    <Route exact path="/:title" element={<Apage />}></Route>
                    <Route exact path="/borad/:title" element={<Bpage />}></Route>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;