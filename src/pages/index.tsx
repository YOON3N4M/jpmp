import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

const MainHeader = styled(motion.div)`
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
  margin-bottom: 3rem;
  h2 {
    text-align: center;
    font-size: 3rem;
    color: #666666;
  }
  .big-button {
  }

  .horizontal {
    width: 2px;
    height: 15rem;
    background-color: #ffffff5e;
  }
`;

const BigBtn = styled(motion.button)`
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
  transition: background-color 0.5s;

  :hover {
    background-color: RGB(5, 132, 187);
    h2,
    span {
      color: #f8f8f8;
    }
  }

  cursor: pointer;
  span {
    color: #666666;
    font-size: 1rem;
    font-weight: 500;
  }
  span,
  h2 {
    transition: color 0.4s;
  }
`;

const MainFooter = styled(motion.div)`
  margin: 0 auto;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  padding: 1rem 2rem;
  border-radius: 8px;
  background-color: #f8f8f8;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.5s;
  cursor: pointer;
  :hover {
    background-color: #da4c1f;
    span {
      color: white;
    }
  }
  span {
    color: #666666;
    font-weight: 500;
    transition: color 0.5s;
  }
`;

export default function Home() {
  return (
    <>
      <MainHeader
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
      >
        <h2>이 메뉴 얼마게~?! 🧐</h2>
      </MainHeader>
      <MainBody>
        {" "}
        <Link legacyBehavior href="/selectQuiz">
          <BigBtn
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2>문제 풀기</h2>
            <span>한식, 양식, 일식, 중식, 디저트와 음료까지 다양한 메뉴!</span>
          </BigBtn>
        </Link>
        <div className="horizontal"></div>
        <Link legacyBehavior href="/add">
          <BigBtn
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2>문제 내기</h2>
            <span>메뉴를 등록 해보세요!</span>
          </BigBtn>
        </Link>
      </MainBody>
      <MainFooter
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span>의견 보내기</span>
      </MainFooter>
    </>
  );
}
