import "./Home.css";
import React from "react";
export default function Home() {
  const CreateChannel = () => {};
  const SearchChannel = () => {};
  return (
    <div className="container_intro">
      <h1>Pin to Pin</h1>
      <h2>지도 공통작업을 통해 여행 계획을 효율적으로 세워보세요!</h2>
      <div>
        <h3>
          채널을 생성해보세요 ->
          <button onClick={CreateChannel}>채널 생성하기</button>
        </h3>
      </div>
      <div>
        <h3>
          원하는 채널을 찾아보세요 ->
          <button onClick={SearchChannel}>채널 찾기</button>
        </h3>
      </div>
    </div>
  );
}
