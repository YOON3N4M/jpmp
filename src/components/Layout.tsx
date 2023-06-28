import Link from "next/link";
import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  @media (min-width: 900px) {
    width: 900px;
  }
  margin: 0 auto;

  //background-color: #0884ba;
  border-radius: 1rem;
  padding: 2rem 0px;
`;

export const TitleContainer = styled.div`
  h1 {
    text-align: center;
    font-size: 5rem;
    font-weight: 600;
    color: white;
  }
  margin: 0 auto;
  width: 60%;
  //background-color: #cececea7;
  border-radius: 8px;
  cursor: pointer;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <AppContainer>
      {" "}
      <TitleContainer>
        <Link legacyBehavior href="/">
          <h1>진품먹품</h1>
        </Link>
      </TitleContainer>
      {children}
    </AppContainer>
  );
}
