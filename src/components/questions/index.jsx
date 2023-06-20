import React, { useEffect, useState } from 'react';
import client from '../../cliente';
import './questions.css';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await client.fetch('*[_type == "question"]');
        setQuestions(response);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowResult(true);

    const currentQuestion = questions[currentQuestionIndex];
    const correctOptionIndex = currentQuestion.correctOption;
    if (optionIndex === correctOptionIndex) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  if (questions.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const { options } = currentQuestion;
  const correctOptionIndex = currentQuestion.correctOption;

  return (
    <div>
      <h3>{currentQuestion.title}</h3>
      <ul>
        {options.map((option, optionIndex) => (
          <li key={ optionIndex }>
            {/* <button
              onClick={ () => handleOptionClick(optionIndex) }
              disabled={ showResult }
              className={ `${
                showResult
                && selectedOption === optionIndex
                && selectedOption === correctOptionIndex
                  ? 'correct'
                  : selectedOption === optionIndex
                    ? 'errado'
                    : ''
              }` }
            >
              {option}
            </button> */}
            <button
              onClick={ () => handleOptionClick(optionIndex) }
              className={ `${showResult}` }
              disabled={ showResult }
            >
              { option }
            </button>
          </li>
        ))}
      </ul>
      {showResult && (
        <p>
          Sua resposta:
          {' '}
          {
            selectedOption === correctOptionIndex
              ? 'Correta'
              : 'Incorreta'
          }
        </p>
      )}
      {showResult && (
        <button onClick={ handleNextQuestion }>
          {
            currentQuestionIndex === questions.length - 1
              ? 'Finalizar'
              : 'Próxima Pergunta'
          }
        </button>
      )}
      <div>
        Total de respostas corretas:
        {' '}
        {correctAnswers}
      </div>
    </div>
  );
}
