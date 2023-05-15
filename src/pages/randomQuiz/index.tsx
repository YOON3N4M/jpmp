import { dbService } from "@/fBase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { QuizT } from "../selectQuiz";

export default function RandomQuiz() {
  const [quizs, setQuizs] = useState<QuizT[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizT>();

  async function getQuizFromDB() {
    let docTemp: any[] = [];
    const q = query(collection(dbService, "quiz"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => docTemp.push(doc.data()));

    setQuizs(docTemp);
    //랜덤 문제를 한 개 선정
    const randomNum = Math.floor(Math.random() * docTemp.length);
    setSelectedQuiz(docTemp[randomNum]);
  }

  useEffect(() => {
    getQuizFromDB();
  }, []);

  console.log(selectedQuiz);

  return <h1>랜덤 퀴즈</h1>;
}
