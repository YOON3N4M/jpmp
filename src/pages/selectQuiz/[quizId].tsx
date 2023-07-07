import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { QuizContainer, QuizT } from ".";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dbService } from "@/fBase";
import styled from "styled-components";
import { StyledBtn, StyledInput } from "../add";

const FoodIMG = styled.img`
  max-width: 30rem;

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
    }
    .correct-ratio {
      color: #ffc04a;
      margin-bottom: 1rem;
    }
  }
`;

export default function QuizPage() {
  const router = useRouter();
  const { quizId } = router.query;

  const [quiz, setQuiz] = useState<QuizT>();
  const [minPrice, setMinPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [correctRatio, setCorrectRatio] = useState<number>();
  const [docId, setDocId] = useState<any>();

  async function getQuizFromDB() {
    let docTemp: any = [];
    let docIdTemp: any = [];
    const q = query(collection(dbService, "quiz"), where("id", "==", quizId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docTemp.push(doc.data());
      setDocId(doc.id);
    });

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

  async function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const docRef = doc(dbService, "quiz", docId);
    await updateDoc(docRef, { try: increment(1) });
    if (answer === price) {
      //정답 +1
      await updateDoc(docRef, { correct: increment(1) });
      if (window.confirm("정답 입니다! 문제 목록으로 돌아갑니다.")) {
        router.push("/selectQuiz");
      }
    } else if (answer >= minPrice && answer <= maxPrice) {
      //정답 +1
      await updateDoc(docRef, { correct: increment(1) });
      if (
        window.confirm(
          "오차범위 10% 정답 입니다! 정확한 가격을 확인 하시겠어요? (취소시 곧 바로 문제 목록으로 돌아갑니다.)"
        )
      ) {
        alert(`정답은 ${quiz?.price} 원 입니다. 문제 목록으로 돌아갑니다.`);
        router.push("/selectQuiz");
      } else {
        router.push("/selectQuiz");
      }
    } else {
      //오답 +1
      await updateDoc(docRef, { inCorrect: increment(1) });
      if (
        window.confirm(
          "오답입니다! 정확한 가격을 확인 하시겠어요? (취소시 곧 바로 문제 목록으로 돌아갑니다.)"
        )
      ) {
        alert(`정답은 ${quiz?.price} 원 입니다. 문제 목록으로 돌아갑니다.`);
        router.push("/selectQuiz");
      } else {
        router.push("/selectQuiz");
      }
    }
  }

  async function aboutCorrectRatio() {
    if (quiz === undefined) return;
    //정답률 구현을 위해 db>음식코드>try(문제 풀어진 횟수)가 있는지 체크한 후 없으면 추가
    if (quiz.try === undefined) {
      const docRef = doc(dbService, "quiz", docId);
      await updateDoc(docRef, { try: 0, correct: 0, inCorrect: 0 });
    } else {
      //try 값이 있으면 정답률 계산 후 setCorrectRatio
      if (quiz.correct === undefined || quiz.inCorrect === undefined) return;
      const ratio: number = (quiz.correct / quiz.try) * 100;
      if (quiz.try === 0) {
        setCorrectRatio(-1);
      } else {
        setCorrectRatio(Math.round(ratio));
      }
    }
  }

  useEffect(() => {
    getQuizFromDB();
  }, []);

  useEffect(() => {
    aboutCorrectRatio();
  }, [quiz]);
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
              {correctRatio === undefined || correctRatio === -1 ? (
                <span className="correct-ratio">
                  아직 문제를 푼 사람이 없습니다!
                </span>
              ) : (
                <span className="correct-ratio">정답률: {correctRatio}%</span>
              )}
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
