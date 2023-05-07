import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  @media (min-width: 900px) {
    width: 900px;
  }
  margin: 0 auto;
  min-height: 1000px;
  background-color: white;
  border-radius: 1rem;
  padding: 5rem 0px;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  return <AppContainer>{children}</AppContainer>;
}
