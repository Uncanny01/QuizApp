import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {

  const navigateTo = useNavigate();

  const location = useLocation();
  const { correctAnswers, totalQuestions } = location.state || {
    correctAnswers: 0,
    totalQuestions: 0,
  };

  return (
    <div className="flex flex-col items-center justify-center w-[400px] m-auto p-[20px] rounded bg-[#fff] text-[#242424] gap-3 shadow-md">
      <h2>Quiz Results: </h2>
      <p>
        You scored {correctAnswers} out of {totalQuestions}!
      </p>
      <button className="px-5 py-2 rounded text-white text-lg bg-[#023047] hover:bg-[#022a3a] transition-colors cursor-pointer" onClick={()=>navigateTo("/")}>Return</button>
    </div>
  );
};

export default Results;