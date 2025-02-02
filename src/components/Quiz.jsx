import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../utils/quizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { quizData } = useContext(QuizContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(false));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const navigateTo = useNavigate();

  if (!quizData.length) {
    return <p className="text-center text-lg font-semibold">Loading Quiz...</p>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (optionId, is_correct) => {
    setSelectedOption(optionId);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = is_correct;
    setAnswers(newAnswers);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  const handleNext = () => {
    if (selectedOption !== null) {
      if (currentQuestionIndex === quizData.length - 1) {
        const finalAnswers = answers.filter((answer) => answer).length;
        setCorrectAnswers(finalAnswers)
        setIsQuizFinished(true);
      }
      else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }
    }
  };

  useEffect(()=>{
    if(isQuizFinished){
      navigateTo("/results", {
        state: { correctAnswers, totalQuestions: quizData.length },
      })
    }

  }, [isQuizFinished]);

  return (
    <div className="w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-900">
      <h2 className="text-2xl font-bold text-center mb-4">Quiz Questions</h2>
      <div key={currentQuestion.id} className="w-full">
        <h3 className="text-lg font-semibold">{currentQuestion.description}</h3>
        <ul className="list-none p-0 mt-4">
          {currentQuestion.options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option.id, option.is_correct)}
              className={`p-3 my-2 rounded-md cursor-pointer transition-colors duration-300 ${
                selectedOption === option.id ? "bg-teal-400 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {option.description}
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            className={`px-5 py-2 text-white rounded-md font-medium transition-colors duration-300 ${
              currentQuestionIndex === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 cursor-pointer"
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-5 py-2 text-white rounded-md font-medium transition-colors duration-300 ${
              selectedOption === null ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 cursor-pointer"
            }`}
          >
            {currentQuestionIndex < quizData.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;