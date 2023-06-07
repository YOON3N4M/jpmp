import { dbService } from "@/fBase";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const QuizContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
  }
`;

const TypeRow = styled.div`
  width: 100%;
  text-align: center;
`;

const FoodImgContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 45rem;
  flex-wrap: wrap;
`;

const FoodImg = styled.img`
  width: 14rem;
  height: 14rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 1rem;
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
    setKorFood(docTemp.filter((quiz: QuizT) => quiz.type === "한식"));
    setChnFood(docTemp.filter((quiz: QuizT) => quiz.type === "중식"));
    setJpnFood(docTemp.filter((quiz: QuizT) => quiz.type === "일식"));
    setWesFood(docTemp.filter((quiz: QuizT) => quiz.type === "양식"));
    setDesFood(docTemp.filter((quiz: QuizT) => quiz.type === "디저트/음료"));
    setEtcFood(docTemp.filter((quiz: QuizT) => quiz.type === "기타"));
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
                  <FoodImg key={quiz.id} src={quiz.attachmentURL} />
                </Link>
              ))
            : null}
        </FoodImgContainer>
      </>
    );
  }

  return (
    <QuizContainer>
      <h1>선택 퀴즈</h1>
      <TypeRow>
        <h2>한식</h2>
      </TypeRow>
      <RenderQuiz quiz={korFood} />
      <TypeRow>
        <h2>양식</h2>
      </TypeRow>
      <RenderQuiz quiz={wesFood} />
      <TypeRow>
        <h2>일식</h2>
      </TypeRow>
      <RenderQuiz quiz={jpnFood} />
      <TypeRow>
        <h2>중식</h2>
      </TypeRow>
      <RenderQuiz quiz={chnFood} />
      <TypeRow>
        <h2>디저트/음료</h2>
      </TypeRow>
      <RenderQuiz quiz={desFood} />
      <TypeRow>
        <h2>기타</h2>
      </TypeRow>
      <RenderQuiz quiz={etcFood} />
    </QuizContainer>
  );
}
