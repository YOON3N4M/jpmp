import { motion } from "framer-motion";
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

export const TitleContainer = styled(motion.div)`
  h1 {
    transition: color 0.5s ease;
    text-align: center;
    font-size: 5rem;
    font-weight: 600;
    color: white;
    :hover {
      color: RGB(5, 132, 187);
    }
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
      <TitleContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Link legacyBehavior href="/">
          <h1>진품먹품</h1>
        </Link>
      </TitleContainer>
      {children}
    </AppContainer>
  );
}
