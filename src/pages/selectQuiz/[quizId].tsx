import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { QuizT } from ".";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { dbService } from "@/fBase";

export default function QuizPage() {
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
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(Number(event.target.value));
  }

  function submitAnswer() {
    if (answer) {
    }
  }

  useEffect(() => {
    getQuizFromDB();
  }, []);

  console.log(router);
  return (
    <>
      {quiz !== undefined ? (
        <>
          {" "}
          <h1>{quiz?.menu}</h1>
          <form onSubmit={submitAnswer}>
            <input type="number" onChange={onChange}></input>
          </form>
        </>
      ) : null}
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
