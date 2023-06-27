import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../cliente';
import './questions.css';
import alertSoundWrong from '../../assets/wrong_answer.mp3';
import alertSoundRight from '../../assets/right_answer.mp3';

interface Question {
  title: string;
  options: string[];
  correctOption: number;
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(30); // Tempo inicial do timer em segundos

  const timerRef = useRef<number>();
  const navigate = useNavigate();

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

  useEffect(() => {
    const countdown = () => {
      setTimer((prevTimer) => prevTimer - 1);
    };

    timerRef.current = window.setTimeout(() => {
      countdown();
    }, 1000);

    if (timer === 0) {
      clearTimeout(timerRef.current);
      setShowResult(true);
      playalertSoundWrong();
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timer]);

  const shuffleArray = (array: Question[]) => {
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

  const handleOptionClick = (optionIndex: number) => {
    clearTimeout(timerRef.current);
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
    clearTimeout(timerRef.current);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimer(30);
    } else {
      navigate('/feedback');
    }
  };

  const handleClass = (currentQuestion: Question, optionIndex: number) => {
    if (showResult && selectedOption === optionIndex) {
      if (selectedOption === currentQuestion.correctOption) {
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
      <div className="timer">
        Tempo Restante:
        {' '}
        {timer}
        s
      </div>
      <ul>
        {options.map((option, optionIndex) => (
          <li key={ optionIndex }>
            <button
              onClick={ () => handleOptionClick(optionIndex) }
              className={ handleClass(currentQuestion, optionIndex) }
              disabled={ showResult }
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {showResult && (
        <p>
          {timer === 0 && 'Seu tempo acabou'}
          {timer !== 0 && (
            <>
              Sua resposta está
              {' '}
              {selectedOption === correctOptionIndex ? 'Correta' : 'Incorreta'}
            </>
          )}
        </p>
      )}
      {showResult && (
        <button onClick={ handleNextQuestion }>
          {currentQuestionIndex === questions.length - 1
            ? 'Finalizar'
            : 'Próxima Pergunta'}
        </button>
      )}
      <div>
        Total de respostas corretas:
        {' '}
        {correctAnswers}
        {' '}
        /
        {' '}
        {questions.length}
      </div>
    </div>
  );
}
