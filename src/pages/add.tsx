import React, { useRef, useState } from "react";
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
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 2rem;
    img {
      max-width: 30rem;
      max-height: 30rem;
      border-radius: 10px;
    }
    :hover {
      background-color: #8080804f;
    }
  }
  .food-info-input-container {
    display: flex;
    flex-direction: column;
  }
  textarea {
    margin: 0 auto;
    display: block;
    width: 50%;
    margin-bottom: 1rem;
  }
  #file-input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
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

const StyledBtn = styled.button`
  margin: 0 auto;
  display: block;
`;

export default function Add() {
  const [isSet, setIsSet] = useState(false);
  const [menu, setMenu] = useState("");
  const [region, setRegion] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [price, setPrice] = useState<number>();
  const [desc, setDesc] = useState("");
  const [attachment, setAttachment] = useState("");

  const fileInput = useRef();

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
  function changeRestaurant(event: React.ChangeEvent<HTMLInputElement>) {
    setRestaurant(event.target.value);
  }
  function changePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(event.target.value));
  }
  function changeDesc(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDesc(event.target.value);
  }
  //file input (사진)
  function changePicture(event: React.ChangeEvent<HTMLInputElement>) {
    let selectedPicture;
    const reader = new FileReader();

    if (event.target.files !== null) {
      selectedPicture = event.target.files[0];
      reader.readAsDataURL(selectedPicture);
      reader.onloadend = (event: any) => {
        setAttachment(event.currentTarget.result);
      };
    }
  }
  // 등록(submit)
  function uploadQuizToDB(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const quizRef = {
      isSet,
      menu,
      region,
      restaurant,
      price,
      desc,
    };
    console.log(quizRef);
  }

  return (
    <AddContainer>
      <label htmlFor="file-input">
        <div className="food-pic-container">
          {attachment ? (
            <img src={attachment} />
          ) : (
            <h3>음식 사진을 추가하세요!</h3>
          )}
        </div>
      </label>
      <input onChange={changePicture} id="file-input" type="file"></input>
      <div className="food-info-input-container">
        <form onSubmit={uploadQuizToDB}>
          <InfoRow>
            <span>단품/세트</span>
            <select onChange={changeMenuType}>
              <option>단품</option>
              <option>세트</option>
            </select>
          </InfoRow>
          <InfoRow>
            <span>메뉴 이름</span>
            <input onChange={changeMenuName} value={menu} required></input>
          </InfoRow>
          <InfoRow>
            <span>지역 *</span>
            <input onChange={changeRegion} value={region} required></input>
          </InfoRow>
          <InfoRow>
            <span>식당 이름</span>
            <input value={restaurant} onChange={changeRestaurant}></input>
          </InfoRow>
          <InfoRow>
            <span>가격</span>
            <input
              onChange={changePrice}
              value={price}
              placeholder="숫자만 입력해주세요!"
              type="number"
              required
            ></input>
          </InfoRow>
          <InfoRow>
            <span>기타 설명</span>
          </InfoRow>
          <textarea onChange={changeDesc} value={desc}></textarea>
          <StyledBtn type="submit">등록하기</StyledBtn>
        </form>
      </div>
    </AddContainer>
  );
}
