import styled from "styled-components";

const TitleContainer = styled.div`
  h1 {
    text-align: center;
    font-family: "BMJUA";
    font-size: 5rem;
  }
`;

export default function Home() {
  return (
    <>
      <TitleContainer>
        <h1>진품먹품</h1>
      </TitleContainer>
    </>
  );
}
