import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';

import Navbar from "./Navbar";
import cat1 from "../uploads/cat1.jpg";

// const testData = null;
const testData = [
  {
    p_id : "1",
    p_name : "cat1",
    p_date : "240101",
    p_thumbnail : cat1,
  },
];

function Convert() {
    const navigate = useNavigate();
    // 초기 imageURL 값 null 지정
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
      // 서버에서 이미지 가져오기
      const fetchImage = async () => {
        try {
          // post와 같은 의미의 값이 response 변수에 저장
          const response = await axios.get('http://localhost:3001/fetchImage'); // 추후 서버 엔드포인트 변경
  
          // 서버 가져오기 성공
          if (response.status === 200) {
            // 이미지 URL을 imageURL 변수에 저장 (에러 가능성 염두)
            setImageURL(response.data.imageUrl);
          } else {
            console.error('Failed to fetch image');
          }
        } catch (error) {
          console.error('Error during image fetch:', error);
        }
      };
      // Main.js async에선 다시 함수를 호출하지 않았는데 왜 여기에선 호출...?
      fetchImage();
    }, []); 

    // 오디오 가져오기 파트
    const [audioURL, setAudioURL] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    useEffect(() => {
      // 서버에서 오디오 가져오기
      const fetchAudio = async () => {
        try {
          const response = await axios.get('http://localhost:3001/fetchAudio'); // 추후 서버 엔드포인트 변경
  
          // 서버 연결 성공
          if (response.status === 200) {
            // 오디오 url을 audioURL 변수에 저장 (에러 가능성 염두)
            setAudioURL(response.data.audioUrl);
          } else {
            console.error('Failed to fetch audio');
          }
        } catch (error) {
          console.error('Error during audio fetch:', error);
        }
      };
      fetchAudio();
    }, []); 
  
    // 일시정지 토글
    const togglePlayPause = () => {
      setIsPlaying(!isPlaying);
    };
  
    return(
        <div>
            <Link to="/main">Main Logo</Link>
            <Navbar />
            {/* 이미지 로드 */}
            
            {/* {imageURL ? (<img src={imageURL} alt="Server Image" />) : (<p>Loading image...ai api call</p>)} */}
            {testData ? (
              testData.map(project => (
                <div>
                  <img src={project.p_thumbnail} style={{"width" : "200px", "height" : "200px"}}/>
                </div>  
              ))
            ) : (
              <p>Loading Image...</p>
            )}

            {/* 오디오 로드 */}
            {audioURL ? (
                <div>
                    <audio controls>
                        <source src={audioURL} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>
            ) : (
                <p>Loading audio...</p>
            )}

            {/* 버튼들 */}
            <button>Download</button>
            <button>Save in my container</button>
            <button>Share</button>
            <button onClick={ () => navigate("/project-detail") }>Back to ProjectDetail page</button>
        </div>
    );
}

export default Convert;