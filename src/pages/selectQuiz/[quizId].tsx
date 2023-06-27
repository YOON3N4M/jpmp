import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { QuizContainer, QuizT } from ".";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { dbService } from "@/fBase";
import styled from "styled-components";
import { StyledBtn, StyledInput } from "../add";

const FoodIMG = styled.img`
  width: 500px;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-radius: 8px;
`;
const Info = styled.span`
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.2rem 0.2rem;
  font-size: 0.8rem;
  margin-right: 0.3rem;
`;

const QuizDescContainer = styled.div`
  width: 80%;
  border-radius: 8px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: #cecece94;
  margin: 0 auto;
  align-items: center;
  * {
    text-align: center;
  }
`;

const Desc = styled.span`
  display: block;
`;

export default function QuizPage() {
  const [minPrice, setMinPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [quiz, setQuiz] = useState<QuizT>();

  const router = useRouter();
  const { quizId } = router.query;

  async function getQuizFromDB() {
    let docTemp: any = [];
    const q = query(collection(dbService, "quiz"), where("id", "==", quizId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => docTemp.push(doc.data()));
    setQuiz(docTemp[0]);
    //정답 범위의 최소값, 최대값 설정
    if (docTemp[0] !== undefined) {
      setMinPrice(docTemp[0].price - docTemp[0].price * 0.1);
      setMaxPrice(docTemp[0].price + docTemp[0].price * 0.1);
      setPrice(docTemp[0].price);
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(Number(event.target.value));
  }

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer === price) {
      console.log("정확한 정답");
    } else if (answer >= minPrice && answer <= maxPrice) {
      console.log("범위 정답");
    } else {
      console.log("틀렸습니다.");
    }
  }

  useEffect(() => {
    getQuizFromDB();
  }, []);

  return (
    <>
      {quiz !== undefined ? (
        <>
          {" "}
          <QuizDescContainer>
            <FoodIMG src={quiz.attachmentURL} />

            <div>
              <h2>{quiz.menu}</h2>
              <Info>{quiz.type}</Info>
              <Info>{quiz.isSet ? "세트" : "단품"}</Info>
              <Info>{quiz.region}</Info>
            </div>
            <div>
              <Desc>{quiz.desc}</Desc>
              <span>등록인의 평가 : {quiz.evaluation}</span>
            </div>
            <div>
              <form onSubmit={submitAnswer}>
                <StyledInput type="number" onChange={onChange}></StyledInput>
                <StyledBtn type="submit">정답!</StyledBtn>
              </form>
            </div>
          </QuizDescContainer>
        </>
      ) : (
        <h1>비정상적인 접근입니다.</h1>
      )}
    </>
  );
}

export async function getServerSideProps({ query: { quizId } }: any) {
  return {
    props: {
      quizId,
    },
  };
}
