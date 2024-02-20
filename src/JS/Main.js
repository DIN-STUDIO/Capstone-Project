import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Main(props) {
    const [test, setTest] = useState(null);
    console.dir(test);


    console.log(props);

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);

    const selectImage = (event) => {
        // 선택한 file객체를 file 변수에 할당
        const file = event.target.files[0];

        // 선택한 파일이 존재하는 경우
        if (file) {
            // FileReader 객체 생성후 reader 변수에 저장
            const reader = new FileReader();

            // onloadend : 파일 읽기 작업을 하는 도중 이벤트 발생시에 실행되는 콜백 함수 설정
            reader.onloadend = () => {
                // selectedImage에 이미지 인코딩 결과(파일 읽은 내용) 저장
                setSelectedImage(reader.result);
            };
            // file을 읽고 그 결과를 Data URL 형식으로 반환 
            //(reader.result에는 Data URL은 파일을 url 형태로 인코딩한 결과 저장. 이미지 파일을 Base64 인코딩하여 문자열로 변환한 것이 저장됨. 이미지 미리보기 위한 코드)
            reader.readAsDataURL(file);
        }
    };
    
    const uploadImage = async () => {
        // 이미지 인코딩 url이 존재하면
        if (selectedImage) {
            // formData 객체 생성 
            const formData = new FormData();
            // name : 'image', value : selectedImage인 폼필드 추가
            formData.append('image', selectedImage);

            try {
                // 서버주소로 formData를 전송
                // axios의 POST 요청에 대한 응답이 저장됨. 
                // axios.post 메서드는 Promise를 반환하며, 이 Promise는 서버로부터의 응답을 나타냄.
                const response = await axios.post('http://localhost:3001/upload', formData);

                // 서버 전송 성공 시
                if (response.status === 200) {
                    console.log('Image uploaded successfully');
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {   // 에러 발생 메시지
                console.error('Error during image upload:', error);
            }
            navigate("/convert");
        }
    };

    return(
        <div>
            <input 
                type="file"
                accept="image/*"
                onChange={selectImage} 
            />
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Preview" />
                </div>
            )}
            <button onClick={uploadImage}>Upload</button>
        </div>
    );
}

export default Main;