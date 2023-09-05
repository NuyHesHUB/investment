import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Axios */
/* import axiosInstance from '../../axiosInstance'; */
import axios from 'axios';

/* Components */
import Admin from './Admin';

/* StyledComponents */
import { StyledFrame, StyledTableWrap, StyledInfoBox, StyledSearchBox, StyledAdminBoard, StyledMemberListNav } from './StyledAdminTable';

const AdminPostList = () => {
    const [selectAll, setSelectAll] = useState(false);
    const accessToken = sessionStorage.getItem('accessToken');
    const [postData, setPostData] = useState([]); 
    const headers = {
            Authorization: `${accessToken}`
        }
    /* const url = "http://211.198.44.123:3385/v1/users/"; */
    const query = "";
    const pageRows = "";
    const page = "";
    /* const params = {
        query: query,
        pageRows: pageRows,
        page: page
    }; */

    /* useEffect(() => {
        axios.get(url, { params, headers })
        .then(response => {
            setUserData(response.data.query);
            console.log(response.data.query);
        })
        .catch(error => {
            console.error('catch : Admin 회원 목록 가져오기 실패', error);
        })
    },[]) */

    useEffect(() => {
        axios.get('http://39.117.244.34:3385/v1/board?query=&pageRows=&page=', { headers })
        .then(response => {
            const modifiedPostData = response.data.query.map(post => ({
                ...post,
                selected: false // 초기값으로 모두 선택되지 않은 상태로 설정
            }));
            setPostData(modifiedPostData);
            console.log(modifiedPostData);
        })
        .catch(error => {
            console.error('catch : Admin 게시판 목록 가져오기 실패', error);
        });
    }, []);
    
    console.log(postData);
    
    const handleSelectAll = () => {
        const updatedUserData = postData.map(post => ({
            ...post,
            selected: !selectAll
        }));
        setPostData(updatedUserData);
        setSelectAll(!selectAll);
    };

    const handleSelectOne = (index) => {
        const newData = [...postData];
        newData[index].selected = !newData[index].selected;
        setPostData(newData);
        console.log(`Post at index ${index} selected: ${newData[index].selected}`);
        console.log('Post data:', newData[index]);
    };
    
    return (
        <div>
            <Admin/>
            <StyledFrame>
                <StyledTableWrap>
                <h1>게시판관리</h1>
                    <StyledInfoBox>
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
                                        <th scope='col' rowSpan={2}>
                                            <label className='none-label'>회원전체</label>
                                            <input
                                                type="checkbox"
                                                checked={postData.length > 0 && postData.every(user => user.selected)}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th scope='col'>
                                            <Link>Authorize</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>카테고리(Category)</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>extraFields</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>Key</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>Options</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>regDt</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>regUser</Link>
                                        </th>
                                        {/* <th scope='col'>
                                            <Link>Selected</Link>
                                        </th> */}
                                        <th scope='col'>
                                            <Link>Skins</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>공개/비공개(Status)</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>title</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>updDt</Link>
                                        </th>
                                        <th scope='col'>
                                            <Link>updUser</Link>
                                        </th>
                                        <th scope='col'>
                                            관리
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {postData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td rowSpan={1}>
                                                    <input type='checkbox' checked={item.selected} onChange={() => handleSelectOne(index)} />
                                                </td>
                                                <td rowSpan={1}>{item.authorize}</td>
                                                <td rowSpan={1}>{item.categoryList}</td>
                                                <td rowSpan={1}>{item.extraFields}</td>
                                                <td rowSpan={1}>{item.key}</td>
                                                <td rowSpan={1}>{item.options}</td>
                                                <td rowSpan={1}>{item.regDt}</td>
                                                <td rowSpan={1}>{item.regUser}</td>
                                                {/* <td rowSpan={1}>{item.selected}</td> */}
                                                <td rowSpan={1}>{item.skins}</td>
                                                <td rowSpan={1}>{item.status}</td>
                                                <td rowSpan={1}>{item.title}</td>
                                                <td rowSpan={1}>{item.updDt}</td>
                                                <td rowSpan={1}>{item.updUser}</td>
                                                <td rowSpan={1}>
                                                    <Link to={`/admin/post_edit/${index}`} style={{textDecoration:'none'}}>
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
                </StyledTableWrap>
            </StyledFrame>
        </div>
    );
};

export default AdminPostList;