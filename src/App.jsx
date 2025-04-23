import React from "react";
import { useQuiz } from "./context/QuizContext";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  const { quizStarted, quizCompleted } = useQuiz();

  return (
    <div>
      {!quizStarted && <Start />}
      {quizStarted && !quizCompleted && <Quiz />}
      {quizCompleted && <Results />}
    </div>
  );
}

export default App;
