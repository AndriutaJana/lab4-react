import React from "react";
import { useQuiz } from "../context/QuizContext";

const Results = () => {
  const {
    name,
    score,
    questions,
    userAnswers,
    resetQuiz,
    getScores,
    theme,
    toggleTheme,
  } = useQuiz();

  const scores = getScores();

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Rezultate Quiz</h1>
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

        <div
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Felicitări, {name}!</h2>
          <p className="text-lg mb-6">
            Ai obținut <span className="font-bold">{score}</span> din{" "}
            <span className="font-bold">{questions.length}</span> puncte!
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Detalii răspunsuri:</h3>
            <div className="space-y-4">
              {userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-3 rounded border ${
                    answer.isCorrect
                      ? theme === "dark"
                        ? "border-green-500 bg-green-900 bg-opacity-30"
                        : "border-green-500 bg-green-100"
                      : theme === "dark"
                      ? "border-red-500 bg-red-900 bg-opacity-30"
                      : "border-red-500 bg-red-100"
                  }`}
                >
                  <p className="font-medium mb-1">{answer.question}</p>
                  <p
                    className={
                      answer.isCorrect ? "text-green-600" : "text-red-600"
                    }
                  >
                    Răspunsul tău: {answer.userAnswer || "(fără răspuns)"}
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-green-600">
                      Răspuns corect: {answer.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className={`w-full py-2 px-4 rounded font-medium ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Începe un nou quiz
          </button>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Clasament</h2>
          {scores.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <th className="p-3 text-left">Nume</th>
                    <th className="p-3 text-left">Scor maxim</th>
                  </tr>
                </thead>
                <tbody>
                  {scores
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-200"
                        } ${
                          player.name === name
                            ? theme === "dark"
                              ? "bg-blue-900 bg-opacity-30"
                              : "bg-blue-100"
                            : ""
                        }`}
                      >
                        <td className="p-3">{player.name}</td>
                        <td className="p-3">{player.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nu există scoruri salvate.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
