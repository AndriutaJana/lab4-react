import React from "react";
import { useQuiz } from "../context/QuizContext";

const Question = () => {
  const {
    questions,
    currentQuestionIndex,
    submitAnswer,
    timeLeft,
    quizSettings,
    theme,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    submitAnswer(answer);
  };

  if (!currentQuestion) {
    return <div className="text-center py-8">Se încarcă întrebările...</div>;
  }

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {currentQuestion.category}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            currentQuestion.difficulty === "Ușor"
              ? "bg-green-500"
              : currentQuestion.difficulty === "Mediu"
              ? "bg-yellow-500"
              : "bg-red-500"
          } text-white`}
        >
          {currentQuestion.difficulty}
        </span>
      </div>

      {quizSettings.timePerQuestion > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                timeLeft > quizSettings.timePerQuestion / 2
                  ? "bg-green-500"
                  : timeLeft > quizSettings.timePerQuestion / 4
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${(timeLeft / quizSettings.timePerQuestion) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-right">Timp rămas: {timeLeft}s</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`w-full text-left p-3 rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Întrebarea {currentQuestionIndex + 1} din {questions.length}
      </div>
    </div>
  );
};

export default Question;
