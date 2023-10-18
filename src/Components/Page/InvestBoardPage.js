import React, { useEffect, useState } from 'react';

/* React-Router-Dom */
import { Link } from 'react-router-dom';

/* Axios */
import axios from 'axios';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { setAdminPostData } from '../../store/actions/actions';

/* Components */
import Header from '../Header';
import Footer from '../Footer';

/* StyledComponents */
import styled from 'styled-components';
import { StyledFrame, GalleryWrap, LeftFrame, LeftTable, TablePagination, RightFrame } from './StyledBoardTable';

const CategoryPageFrame = styled.div`
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    text-align: center;
`

const InvestBoardPage = ({ categoryIndex, parsedCategoryData }) => {
    const baseURL = process.env.REACT_APP_BASEURL;
    const userUid = sessionStorage.getItem('userUid');
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
        Authorization: `${accessToken}`
    }
    const dispatch = useDispatch();
    /* const boardDataString =localStorage.getItem('adminBoardData');
    const boardData = JSON.parse(boardDataString); */
    /* console.log('categoryData',categoryData); */
    /* const postDataString = localStorage.getItem('adminPostData');
    const postData = JSON.parse(postDataString); */
    /* console.log('postData',postData); */
    console.log('index',categoryIndex);
    console.log('categoryData',parsedCategoryData);

    /* Redux */
    
    /* const boardData = useSelector((state) => state.reducer?.adminBoardData);
    console.log('boardData',boardData); */
    /* const postData = useSelector((state) => state.reducer?.adminPostData);
    console.log('postData',postData); */

    /* const urlKey = boardData?.[0]?.key; */

    /* UseState */
    /* const [postData, setPostData] = useState([]); */

    
    /*------------------------------------------------*\
                     API 게시글 목록 GET
    \*------------------------------------------------*/
    const [investPostData, setInvestPostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostResponse = await axios.get(`${baseURL}/v1/board/investment/post`, { headers });
                const data = PostResponse.data?.query;
                /* dispatch(setAdminPostData(data)); */
                setInvestPostData(data);
                console.log('investBoardData',investPostData);
            } catch (error) {
                console.error('investBoardData 데이터 가져오기 실패', error);
            }
        }
        fetchData();
    }, []);

    /*------------------------------------------------*\
                     Contents Return
    \*------------------------------------------------*/
    /* let content = null; */

    /* if (categoryData === '제조') {
        content = <Gallery01 postData={postData}></Gallery01>;
    } else if (categoryData === 'IT') {
        content = <div>IT 내용을 보여줍니다.</div>;
    } else if (categoryData === '외식') {
        content = <div>외식 내용을 보여줍니다.</div>;
    } else if (categoryData === '서비스') {
        content = <div>서비스 내용을 보여줍니다.</div>;
    } else if (categoryData === '의료') {
        content = <div>의료 내용을 보여줍니다.</div>;
    } else if (categoryData === '유통/물류') {
        content = <div>유통/물류 내용을 보여줍니다.</div>;
    } else if (categoryData === '운송') {
        content = <div>운송 내용을 보여줍니다.</div>;
    } else if (categoryData === '대여') {
        content = <div>대여 내용을 보여줍니다.</div>;
    } else if (categoryData === '기타') {
        content = <div>기타 내용을 보여줍니다.</div>;
    } else if (categoryData === '엔터테이먼트') {
        content = <div>엔터테이먼트 내용을 보여줍니다.</div>;
    } else if (categoryData === '교육') {
        content = <div>교육 내용을 보여줍니다.</div>;
    } else if (categoryData === '부동산') {
        content = <div>부동산 내용을 보여줍니다.</div>;
    } else {
        content = <div>기본 내용을 보여줍니다.</div>;
    } */

    /* 수정전 */
    /* const filteredPostData = investPostData?.filter(post => {
        return parsedCategoryData.includes(post.category); 
      });
      console.log('filteredPostData',filteredPostData); */
    /* 수정후 */
   /*  if (investPostData && Array.isArray(investPostData)) {
        const filteredPostData = investPostData.filter(post => {
            return parsedCategoryData.includes(post.category);
        });
        console.log('filteredPostData',filteredPostData);
    } else {
        console.warn('investPostData가 존재하지 않거나 배열이 아닙니다.');
    }

    const sortedPostData = [...filteredPostData].sort((a, b) => {
        const dateComparison = new Date(b.date) - new Date(a.date);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return a.id - b.id;
      });
    
      const pageSize = 5;
      const [currentPage, setCurrentPage] = useState(1);
    
      const totalPages = Math.ceil(sortedPostData.length / pageSize);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const visibleBoardData = sortedPostData.slice(startIndex, endIndex); */
      
    let visibleBoardData = [];
    let totalPages = 0;
    const [currentPage, setCurrentPage] = useState(1);

      const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
      };

    if (investPostData && Array.isArray(investPostData)) {
        const filteredPostData = investPostData.filter(post => {
            return parsedCategoryData.includes(post.category);
        });

        const sortedPostData = [...filteredPostData].sort((a, b) => {
            const dateComparison = new Date(b.date) - new Date(a.date);
            if (dateComparison !== 0) {
                return dateComparison;
            }
            return a.id - b.id;
        });

        const pageSize = 5;

        totalPages = Math.ceil(sortedPostData.length / pageSize);

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        visibleBoardData = sortedPostData.slice(startIndex, endIndex);
        /* console.log('investPostData 데이터 성공'); */
    } else {
        /* console.log('investPostData가 존재하지 않거나 배열이 아닙니다.'); */
    }

    return (
        <div>
            <Header/>
            <CategoryPageFrame>
                {/* <CategoryPageFrame> */}
                    <h2>{parsedCategoryData}</h2>
                    <Link to="/post_regist">
                        게시글작성
                    </Link>
                    {/* {content} */}
                        {/* {filteredPostData.map((post, index) => (
                        <div key={index}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                        ))} */}
                {/* </CategoryPageFrame> */}
                    <StyledFrame>
                        <GalleryWrap>
                            <LeftFrame>
                                <LeftTable>
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>공개</th>
                                            <th>작성자</th>
                                            <th>제목</th>
                                            <th>좋아요</th>
                                            <th>카테고리</th>
                                            <th>조회수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleBoardData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.num}</td>
                                                <td>{item.isSecret}</td>
                                                <td>{item.nickname}</td>
                                                <td><Link to={`/${item.brdKey}/${categoryIndex}/${item.id}`}>{item.title}</Link></td>
                                                <td>{item.like}</td>
                                                <td>{item.brdKey}</td>
                                                <td>{item.post_view_count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </LeftTable>
                                <TablePagination className="pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <span
                                            key={index}
                                            className={currentPage === index + 1 ? 'active' : ''}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </span>
                                    ))}
                                </TablePagination>
                            </LeftFrame>
                            <RightFrame>

                            </RightFrame>
                        </GalleryWrap>
                    </StyledFrame>
                </CategoryPageFrame>
            <Footer/>
        </div>
    );
};

export default InvestBoardPage;