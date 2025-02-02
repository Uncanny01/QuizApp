import { createContext, useState, useEffect } from "react";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(() => {
    // Load from localStorage on mount
    const savedData = localStorage.getItem("quizData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    // Save to localStorage when quizData changes
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }, [quizData]);

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
