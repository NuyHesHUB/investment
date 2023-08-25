import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import { StyledFrame, SlideWrap, SildeBg1, SildeBg2, SlideContentsWrap, SwiperCustomWrap } from './StyledComponents/StyledHome';

import { Swiper, SwiperSlide } from 'swiper/react';
/* import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'; */
import { Pagination, Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; 

import Illust from '../assets/image/robotos-illust-left.png';

/* demoIMG */
/* import Demo1 from '../assets/demo/1.png';
import Demo2 from '../assets/demo/2.png';
import Demo3 from '../assets/demo/3.png'; */

import AllIcon from '../assets/category-image/all.png';
import FoodIcon from '../assets/category-image/food.png';
import ManuFacturingIcon from '../assets/category-image/manufacturing.png';
import OtherIcon from '../assets/category-image/other.png';
import RentalIcon from '../assets/category-image/rentals.png';
import RetailIcon from '../assets/category-image/retail.png';
import ServicesIcon from '../assets/category-image/services.png';
const Home = () => {
    const [boardData, setBoardData] = useState([]);

    useEffect(() => {
        axios.get('http://211.198.44.123:3385/v1/board/')
            .then(response => {
                const test = response.data.query
                const titles = response.data.query.map(item => item.title);
                setBoardData(titles);
                console.log(response.data);
                console.log('test', test);
            })
            .catch(error => {
                console.error('게시판 데이터를 가져올 수 없습니다.', error);
            });
    }, []);

    console.log('boardData',boardData);
    
    return (
            <StyledFrame>
                <Header/>
                    <div>
                        <Swiper
                            autoplay={{
                                delay: 10000,
                            }}
                            cssMode={true}
                            speed={500}
                            loop={true}
                            /* navigation={true} */
                            /* pagination={true} */
                            /* mousewheel={true} */
                            /* keyboard={true} */
                            modules={[Navigation, Pagination, Autoplay]}
                        >
                            <SwiperSlide>
                                <SlideWrap className='slide-wrap'>
                                    <SildeBg1></SildeBg1>
                                    <SlideContentsWrap>
                                        <div>
                                            <h2>비즈니스 및 업무</h2>
                                            <p>
                                                원격 근무 및 스타트업의 이미지부터 작업 중인 엔지니어 및 아티스트의 <br/>
                                                사진에 이르기까지 다양한 형태로 현대 작업 공간의 현실을 반영합니다.
                                            </p>
                                        </div>
                                        <div>
                                            <img src={Illust} alt="illust"/>
                                        </div>
                                        
                                    </SlideContentsWrap>
                                </SlideWrap>
                            </SwiperSlide>
                            <SwiperSlide>
                                <SlideWrap className='slide-wrap'>
                                    <SildeBg2></SildeBg2>
                                    <SlideContentsWrap>
                                        <div>
                                            <h2>비즈니스 및 업무</h2>
                                            <p>
                                                원격 근무 및 스타트업의 이미지부터 작업 중인 엔지니어 및 아티스트의 <br/>
                                                사진에 이르기까지 다양한 형태로 현대 작업 공간의 현실을 반영합니다.
                                            </p>
                                        </div>
                                        <div>
                                            <img src={Illust} alt="illust"/>
                                        </div>
                                    </SlideContentsWrap>
                                </SlideWrap>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <SwiperCustomWrap >
                        <div className='swiper-button-prev'></div>
                        <Swiper
                                /* autoplay={{
                                    delay: 10000,
                                }} */
                                cssMode={true}
                                speed={500}
                                loop={false}
                                /* navigation={true} */
                                spaceBetween={200}
                                slidesPerView={5}
                                modules={[Navigation, /* Pagination *//* , Autoplay */]}
                                /* breakpoints={{
                                    640: {
                                      slidesPerView: 2,
                                      spaceBetween: 20,
                                    },
                                    768: {
                                      slidesPerView: 4,
                                      spaceBetween: 40,
                                    },
                                    1024: {
                                      slidesPerView: 5,
                                      spaceBetween: 50,
                                    },
                                  }} */
                                  navigation = {{
                                    nextEl : '.swiper-button-next',
                                    prevEl : '.swiper-button-prev', 
                                }}
                            >
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={AllIcon} alt="전체보기"/>
                                        {boardData ? (<span>{boardData[0]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={FoodIcon} alt="외식업종"/>
                                        {boardData ? (<span>{boardData[1]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={ManuFacturingIcon} alt="제조업종"/>
                                        {boardData ? (<span>{boardData[2]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={OtherIcon} alt="기타업종"/>
                                        {boardData ? (<span>{boardData[3]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={RentalIcon} alt="시설대여업종"/>
                                        {boardData ? (<span>{boardData[4]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={RetailIcon} alt="판매업종"/>
                                        {boardData ? (<span>{boardData[5]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={ServicesIcon} alt="서비스업종"/>
                                        {boardData ? (<span>{boardData[6]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={AllIcon} alt="전체보기"/>
                                        {boardData ? (<span>{boardData[0]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={FoodIcon} alt="외식업종"/>
                                        {boardData ? (<span>{boardData[1]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={ManuFacturingIcon} alt="제조업종"/>
                                        {boardData ? (<span>{boardData[2]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={OtherIcon} alt="기타업종"/>
                                        {boardData ? (<span>{boardData[3]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={RentalIcon} alt="시설대여업종"/>
                                        {boardData ? (<span>{boardData[4]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={RetailIcon} alt="판매업종"/>
                                        {boardData ? (<span>{boardData[5]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <SlideWrap>
                                        <img src={ServicesIcon} alt="서비스업종"/>
                                        {boardData ? (<span>{boardData[6]}</span>) : (null)}
                                    </SlideWrap>
                                </SwiperSlide>
                            </Swiper>
                            <div className='swiper-button-next'></div>
                    </SwiperCustomWrap>
                {/* <div style={{textAlign:'center', marginTop:'100px'}}>
                    <img style={{width:'70%'}} src={Demo1} alt="demo"/>
                </div>
                <div style={{textAlign:'center', marginTop:'100px'}}>
                    <img style={{width:'70%'}} src={Demo2} alt="demo"/>
                </div>
                <div style={{textAlign:'center', marginTop:'100px'}}>
                    <img style={{width:'70%'}} src={Demo3} alt="demo"/>
                </div> */}
            <Footer/>
            </StyledFrame>
            
    );
};

export default Home;