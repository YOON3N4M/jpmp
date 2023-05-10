import Link from "next/link";
import styled from "styled-components";

const TitleContainer = styled.div`
  h1 {
    text-align: center;

    font-size: 5rem;
  }
`;

const MainHeader = styled.div`
  display: flex;
  div {
    padding: 1rem 1rem;
    margin: 0 auto;
    width: 70%;
    background-color: #e8ded0e1;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 2rem;
  }
`;

const MainBody = styled.div`
  margin: 0 auto;
  display: flex;
  width: 80%;
  border: 1px solid black;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  background-color: #e8ded0e1;
  padding: 1rem 1rem;
  h2 {
    text-align: center;
    font-size: 3rem;
  }
`;

const StyledAnchor = styled.a`
  width: 30%;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
  background-color: red;
  border-radius: 30px;
  line-height: 3rem;
  cursor: pointer;
`;

export default function Home() {
  return (
    <>
      <TitleContainer>
        <h1>🍖진품먹품🍖</h1>
      </TitleContainer>
      <MainHeader>
        <div>
          <span>진품먹품은?</span>
          <p>
            제시되는 음식 사진과 메뉴 구성, 퀄리티, 지역, 재료 등의 정보들을
            참고하여 예상되는 가격을 맞추어보는 간단한 게임 입니다!
          </p>
          <p>
            문제를 풀며 새로운 음식이나 맛집을 발견하고, 문제를 등록하며 먹었던
            음식들을 공유 해보세요!
          </p>
        </div>
      </MainHeader>
      <MainBody>
        <h2>문제 풀기</h2>
        <Link legacyBehavior href="/randomQuiz">
          <StyledAnchor>랜덤문제</StyledAnchor>
        </Link>
        <Link legacyBehavior href="/selectQuiz">
          <StyledAnchor>선택문제</StyledAnchor>
        </Link>
        <h2>문제 내기</h2>
        <Link legacyBehavior href="/add">
          <StyledAnchor>문제 내기</StyledAnchor>
        </Link>
      </MainBody>
    </>
  );
}
