import React, { useState } from 'react';
import { StyledAdminFrame, StyledAdminHeader, StyledAdminTop, StyledAdminNav, AdminNavUl, StyledNavGnb } from './StyledAdmin';
import { Link } from 'react-router-dom';
import { AiFillSetting } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";


const Admin = () => {

    const [visibleDiv, setVisibleDiv] = useState(null);

    const handleButtonClick = (divNumber) => {
        if (visibleDiv === divNumber) {
        setVisibleDiv(null);
        } else {
        setVisibleDiv(divNumber);
        }
    };


    return (
        <StyledAdminFrame>
            <StyledAdminHeader>
                <h1>Hwajin</h1>
                <StyledAdminTop>
                    <div className='left-admin-top'>
                        <button>&lt;</button>
                        <div>
                            <Link>관리자 페이지</Link>
                        </div>
                    </div>
                    <div className='right-admin-top'>
                        <ul>
                            <li>
                                <Link>로그아웃</Link>
                            </li>
                        </ul>
                    </div>
                </StyledAdminTop>
                <StyledAdminNav>
                    <AdminNavUl>
                        <li>
                            <button onClick={() => handleButtonClick(1)}>
                                <AiFillSetting/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 1 ? 'visible' : ''}`}>
                                    <h3>환경설정</h3>
                                    <ul>
                                        <li>1</li>
                                        <li>2</li>
                                        <li>3</li>
                                        <li>4</li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                        <li>
                            <button onClick={() => handleButtonClick(2)}>
                                <BsPersonCircle/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 2 ? 'visible' : ''}`}>
                                    <h3>회원관리</h3>
                                    <ul>
                                        <li><Link to="/admin/member_list">회원관리</Link></li>
                                        <li><Link>접속자집계</Link></li>
                                        <li><Link>접속자검색</Link></li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                        <li>
                            <button onClick={() => handleButtonClick(3)}>
                                <AiOutlineUnorderedList/>
                            </button>
                            <div>
                                <StyledNavGnb className={`div ${visibleDiv === 3 ? 'visible' : ''}`}>
                                    <h3>게시판관리</h3>
                                    <ul>
                                        <li>게시판관리</li>
                                        <li>게시판그룹관리</li>
                                        <li>내용관리</li>
                                    </ul>
                                </StyledNavGnb>
                            </div>
                        </li>
                    </AdminNavUl>
                </StyledAdminNav>
            </StyledAdminHeader>
            
        </StyledAdminFrame>
    );
};

export default Admin;