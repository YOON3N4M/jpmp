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

    background-color: #8080801c;
  }
  .food-info-input-container {
    display: flex;
    flex-direction: column;
    small {
      display: block;
      margin: 0 auto;
      text-align: center;
      opacity: 30%;
    }
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
  const fileInput = useRef();
  const router = useRouter();

  const [attachment, setAttachment] = useState("");
  const [isSet, setIsSet] = useState(false);
  const [type, setType] = useState("한식");
  const [menu, setMenu] = useState("");
  const [region, setRegion] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [price, setPrice] = useState<number>();
  const [desc, setDesc] = useState("");
  const [evaluation, setEvaluation] = useState("적당했어요!");

  //음식정보 select,input태그의 onChange 함수들
  function changeSet(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "세트") {
      setIsSet(true);
    } else setIsSet(false);
  }
  function changeType(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.value) {
      case "한식":
        setType("한식");
        break;
      case "양식":
        setType("양식");
        break;
      case "일식":
        setType("일식");
        break;
      case "중식":
        setType("중식");
        break;
      case "디저트/음료":
        setType("디저트/음료");
        break;
      case "기타":
        setType("기타");
        break;
      default:
        break;
    }
  }
  function changeEvaluation(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.value) {
      case "적당했어요!":
        setEvaluation("적당했어요!");
        break;
      case "생각보다 비쌌어요!":
        setEvaluation("생각보다 비쌌어요!");
        break;
      case "생각보다 저렴했어요!":
        setEvaluation("생각보다 저렴했어요!");
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
              <option>단품</option>
              <option>세트</option>
            </select>
          </InfoRow>
          <InfoRow>
            <span>분류</span>
            <select onChange={changeType}>
              <option>한식</option>
              <option>양식</option>
              <option>일식</option>
              <option>중식</option>
              <option>디저트/음료</option>
              <option>기타</option>
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
              <option>적당했어요!</option>
              <option>생각보다 비쌌어요!</option>
              <option>생각보다 저렴했어요!</option>
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
