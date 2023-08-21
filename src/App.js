import React from 'react';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Admin from './Components/Admin';

const App = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />}></Route>
                    <Route exact path="/admin" element={<Admin />}></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;