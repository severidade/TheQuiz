import React, { useEffect, useState } from 'react';
import client from '../../cliente';
import './questions.css';
import alertSoundWrong from '../../assets/wrong_answer.mp3';
import alertSoundRight from '../../assets/right_answer.mp3';

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
        const shuffledQuestions = shuffleArray(response);
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const playalertSoundWrong = () => {
    const audioErrado = new Audio(alertSoundWrong);
    audioErrado.play();
  };

  const playalertSoundRight = () => {
    const audioCerto = new Audio(alertSoundRight);
    audioCerto.play();
  };

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowResult(true);

    const currentQuestion = questions[currentQuestionIndex];
    const correctOptionIndex = currentQuestion.correctOption;
    if (optionIndex === correctOptionIndex) {
      setCorrectAnswers(correctAnswers + 1);
      playalertSoundRight();
    } else {
      playalertSoundWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handleClass = (correctOptionIndex, optionIndex) => {
    if (showResult && selectedOption === optionIndex) {
      if (selectedOption === correctOptionIndex) {
        return 'correct';
      }
      return 'errado';
    }
    return '';
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
            <button
              onClick={ () => handleOptionClick(optionIndex) }
              className={
                handleClass(correctOptionIndex, optionIndex)
              }
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
