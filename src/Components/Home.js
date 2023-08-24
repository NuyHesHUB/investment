import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import { StyledFrame } from './StyledComponents/StyledHome';

import { Swiper, SwiperSlide } from 'swiper/react';
/* import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'; */
import { Pagination, Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; 

import BG from '../assets/image/purple-bg.jpg'
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
            <StyledFrame>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='slide-wrap'>
                        <img style={{width:'100vw',height:'600px',filter:'brightness(70%)'}} src={BG} alt="backgorund"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='slide-wrap'>
                        <img style={{width:'100vw',height:'600px'}} src={BG} alt="backgorund"/>
                        <h1>상상 그 이상</h1>
                    </div>
                </SwiperSlide>
            </Swiper>  
            </StyledFrame>
            {/* <ul>
                {boardData.map((title, index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul> */}
            <Footer/>
        </div>
    );
};

export default Home;