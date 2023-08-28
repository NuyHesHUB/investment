import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import { StyledMemberListFrame, StyledMemberListWrap, StyledMemberInfo, StyledMemberSearch, StyledMemberListForm, StyledMemberListNav } from './StyledMemberList';
import { Link } from 'react-router-dom';
import axios from 'axios';



const MemberList = () => {
    const accessToken = sessionStorage.getItem('accessToken');

    const [userData, setUserData] = useState([]); 

    const headers = {
            Authorization: `${accessToken}`
        }
    const url = "http://211.198.44.123:3385/v1/users/";
    const query = "";       // 원하는 쿼리 문자열을 입력하세요
    const pageRows = "";    // 원하는 페이지 당 행 수를 입력하세요
    const page = "";        // 원하는 페이지 번호를 입력하세요

    const params = {
        query: query,
        pageRows: pageRows,
        page: page
    };

    useEffect(() => {
        axios.get(url, { params, headers })
        .then(response => {
            setUserData(response.data.query);
            console.log(response.data.query);
        })
        .catch(error => {
            console.error('catch : Admin 회원 목록 가져오기 실패', error);
        })
    },[])
    console.log(userData);
    /* console.log('유저목록보기',userData.query[0].loginId); */
    return (
        <div>
            <Admin/>
            <StyledMemberListFrame>
                <h1>회원관리</h1>
                <StyledMemberListWrap>
                    <StyledMemberInfo>
                        <Link>전체목록</Link>
                        <div>
                            <span>총회원수</span>
                            <span>***명</span>
                        </div>
                        <Link>
                            <span>차단</span>
                            <span>*명</span>
                        </Link>
                        <Link>
                            <span>탈퇴</span>
                            <span>*명</span>
                        </Link>
                    </StyledMemberInfo>
                    <StyledMemberSearch>
                        <label style={{fontSize:'0'}}>검색대상</label>
                        <select>
                            <option>회원아이디</option>
                            <option>닉네임</option>
                            <option>이름</option>
                            <option>권한</option>
                            <option>E-Mail</option>
                            <option>전화번호</option>
                            <option>가입일시</option>
                            <option>IP</option>
                        </select>
                        <input type='text'/>
                        <input type='submit'/>
                    </StyledMemberSearch>
                    <StyledMemberListForm>
                        <div>
                            <table>
                                <caption style={{height:'0',fontSize:'0',overflow:'hidden'}}>회원관리 목록</caption>
                                <thead>
                                    <tr>
                                        <th scope='col' rowSpan={2}>
                                            <label className='none-label'>회원전체</label>
                                            <input type="checkbox"/>
                                        </th>
                                        <th scope='col' colSpan={2}>
                                            <Link>아이디</Link>
                                        </th>
                                        <th scope='col' rowSpan={2}>
                                            <Link>본인확인</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>메일수신</Link>
                                        </th>
                                        {/* <th scope='col'>
                                            <Link>정보공개</Link>
                                        </th> */}
                                        {/* <th scope='col'>
                                            <Link>메일수신</Link>
                                        </th> */}
                                        {/* <th scope='col'>
                                            상태
                                        </th> */}
                                        <th scope='col'>
                                            휴대폰
                                        </th>
                                        <th scope='col'>
                                            <Link>최종접속</Link>
                                        </th>
                                        <th scope='col'>
                                            접근그룹
                                        </th>
                                        <th scope='col' rowSpan={2}>
                                            관리
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope='col'>
                                            <Link>이름</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>닉네임</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>SMS수신</Link>
                                        </th>
                                        {/* <th scope='col'>
                                            <Link>성인인증</Link>
                                        </th> */}
                                        {/* <th scope='col'>
                                            <Link>접근차단</Link>
                                        </th> */}
                                        {/* <th scope='col'>
                                            <Link>권한</Link>
                                        </th> */}
                                        <th scope='col'>
                                            전화번호
                                        </th>
                                        <th scope='col'>
                                            <Link>가입일</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>포인트</Link>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {/* 1번째 행 */}
                                            <tr>
                                                <td rowSpan={2}>
                                                    <input type='checkbox'/>
                                                </td>
                                                <td colSpan={2} >
                                                    {item.loginId}
                                                </td>
                                                <td rowSpan={2}>'null'</td>
                                                <td>{item.receiveEmail}</td>
                                                <td>{item.phone}</td>
                                            </tr>
                                            {/* 2번째 행 */}
                                            <tr>
                                                <td>{item.nickname}</td>
                                                <td>{item.nickname}</td>
                                                <td>{item.receiveSms}</td>
                                                <td>'null'</td>
                                            </tr>
                                        </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </StyledMemberListForm>
                    <StyledMemberListNav>

                    </StyledMemberListNav>
                </StyledMemberListWrap>
            </StyledMemberListFrame>
        </div>
    );
};

export default MemberList;