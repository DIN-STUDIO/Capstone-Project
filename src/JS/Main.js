import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function Main() {
    const navigate = useNavigate();

    const [selectedImages, setSelectedImage] = useState([]);

    const selectImage = (event) => {
        // 선택한 file객체를 file 변수에 할당

        // 이미지와 이미지 url을 담을 변수 할당
        const imageLists = event.target.files;

        console.log(imageLists[0]);



        // 선택한 파일이 존재하는 경우
        if (imageLists){
            let imageUrlLists = [...selectedImages];

            // 선택된 이미지의 개수만큼 이미지 url을 저장
            for (let i = 0; i < imageLists.length; i++){
                const currentImageUrl = URL.createObjectURL(imageLists[i]);
                imageUrlLists.push(currentImageUrl);
    
                // 최대 선택 가능한 이미지 개수 지정 (현재는 임의로 5개 지정)
                if (imageUrlLists.length > 5){
                    alert("You can upload up to 5 image files");
                    imageUrlLists = imageUrlLists.slice(0, 5);
                }
            }
            setSelectedImage(imageUrlLists);
            console.log(`selected imgs : ${selectedImages}`);
        }
        
        // [단일 이미지 파일 업로드 경우]
        // // 선택한 파일이 존재하는 경우
        // if (file) {
        //     // FileReader 객체 생성후 reader 변수에 저장
        //     const reader = new FileReader();

        //     // onloadend : 파일 읽기 작업을 하는 도중 이벤트 발생시에 실행되는 콜백 함수 설정
        //     reader.onloadend = () => {
        //         // selectedImage에 이미지 인코딩 결과(파일 읽은 내용) 저장
        //         setSelectedImage(reader.result);
        //     };
        //     // file을 읽고 그 결과를 Data URL 형식으로 반환 
        //     //(reader.result에는 Data URL은 파일을 url 형태로 인코딩한 결과 저장. 이미지 파일을 Base64 인코딩하여 문자열로 변환한 것이 저장됨. 이미지 미리보기 위한 코드)
        //     reader.readAsDataURL(file);
        // }
    };
    
    // 이미지 삭제 함수
    const handleDeleteImages = (id) => {
        setSelectedImage(selectedImages.filter( (_, index) => index !== id));
    };

    const uploadImage = async () => {
        // 이미지 인코딩 url이 존재하면
        if (selectedImages) {
            // formData 객체 생성 
            const formData = new FormData();

            // 이부분 서버로 전송할 때 에러 가능성 염두
            // 다중 이미지 서버 전송
            for (let i = 0; i < selectedImages.length; i++) { 
                // name : 'image', value : selectedImage인 폼필드 추가
                formData.append('image', selectedImages[i]);
            }

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
            <Link to="/main">Main Logo</Link>
            <Navbar />
            {/* 다중 이미지 선택 */}
            <label htmlFor='img-input' onChange={selectImage}>
                <input 
                    id='img-input'
                    type="file"
                    accept="image/*"
                    multiple
                />
            </label>

            {/* 순회하며 할당된 이미지 출력(미리보기)  */}
            {selectedImages.map((image, id) => (
                <div key={id}>
                    <img src={image} alt={`${image} ${id}`}/>
                    <button onClick={() => handleDeleteImages(id)}>Delete</button> 
                </div>
            ))}

            {/* 단일 이미지 입력 코드 */}
            {/* {selectedImages && (
                <div>
                    <img src={selectedImages} alt="Preview" />
                </div>
            )} */}
            <button onClick={uploadImage}>Upload</button>
            <button onClick={ () => navigate("/") }>Back to Greeting</button>
        </div>
    );
}

export default Main;