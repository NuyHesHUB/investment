import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Gallery02 = ({postData}) => {
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

      
      console.log('gallery02',postData);
    return (
        <div>
      <h1>게시판</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
        {visibleBoardData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><Link to={`${item.num}`}>{item.title}</Link></td>
              <td>{item.author}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
    );
};

export default Gallery02;