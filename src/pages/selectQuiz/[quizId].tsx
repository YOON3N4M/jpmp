import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { QuizT } from ".";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { dbService } from "@/fBase";

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
          <h1>{quiz.menu}</h1>
          <form onSubmit={submitAnswer}>
            <input type="number" onChange={onChange}></input>
          </form>
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
