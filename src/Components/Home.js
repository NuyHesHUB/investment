import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import axios from 'axios';

const Home = () => {
    /* const [boardData, setBoardData] = useState([]);

    useEffect(() => {
        axios.get('http://211.198.44.123:3385/v1/board/')
            .then(response => {
                const test = response.data.query
                const titles = response.data.query.map(item => item.key);
                setBoardData(titles);
                console.log(response.data);
                console.log('test', test);
            })
            .catch(error => {
                console.error('게시판 데이터를 가져올 수 없습니다.', error);
            });
    }, []);

    console.log('boardData',boardData); */
    
    return (
        <div>
            <Header/>
            {/* <ul>
                {boardData.map((title, index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default Home;