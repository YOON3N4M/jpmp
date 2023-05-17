import { useRouter } from "next/router";
import { QuizT } from ".";

export default function QuizPage() {
  const router = useRouter();
  const quiz = router.query;
  console.log(quiz);
  return (
    <>
      <h1>{quiz.menu}</h1>
    </>
  );
}
