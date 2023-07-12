import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCorrectAnswers, setNumberOfQuestions } from '../../redux/actions';

import client from '../../cliente';
import './questions.css';
// import alertSoundWrong from '../../assets/wrong_answer.mp3';
// import alertSoundRight from '../../assets/right_answer.mp3';

import alertSoundWrong from '../../assets/wrong_answer.mp3';
import alertSoundRight from '../../assets/featured.mp3';

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
  const [timer, setTimer] = useState(30); // Tempo inicial do timer em segundos

  const dispatch = useDispatch();

  const correctAnswers = useSelector(
    (state: { correctAnswers: number }) => state.correctAnswers,
  );

  const numberOfQuestions = useSelector(
    (state: { numberOfQuestions: number }) => state.numberOfQuestions,
  );
  const userName = useSelector((state: { userName: string }) => state.userName);
  const userAge = useSelector((state: { userAge: number | null }) => state.userAge);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);

  const timerRef = useRef<number>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let schemaName = 'question';
        if (userAge && userAge < 10) {
          schemaName = 'questionUnderTen';
        }

        const response = await client.fetch(`*[_type == "${schemaName}"]`);
        const shuffledQuestions = shuffleArray(response);
        setQuestions(shuffledQuestions);
        dispatch(setNumberOfQuestions(shuffledQuestions.length));
        // Resto do código...
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [dispatch, userAge]);

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
      dispatch(setCorrectAnswers(correctAnswers + 1));
      playalertSoundRight();
    } else {
      playalertSoundWrong();
    }
  };

  const handleSaveResults = async () => {
    try {
      const percentage = Math.round((correctAnswers / numberOfQuestions) * 100);
      const commonFields = {
        userName,
        userAge,
        userEmail,
        correctAnswers,
        numberOfQuestions,
        percentage,
      };

      let results;
      if (userAge && userAge < 10) {
        results = {
          _type: 'kids_ranking',
          ...commonFields,
        };
      } else {
        results = {
          _type: 'adult_ranking',
          ...commonFields,
        };
      }
      await client.create(results);
    } catch (error) {
      console.error('Error saving results:', error);
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
      handleSaveResults();
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
    <>
      <h1>
        Olá
        {' '}
        {userName}
        !
      </h1>
      <div className="timer">
        Tempo Restante:
        {' '}
        {timer}
        s
      </div>
      <div className="container_page_questions">
        <h3>{currentQuestion.title}</h3>
        <div className="container_questions">
          {options.map((option, optionIndex) => (
            <button
              onClick={ () => handleOptionClick(optionIndex) }
              className={ handleClass(currentQuestion, optionIndex) }
              disabled={ showResult }
              key={ optionIndex }
            >
              {option}
            </button>

          ))}
        </div>
        <div className="container_feedback">
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
          <p>
            Total de respostas corretas:
            {' '}
            {correctAnswers}
            {' '}
            /
            {' '}
            {questions.length}
          </p>
        </div>
        <div className="container_nav">
          {showResult && (
            <button onClick={ handleNextQuestion }>
              {currentQuestionIndex === questions.length - 1
                ? 'Finalizar'
                : 'Próxima Pergunta'}
            </button>
          )}
        </div>

      </div>
    </>
  );
}
