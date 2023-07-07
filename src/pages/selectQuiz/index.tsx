import { dbService } from "@/fBase";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { foodType } from "../add";
import { motion } from "framer-motion";

export const QuizContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: left;
    font-weight: 900;
  }
`;

const TypeRow = styled.div<{ tooLongText?: boolean }>`
  width: 100%;
  text-align: center;
  div {
    width: ${(props) => (props.tooLongText ? "10rem" : "6rem")};
    height: 3rem;
    //background-color: #ffffff45;
    border-bottom: 1px solid #ffffff99;
    margin-left: 6rem;
    margin-bottom: 1rem;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);

    h2 {
      line-height: 3rem;
    }
  }
`;

const FoodImgContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 45rem;
  //min-height: 15rem;
  flex-wrap: wrap;
  // background-color: #cecece94;
  padding: 2rem 1rem;
  border-radius: 8px;
  transition: height 5s ease;
`;

export const FoodCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  width: 14rem;
  height: 15rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  .menu {
    margin-top: 1rem;
    color: #666666;
  }
  .restaurant {
    margin-top: 0.2rem;
    color: #adadad;
  }
  a {
    width: 10rem;
    height: 10rem;
  }
`;

export const FoodImg = styled.img`
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
`;

export interface QuizT {
  id: string; //| undefined | string[];
  attachmentURL: string; //| undefined | string[];
  desc: string; //| undefined | string[];
  evaluation: string; //| undefined | string[];
  isSet: boolean; //| undefined | string[] | string;
  menu: string; //| undefined | string[];
  price: number; //| undefined | string[] | string;
  region: string; //| undefined | string[];
  restaurant: string; //| undefined | string[];
  type: string; //| undefined | string[];
  try?: number;
  correct?: number;
  inCorrect?: number;
}

export default function SelectQuiz() {
  const [quizs, setQuizs] = useState<QuizT[]>([]);
  // 순서대로 한(kor),중(chn),일(jpn),양(wes),디저트/음료(des),기타
  const [korFood, setKorFood] = useState<QuizT[]>([]);
  const [chnFood, setChnFood] = useState<QuizT[]>([]);
  const [jpnFood, setJpnFood] = useState<QuizT[]>([]);
  const [wesFood, setWesFood] = useState<QuizT[]>([]);
  const [desFood, setDesFood] = useState<QuizT[]>([]);
  const [etcFood, setEtcFood] = useState<QuizT[]>([]);

  const router = useRouter();

  //firebase db에서 퀴즈를 불러옴
  async function getQuizFromDB() {
    let docTemp: any = [];
    const q = query(collection(dbService, "quiz"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => docTemp.push(doc.data()));
    setQuizs(docTemp);
    setKorFood(docTemp.filter((quiz: QuizT) => quiz.type === foodType.korFood));
    setChnFood(docTemp.filter((quiz: QuizT) => quiz.type === foodType.chnFood));
    setJpnFood(docTemp.filter((quiz: QuizT) => quiz.type === foodType.jpnFood));
    setWesFood(docTemp.filter((quiz: QuizT) => quiz.type === foodType.wesFood));
    setDesFood(docTemp.filter((quiz: QuizT) => quiz.type === foodType.desFood));
    setEtcFood(docTemp.filter((quiz: QuizT) => quiz.type === foodType.etcFood));
  }

  useEffect(() => {
    getQuizFromDB();
  }, []);

  console.log(etcFood);

  function RenderQuiz(quizObj: any) {
    const { quiz } = quizObj;
    return (
      <>
        <FoodImgContainer>
          {quiz.length !== 0
            ? quiz.map((quiz: QuizT) => (
                <Link
                  href={{
                    pathname: `/selectQuiz/${quiz.id}`,
                    query: {
                      id: quiz.id,
                    },
                  }}
                  as={`/selectQuiz/${quiz.id}`}
                  key={quiz.id}
                >
                  <FoodCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <FoodImg src={quiz.attachmentURL} />

                    <span className="menu">{quiz.menu}</span>
                    <span className="restaurant">{quiz.restaurant}</span>
                  </FoodCard>{" "}
                </Link>
              ))
            : null}
        </FoodImgContainer>
      </>
    );
  }

  return (
    <QuizContainer>
      <TypeRow>
        <div>
          <h2>한식</h2>
        </div>
      </TypeRow>
      <RenderQuiz quiz={korFood} />
      <TypeRow>
        <div>
          <h2>양식</h2>
        </div>
      </TypeRow>
      <RenderQuiz quiz={wesFood} />
      <TypeRow>
        <div>
          <h2>일식</h2>
        </div>
      </TypeRow>
      <RenderQuiz quiz={jpnFood} />
      <TypeRow>
        <div>
          <h2>중식</h2>
        </div>
      </TypeRow>
      <RenderQuiz quiz={chnFood} />
      <TypeRow tooLongText={true}>
        <div>
          <h2>디저트/음료</h2>
        </div>
      </TypeRow>
      <RenderQuiz quiz={desFood} />
      <TypeRow>
        <div>
          <h2>기타</h2>
        </div>
      </TypeRow>
      <RenderQuiz quiz={etcFood} />
    </QuizContainer>
  );
}
