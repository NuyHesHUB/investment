import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledFrame, GalleryWrap, LeftFrame, LeftTable, TablePagination, RightFrame } from './StyledBoardTable';
import { useSelector } from 'react-redux';

const Gallery01 = ({postData}) => {
    /* const categoryData = useSelector((state) => state.reducer.galleryListData || []); */
    /* const boardData = useSelector((state) => state.reducer.boardData || []); */
      
    const sortedPostData = [...postData].sort((a, b) => {
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
      const visibleBoardData = sortedPostData.slice(startIndex, endIndex);

      console.log('gallery01',postData);
      /* console.log('gallery01',boardData); */
    return (
        <StyledFrame>
            {/* <h1>게시판 목록 페이지</h1> */}
            <h1>Gallery01.js</h1>
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
                                    <td><Link /* to={`/gallery/${categoryData?.[0]}/${item.id}`} */>{item.title}</Link></td>
                                    <td>{item.like}</td>
                                    <td>{item.brdKey}</td>
                                    <td>{item.post_view_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </LeftTable>
                    <TablePagination className="pagination">
                        {/* {Array.from({ length: totalPages }, (_, index) => (
                            <span
                                key={index}
                                className={currentPage === index + 1 ? 'active' : ''}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </span>
                        ))} */}
                    </TablePagination>
                </LeftFrame>
                <RightFrame>

                </RightFrame>
            </GalleryWrap>
        </StyledFrame>
    );
};

export default Gallery01;