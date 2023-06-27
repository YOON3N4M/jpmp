import Link from "next/link";
import styled from "styled-components";

const MainHeader = styled.div`
  display: flex;
  h2 {
    color: white;
    text-align: center;
    display: block;
    margin: 0 auto;
    margin-top: -3rem;
  }
  div {
    padding: 1rem 1rem;
    margin: 0 auto;
    width: 70%;
    background-color: #e8ded0e1;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 2rem;
    p {
      text-align: left;
    }
  }
`;

const MainBody = styled.div`
  margin: 0 auto;
  margin-top: 5rem;
  display: flex;
  width: 80%;

  border-radius: 10px;
  flex-direction: row;
  align-items: center;

  padding: 1rem 1rem;
  justify-content: space-between;
  h2 {
    text-align: center;
    font-size: 3rem;
    color: #666666;
  }
  .big-button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 4rem 1rem;
    width: 45%;
    height: 20rem;
    background-color: #f8f8f8;
    border-radius: 8px;
    border: 0px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    span {
      color: #666666;
      font-size: 1rem;
      font-weight: 500;
    }
  }

  .horizontal {
    width: 2px;
    height: 15rem;
    background-color: #ffffff5e;
  }
`;

export default function Home() {
  return (
    <>
      <MainHeader>
        <h2>이 메뉴 얼마게~?! 🧐</h2>
      </MainHeader>
      <MainBody>
        {" "}
        <Link legacyBehavior href="/selectQuiz">
          <button className="big-button">
            <h2>문제 풀기</h2>
            <span>한식, 양식, 일식, 중식, 디저트와 음료까지 다양한 메뉴!</span>
          </button>
        </Link>
        <div className="horizontal"></div>
        <Link legacyBehavior href="/add">
          <button className="big-button">
            <h2>문제 내기</h2>
            <span>메뉴를 등록 해보세요!</span>
          </button>
        </Link>
      </MainBody>
    </>
  );
}
