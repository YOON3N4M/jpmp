import { dbAddDoc, dbCollection, dbService, storageService } from "@/fBase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { uuid } from "uuidv4";

const AddContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #cecece94;
  width: 80%;
  padding: 3rem 0;
  border-radius: 8px;
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
    background-color: #e9e9e9b0;
    img {
      max-width: 30rem;
      max-height: 30rem;
      border-radius: 10px;
    }
  }
  .food-info-input-container {
    display: flex;
    flex-direction: column;
    small {
      display: block;
      margin: 0 auto;
      text-align: center;
      opacity: 50%;
    }
  }
  textarea {
    margin: 0 auto;
    display: block;
    width: 50%;
    margin-bottom: 1rem;
    border-radius: 8px;
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

  input,
  select {
    padding: 0.5rem 0;
    border-radius: 8px;
    border: 0px;
    text-align: center;
  }

  input,
  select,
  option,
  button {
    color: black;
  }
`;

export const StyledInput = styled.input`
  padding: 0.5rem 0;
  border-radius: 8px;
  border: 0px;
  text-align: center;
  color: black;
`;

export const StyledBtn = styled.button`
  margin: 0 auto;
  display: block;
  color: black;
  background-color: #ffffff93;
  border: 0;
  border-radius: 8px;
  padding: 1rem 1rem;
  cursor: pointer;
`;

export const foodType = {
  korFood: "한식",
  wesFood: "양식",
  chnFood: "중식",
  jpnFood: "일식",
  desFood: "디저트/음료",
  etcFood: "기타",
};

export const evaluationType = {
  cheap: "생각보다 저렴했어요!",
  average: "적당했어요!",
  expensive: "생각보다 비쌌어요!",
};

export const isSetType = {
  set: "세트",
  single: "단품",
};

export default function Add() {
  const fileInput = useRef();
  const router = useRouter();

  const [attachment, setAttachment] = useState("");
  const [isSet, setIsSet] = useState(false);
  const [type, setType] = useState(foodType.korFood);
  const [menu, setMenu] = useState("");
  const [region, setRegion] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [price, setPrice] = useState<number>();
  const [desc, setDesc] = useState("");
  const [evaluation, setEvaluation] = useState(evaluationType.average);

  //음식정보 select,input태그의 onChange 함수들
  function changeSet(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === isSetType.set) {
      setIsSet(true);
    } else setIsSet(false);
  }
  function changeType(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.value) {
      case foodType.korFood:
        setType(foodType.korFood);
        break;
      case foodType.wesFood:
        setType(foodType.wesFood);
        break;
      case foodType.jpnFood:
        setType(foodType.jpnFood);
        break;
      case foodType.chnFood:
        setType(foodType.chnFood);
        break;
      case foodType.desFood:
        setType(foodType.desFood);
        break;
      case foodType.etcFood:
        setType(foodType.etcFood);
        break;
      default:
        break;
    }
  }
  function changeEvaluation(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.value) {
      case evaluationType.average:
        setEvaluation(evaluationType.average);
        break;
      case evaluationType.expensive:
        setEvaluation(evaluationType.expensive);
        break;
      case evaluationType.cheap:
        setEvaluation(evaluationType.cheap);
        break;
      default:
        break;
    }
  }
  function changeMenu(event: React.ChangeEvent<HTMLInputElement>) {
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
  async function uploadQuizToDB(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //사진 업로드 핸들링
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `food/${uuid()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentURL = await getDownloadURL(response.ref);
    } else {
      alert("음식 사진을 1개 선택해주세요!");
    }
    const quizRef = {
      id: `${uuid()}`,
      type,
      isSet,
      menu,
      region,
      restaurant,
      price,
      evaluation,
      desc,
      attachmentURL,
    };
    try {
      const docRef = await dbAddDoc(dbCollection(dbService, "quiz"), quizRef);
      console.log("업로드 성공");
    } catch (error) {
      console.log(error);
    }

    alert("성공적으로 등록되었습니다.");
    router.push("/");
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
      <input
        required
        onChange={changePicture}
        id="file-input"
        type="file"
      ></input>
      <div className="food-info-input-container">
        <form onSubmit={uploadQuizToDB}>
          <InfoRow>
            <span>단품/세트</span>
            <select onChange={changeSet}>
              <option>{isSetType.single}</option>
              <option>{isSetType.set}</option>
            </select>
          </InfoRow>
          <InfoRow>
            <span>분류</span>
            <select onChange={changeType}>
              <option>{foodType.korFood}</option>
              <option>{foodType.wesFood}</option>
              <option>{foodType.jpnFood}</option>
              <option>{foodType.chnFood}</option>
              <option>{foodType.desFood}</option>
              <option>{foodType.etcFood}</option>
            </select>
          </InfoRow>
          <InfoRow>
            <span>메뉴 이름</span>
            <input onChange={changeMenu} value={menu} required></input>
          </InfoRow>
          <InfoRow>
            <span>지역 </span>
            <input onChange={changeRegion} value={region} required></input>
          </InfoRow>
          <InfoRow>
            <span>식당 이름</span>
            <input value={restaurant} onChange={changeRestaurant}></input>
          </InfoRow>
          <small>세트 메뉴인 경우, 합계 가격을 적어주세요!</small>
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
            <span>이정도 가격이면...</span>
            <select onChange={changeEvaluation}>
              <option>{evaluationType.average}</option>
              <option>{evaluationType.expensive}</option>
              <option>{evaluationType.cheap}</option>
            </select>
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
