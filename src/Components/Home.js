import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import { StyledFrame, SlideWrap, SildeBg1, SildeBg2, SlideContentsWrap, SwiperCustomWrap, CategoryWrap } from './StyledComponents/StyledHome';

import { Swiper, SwiperSlide } from 'swiper/react';
/* import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'; */
import { Pagination, Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination'; 

import Illust from '../assets/image/robotos-illust-left.png';

/* demoIMG */
import Demo1 from '../assets/demo/1.png';
import Demo2 from '../assets/demo/2.png';
import Demo3 from '../assets/demo/3.png';

import AllIcon from '../assets/category-image/all.png';
import FoodIcon from '../assets/category-image/food.png';
import ManuFacturingIcon from '../assets/category-image/manufacturing.png';
import OtherIcon from '../assets/category-image/other.png';
import RentalIcon from '../assets/category-image/rentals.png';
import RetailIcon from '../assets/category-image/retail.png';
import ServicesIcon from '../assets/category-image/services.png';
import { Link } from 'react-router-dom';
import { setBoardData} from '../store/actions/actions';

const Home = ({parsedCategoryData}) => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const categoryImage = [
        AllIcon,
        FoodIcon,
        ManuFacturingIcon,
        OtherIcon,
        RentalIcon,
        RetailIcon,
        ServicesIcon,
        ServicesIcon,
    ];
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }

    /* console.log('home-test',parsedCategoryData); */
    /* const dispatch = useDispatch(); */

    /* useEffect(() => {
        axios.get('http://211.198.44.123:3385/v1/board/')
            .then(response => {
                const titles = response.data.query;
                dispatch(setBoardData(titles));
            })
            .catch(error => {
                console.error('게시판 데이터를 가져올 수 없습니다.', error);
            });
    }, []); */


    /* useEffect(() => {
        axios.post(`http://39.117.244.34:3385/v1/log/access/form`, { data: userUid }, { headers })
          .then(response => {
            console.log('로그 성공', userUid);
          })
          .catch(error => {
            console.error('로그 실패', error);
          });
      }, []); */

      useEffect(() => {
        const sendDataToServer = async () => {
          try {
            const requestData = { userUid: userUid };
            const requestConfig = { headers };
    
            console.log('보내는 데이터:', requestData);
            console.log('헤더 정보:', requestConfig);
    
            const response = await axios.post(
              'http://39.117.244.34:3385/v1/log/access/form',{ requestData} ,{headers} ,{
                withCredentials: true,
              }
            );
    
            console.log('서버 응답:', response.data);
          } catch (error) {
            console.error('에러 발생:', error);
          }
        };
    
        sendDataToServer();
      }, []);
      
      /* const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('myCookie='))
      .split('=')[1];
    
    localStorage.setItem('myCookieValue', cookieValue); */

    /* function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    function addCookie(id) {
        var items = getCookie('productItems'); 
        var maxItemNum = 5; 
        var expire = 7; 
        if (items) {
            var itemArray = items.split(',');
            if (itemArray.indexOf(id) !== -1) {
                console.log('Already exists.');
            } else {
                itemArray.unshift(id);
                if (itemArray.length > maxItemNum) itemArray.length = 5;
                items = itemArray.join(',');
                setCookie('productItems', items, expire);
            }
        } else {
            setCookie('productItems', id, expire);
        }
    }
    addCookie(); */


    // 현재 시간을 기준으로 만료 날짜를 계산합니다.
    //let expiresDate = new Date();
    //expiresDate.setFullYear(expiresDate.getFullYear() + 1); // 예: 현재로부터 1년 뒤로 설정

    // 만료 날짜를 GMT 형식으로 변환합니다.
    //let expiresString = expiresDate.toGMTString();

    // 쿠키를 설정합니다.
    //document.cookie = "visit=1; expires=" + expiresString + "; path=/";

    return (
            <StyledFrame>
                <Header parsedCategoryData={parsedCategoryData}/>
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
                                                TEST BRANCH aaaa
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
                                spaceBetween={180}
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
                                {/* {boardData.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <SlideWrap>
                                            <Link to={item.key}>
                                                <CategoryWrap className='hover-effect-img'>
                                                    <img src={categoryImage[index]} alt={item.title} />
                                                </CategoryWrap>
                                                {boardData && boardData.length > 0 ? (<span>{item.title}</span>) : (<span>Loading</span>)}
                                            </Link>
                                        </SlideWrap>
                                    </SwiperSlide>
                                ))} */}
                            </Swiper>
                            <div className='swiper-button-next'></div>
                    </SwiperCustomWrap>

            <Footer/>
            </StyledFrame>
            
    );
};

export default Home;