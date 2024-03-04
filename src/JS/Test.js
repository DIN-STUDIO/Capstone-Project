import React, { useRef } from 'react';

const Test = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // 파일 입력 요소를 클릭하여 파일 선택 창을 엽니다.
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // 파일이 선택되면 이벤트 핸들러를 호출합니다.
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    // 이곳에서 선택된 파일에 대한 추가 작업을 수행할 수 있습니다.
  };

  return (
    <div>
      {/* 파일 입력 요소를 숨깁니다. */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* 파일 선택 버튼 */}
      <button onClick={handleButtonClick}>Choose File</button>
    </div>
  );
};

export default Test;
