import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';

const Home = () => {

  const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        const fetchCompanyList = async () => {
            try {
                const response = await axios.get('http://211.198.44.123:3385/v1/company');
                setCompanyList(response.data.query); // 응답 데이터의 query 배열을 업체 목록으로 설정
            } catch (error) {
                console.error('업체 목록 가져오기 실패:', error);
            }
        };

        fetchCompanyList(); // 컴포넌트가 마운트되었을 때 업체 목록 가져오기 실행
    }, []);

    return (
        <div>
          <Header/>
          Home
          <h2>업체 목록</h2>
          <ul>
                {companyList.map((company) => (
                    <li key={company.id}>
                        <strong>{company.companyName}</strong>
                        <p>담당자: {company.nickname}</p>
                        <p>주소: {company.address1} {company.address2}</p>
                        <p>전화번호: {company.phone}</p>
                        <p>내용: {company.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;