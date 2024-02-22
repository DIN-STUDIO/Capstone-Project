import React from 'react';

const Test = () => {
  const handleClick = (e) => {
    e.persist(); // SyntheticEvent 풀링을 방지하고 이벤트를 유지함

    setTimeout(() => {
      console.log('Async task completed');
      console.log('Button text:', e.target.textContent); // 비동기 작업이 완료된 후에도 이벤트 객체에 접근하여 이벤트 정보를 출력
    }, 1000);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Test;
