import { dbService } from "@/fBase";
import { collection, getDocs, query } from "firebase/firestore";
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
interface QuizT {
  attachmentURL: string;
  desc: string;
  evaluation: string;
  isSet: boolean;
  menu: string;
  price: number;
  region: string;
  restaurant: string;
  type: string;
}

export default function SelectQuiz() {
  const [quizs, setQuizs] = useState<QuizT[]>([]);

  //firebase db에서 퀴즈를 불러옴
  async function getQuizFromDB() {
    let docTemp: any = [];
    const q = query(collection(dbService, "quiz"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => docTemp.push(doc.data()));
    setQuizs(docTemp);
  }

  useEffect(() => {
    getQuizFromDB();
  }, []);

  console.log(quizs);

  return (
    <QuizContainer>
      <h1>선택 퀴즈</h1>
      <TypeRow>
        <h2>한식</h2>
      </TypeRow>

      <TypeRow>
        <h2>양식</h2>
      </TypeRow>
      <TypeRow>
        <h2>일식</h2>
      </TypeRow>
      <TypeRow>
        <h2>중식</h2>
      </TypeRow>
      <TypeRow>
        <h2>디저트/음료</h2>
      </TypeRow>
      <TypeRow>
        <h2>기타</h2>
      </TypeRow>
    </QuizContainer>
  );
}
