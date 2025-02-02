import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import styled from 'styled-components';
import Loader from "./Loader";
import { QuizContext } from "../utils/quizContext";

const Button = () => {

  const [loader, setLoader] = useState(false);
  const { setQuizData } = useContext(QuizContext);

  const navigateTo  = useNavigate();

  const fetchQuizData = async ()=>{
    setLoader(true);
    await axios.get("/api/Uw5CrX")
    .then((response)=>{
      const questionArray = response.data.questions
      setQuizData(questionArray);
      console.log(questionArray);
      
      localStorage.setItem("quizData", JSON.stringify(questionArray));
      navigateTo("/quiz");
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  if(loader) return <Loader/>

  return (
    <StyledWrapper>
      <button className="button" onClick={fetchQuizData}>Start Quiz</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    /* in scss with just one variable i can change opacity with rgba(variable, opacity) but in css it's not possible so i have used three seperate variables */
    /* with hue-rotate color can be changed */
    --main-color: rgb(46, 213, 115);
    --main-bg-color: rgba(46, 213, 116, 0.36);
    --pattern-color: rgba(46, 213, 116, 0.073);

    /* change this rotation value */
    filter: hue-rotate(0deg);

    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    background: radial-gradient(
        circle,
        var(--main-bg-color) 0%,
        rgba(0, 0, 0, 0) 95%
      ),
      linear-gradient(var(--pattern-color) 1px, transparent 1px),
      linear-gradient(to right, var(--pattern-color) 1px, transparent 1px);
    background-size:
      cover,
      15px 15px,
      15px 15px;
    background-position:
      center center,
      center center,
      center center;
    border-image: radial-gradient(
        circle,
        var(--main-color) 0%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
    border-width: 1px 0 1px 0;
    color: var(--main-color);
    padding: 1rem 3rem;
    font-weight: 700;
    font-size: 1.5rem;
    transition: background-size 0.2s ease-in-out;
  }

  .button:hover {
    background-size:
      cover,
      10px 10px,
      10px 10px;
  }
  .button:active {
    filter: hue-rotate(250deg);
  }`;

export default Button;
