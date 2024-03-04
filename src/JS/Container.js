import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

import cat1 from '../uploads/cat1.jpg';
import cat2 from '../uploads/cat2.jpg';

// 임시 데이터 (추후 서버에서 불러올 예정)
const testData = [
  {
    p_id : "1",
    p_name : "cat1",
    p_date : "240101",
    p_thumbnail : cat1,
  },
  {
    p_id : "2",
    p_name : "cat2",
    p_date : "240102",
    p_thumbnail : cat2,
  },
];

function Container() {
    // 데이터가 여러개이므로 초기 state를 배열로 설정
    const [data, setData] = useState([]);

    useEffect(() => {
      // 프로젝트 데이터 로드
      const fetchData = async () => {
        try {
          // post와 같은 의미의 값이 response 변수에 저장
          const response = await axios.get('http://server/data'); // 추후 서버 엔드포인트 변경
  
          // 서버 가져오기 성공
          if (response.status === 200) {
            // 이미지 URL을 imageURL 변수에 저장 (에러 가능성 염두)
            setData(response.data);
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error during data fetch:', error);
        }
      };
      // Main.js async에선 다시 함수를 호출하지 않았는데 왜 여기에선 호출...?
      fetchData();
    }, []);

    return(
        <div>
            {/* 프로젝트 검색 input */}
            <input placeholder="Search your Project" />

            {/* {imageURL ? (
                <img src={imageURL} alt="Server Image" />
            ) : (
                <p>Loading image...</p>
            )} */}

            {testData.map(project => (
              <div>
                <Link to={`/container/${project.p_name}`}>
                  <img src={project.p_thumbnail} style={{"width" : "200px", "height" : "200px"}}/>
                  <h3>{project.p_name}</h3>
                  <h3>{project.p_date}</h3>
                </Link>
              </div>  
            ))}
        </div>
    );
}

export default Container;