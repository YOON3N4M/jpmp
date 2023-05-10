import { useState } from "react";
import styled from "styled-components";

interface QuizType {
  // 음식 종류
  foodType: "양식" | "중식" | "한식" | "일식" | "기타";
  //음식 사진 URL
  foodPicURL: string;
  //식당 이름 기재 해도 되고 안해도 되고
  restaurants?: string;
  // 지역
  region: string;
  // 음식 항목별 가격
  food1: string;
  food1Price: number;
  food2?: string;
  food2Price?: number;
  food3?: string;
  food3Price?: number;
  food4?: string;
  food4Price?: number;
  food5?: string;
  food5Price?: number;
  // 가격 합계
  sumOfPrice: number;
  // 기타 정보
  desc?: string;
}

const AddContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .food-pic-container {
    margin: 0 auto;
    width: 30rem;
    height: 30rem;
    background-color: gray;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 2rem;
  }
  .food-info-input-container {
    display: flex;
    flex-direction: column;
  }
  textarea {
    margin: 0 auto;
    display: block;
    width: 50px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 60%;
  min-height: 50px;
  // background-color: red;
  align-items: center;
  .left {
  }
  .right {
  }
`;

export default function Add() {
  const [isSet, setIsSet] = useState(false);
  const [menu, setMenu] = useState("");
  const [region, setRegion] = useState("");
  const [restaurants, setRestaurants] = useState("");

  //음식정보 select,input태그의 onChange 함수들
  function changeMenuType(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "세트") {
      setIsSet(true);
    } else setIsSet(false);
  }
  // input태그마다 개별적으로 함수를 선언하는 방식
  function changeMenuName(event: React.ChangeEvent<HTMLInputElement>) {
    setMenu(event.target.value);
  }
  function changeRegion(event: React.ChangeEvent<HTMLInputElement>) {
    setRegion(event.target.value);
  }
  // 하나의 함수로 모든 input태그를 커버하는 방식
  function changeMenuInfo(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "menuName") {
      setMenu(event.target.value);
    } else if (event.target.name === "region") {
      setRegion(event.target.value);
    }
  }

  return (
    <AddContainer>
      <div className="food-pic-container">
        <h3>음식 사진을 추가하세요!</h3>
      </div>
      <div className="food-info-input-container">
        <InfoRow>
          <span>단품/세트</span>
          <select onChange={changeMenuType}>
            <option>단품</option>
            <option>세트</option>
          </select>
        </InfoRow>
        <InfoRow>
          <span>메뉴 이름</span>
          <input onChange={changeMenuName} value={menu}></input>
        </InfoRow>

        <InfoRow>
          <span>지역 *</span>
          <input onChange={changeRegion} value={region}></input>
        </InfoRow>
        <InfoRow>
          <span>식당 이름</span>
          <input></input>
        </InfoRow>
        <InfoRow>
          <span>가격 *</span>
          <input></input>
        </InfoRow>
        <InfoRow>
          <span>기타 설명</span>
        </InfoRow>
        <textarea></textarea>
      </div>
    </AddContainer>
  );
}
