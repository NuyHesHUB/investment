import React, { useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';
import { setAdminUserData } from '../../store/actions/actions';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Components */
import Admin from './Admin';

/* Styled Components */
import { StyledFrame, StyledTableWrap, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';


const AdminMemberList = () => {
    const adminUserData = useSelector((state) => state.reducer.adminUserData);

    /*------------------------------------------------*\
                  <tr/> Select All function
    \*------------------------------------------------*/

    /* const [selectAll, setSelectAll] = useState(false); */
    
    /* const handleSelectAll = () => {
        const updatedUserData = adminUserData.map(user => ({
            ...user,
            selected: !selectAll
        }));
        setAdminUserData(updatedUserData);
        setSelectAll(!selectAll);
    }; */

    /* const handleSelectOne = (index) => {
        const newData = [...adminUserData];
        newData[index].selected = !newData[index].selected;
        setAdminUserData(newData);
        console.log(`User at index ${index} selected: ${newData[index].selected}`);
        console.log('User data:', newData[index]);
    }; */
    
    return (
        <div>
            <Admin/>
            <StyledFrame>
                <StyledTableWrap>
                    <h1>회원관리</h1>
                    <StyledInfoBox>
                        <div>
                            <span>총 회원수</span>
                            <span> {adminUserData.length} 명</span>
                        </div>
                    </StyledInfoBox>
                    <StyledSearchBox>
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
                    </StyledSearchBox>
                    <StyledAdminBoard>
                        <div>
                            <table>
                                <caption style={{height:'0',fontSize:'0',overflow:'hidden'}}>회원관리 목록</caption>
                                <thead>
                                    <tr>
                                        <th scope='col'>
                                            <Link>공개</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>아이디</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>닉네임</Link>
                                        </th>
                                        <th scope='col'>
                                            전화번호
                                        </th>
                                        <th scope='col'>
                                            <Link>SMS수신</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>메일수신</Link>
                                        </th>
                                        {/* <th scope='col'>
                                            휴대폰
                                        </th> */}
                                        <th scope='col'>
                                            <Link>최종접속</Link>
                                        </th>
                                        <th scope='col'>
                                            접근그룹
                                        </th>
                                        <th scope='col'>
                                            <Link>가입일</Link>
                                        </th>
                                        <th scope='col'>
                                            관리
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminUserData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {/* 1번째 행 */}
                                            <tr>
                                                <td>{item.status === 'Y' ? '공개' : '비공개'}</td>
                                                <td>{item.loginId}</td>
                                                <td>{item.nickname}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.receiveSms === 'Y' ? '동의' : '비동의'}</td>
                                                <td>{item.receiveEmail === 'Y' ? '동의' : '비동의'}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <Link to={`/admin/member_edit/${index}`} style={{textDecoration:'none'}}>
                                                        <span style={{background:'#3f51b5',color:'#fff',padding:'5px',fontSize:'12px',borderRadius:'10px'}}>수정</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </StyledAdminBoard>
                    <StyledMemberListNav>

                    </StyledMemberListNav>
                </StyledTableWrap>
            </StyledFrame>
        </div>
    );
};

export default AdminMemberList;