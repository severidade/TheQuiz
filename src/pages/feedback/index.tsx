import { useDispatch, useSelector } from 'react-redux';

export default function Feedback() {
  const dispatch = useDispatch();
  const userName = useSelector((state: { userName: string }) => state.userName);
  const correctAnswers = useSelector(
    (state: { correctAnswers: number }) => state.correctAnswers,
  );
  const numberOfQuestions = useSelector(
    (state: { numberOfQuestions: number }) => state.numberOfQuestions,
  );

  return (
    <div className="feedback-page">
      <div className="title">
        <h1>
          Parabéns
          {' '}
          {userName}
          !
        </h1>
        <p>
          {' '}
          Você acertou
          {' '}
          { correctAnswers }
          {' '}
          de
          {' '}
          {numberOfQuestions}
        </p>
      </div>
    </div>
  );
}
