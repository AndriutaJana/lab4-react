import React from "react";
import { useState } from "react";
import { useQuiz } from "../context/QuizContext";

const Start = () => {
  const { startQuiz, theme, toggleTheme } = useQuiz();
  const [name, setName] = useState("");
  const [randomOrder, setRandomOrder] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Te rugăm să introduci un nume");
      return;
    }
    setError("");
    startQuiz(name, {
      randomOrder,
      timePerQuestion: timePerQuestion > 0 ? timePerQuestion : 0,
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Nume:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Introdu numele tău"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="randomOrder"
              checked={randomOrder}
              onChange={(e) => setRandomOrder(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="randomOrder">Ordine aleatorie a întrebărilor</label>
          </div>

          <div>
            <label htmlFor="timePerQuestion" className="block mb-1 font-medium">
              Timp per întrebare (secunde):
            </label>
            <input
              type="number"
              id="timePerQuestion"
              value={timePerQuestion}
              onChange={(e) =>
                setTimePerQuestion(parseInt(e.target.value) || 0)
              }
              min="0"
              className={`w-full p-2 border rounded ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            />
            <p className="text-sm text-gray-500 mt-1">
              0 pentru timp nelimitat
            </p>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded font-medium ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Începe Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Start;
