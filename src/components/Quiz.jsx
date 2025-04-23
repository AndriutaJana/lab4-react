import React from "react";
import { useQuiz } from "../context/QuizContext";
import Question from "./Question";

const Quiz = () => {
  const { theme, toggleTheme, quizCompleted } = useQuiz();

  if (quizCompleted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quiz React</h1>
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 rounded ${
              theme === "dark"
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <Question />
      </div>
    </div>
  );
};

export default Quiz;
