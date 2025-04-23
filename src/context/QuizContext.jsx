import React, { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [quizSettings, setQuizSettings] = useState({
    randomOrder: false,
    timePerQuestion: 0,
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const startQuiz = (name, settings) => {
    setName(name);
    setQuizSettings(settings);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);

    if (settings.timePerQuestion > 0) {
      setTimeLeft(settings.timePerQuestion);
      setTimerActive(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setName("");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setTimerActive(false);
  };

  const submitAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (quizSettings.timePerQuestion > 0) {
        setTimeLeft(quizSettings.timePerQuestion);
      }
    } else {
      setQuizCompleted(true);
      setTimerActive(false);
      saveScore(name, score + (isCorrect ? 1 : 0));
    }
  };

  const saveScore = (playerName, playerScore) => {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const existingPlayerIndex = scores.findIndex(
      (score) => score.name === playerName
    );

    if (existingPlayerIndex >= 0) {
      if (playerScore > scores[existingPlayerIndex].score) {
        scores[existingPlayerIndex].score = playerScore;
      }
    } else {
      scores.push({ name: playerName, score: playerScore });
    }

    localStorage.setItem("quizScores", JSON.stringify(scores));
  };

  const getScores = () => {
    return JSON.parse(localStorage.getItem("quizScores")) || [];
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await import("../data/questions.json");
        let questionsData = response.default;

        if (quizSettings.randomOrder) {
          questionsData = [...questionsData].sort(() => Math.random() - 0.5);
        }

        setQuestions(questionsData);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted, quizSettings.randomOrder]);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      submitAnswer(""); // Time's up, submit empty answer
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(quizSettings.timePerQuestion);
      } else {
        setQuizCompleted(true);
        setTimerActive(false);
      }
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  return (
    <QuizContext.Provider
      value={{
        theme,
        toggleTheme,
        name,
        quizSettings,
        questions,
        currentQuestionIndex,
        score,
        userAnswers,
        quizStarted,
        quizCompleted,
        timeLeft,
        startQuiz,
        submitAnswer,
        resetQuiz,
        getScores,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
