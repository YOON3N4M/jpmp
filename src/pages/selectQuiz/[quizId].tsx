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
  background-color: #ffffff37;
`;

const QuizDescContainer = styled.div`
  width: 80%;
  border-radius: 8px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  //background-color: #cecece94;
  margin: 0 auto;
  align-items: center;
  * {
    text-align: center;
  }
  .main-info {
    h2 {
      display: inline;
      margin-right: 1rem;
    }
    span {
      color: #ffffffa7;
    }
  }
  .sub-info {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .evaluation-box {
    border-top: 1px solid white;
    padding-top: 2rem;
    min-width: 80%;
    span {
      display: block;
    }
    .evaluation {
      color: #ffc04a;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
  }
`;

export default function QuizPage() {
  const router = useRouter();
  const { quizId } = router.query;

  const [minPrice, setMinPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [quiz, setQuiz] = useState<QuizT>();

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
      if (window.confirm("정답 입니다! 문제 목록으로 돌아갑니다.")) {
        router.push("/selectQuiz");
      }
    } else if (answer >= minPrice && answer <= maxPrice) {
      if (
        window.confirm(
          "오차범위 10% 정답 입니다! 정확한 가격을 확인 하시겠습니다? (취소시 곧 바로 문제 목록으로 돌아갑니다.)"
        )
      ) {
        alert(`정답은 ${quiz?.price} 원 입니다. 문제 목록으로 돌아갑니다.`);
        router.push("/selectQuiz");
      } else {
        router.push("/selectQuiz");
      }
    } else {
      if (
        window.confirm(
          "오답입니다! 정확한 가격을 확인 하시겠습니다? (취소시 곧 바로 문제 목록으로 돌아갑니다.)"
        )
      ) {
        alert(`정답은 ${quiz?.price} 원 입니다. 문제 목록으로 돌아갑니다.`);
        router.push("/selectQuiz");
      } else {
        router.push("/selectQuiz");
      }
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

            <div className="main-info">
              <h2>{quiz.menu}</h2>
              <span>{quiz.restaurant}</span>
            </div>
            <div className="sub-info">
              <Info>#{quiz.type}</Info>
              <Info>#{quiz.isSet ? "세트" : "단품"}</Info>
              <Info>#{quiz.region}</Info>
            </div>
            <div className="evaluation-box">
              <span>{quiz.desc}</span>
              <span className="evaluation">Hint: {quiz.evaluation}</span>
            </div>
            <div>
              <form onSubmit={submitAnswer}>
                <StyledInput
                  type="number"
                  onChange={onChange}
                  placeholder="예상 가격은"
                ></StyledInput>
                <StyledBtn type="submit">정답 입력</StyledBtn>
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
