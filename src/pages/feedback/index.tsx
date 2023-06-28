import { useDispatch, useSelector } from 'react-redux';
import cliente from '../../cliente';

export default function Feedback() {
  const dispatch = useDispatch();
  const userName = useSelector((state: { userName: string }) => state.userName);
  const correctAnswers = useSelector(
    (state: { correctAnswers: number }) => state.correctAnswers,
  );
  const numberOfQuestions = useSelector(
    (state: { numberOfQuestions: number }) => state.numberOfQuestions,
  );

  const handleSaveResults = async () => {
    try {
      // Define os dados que serão salvos
      const result = {
        _type: 'ranking',
        userName,
        correctAnswers,
        numberOfQuestions,
      };

      // Envie os dados para o Sanity
      await cliente.create(result);

      console.log('Resultados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os resultados:', error);
    }
  };

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
          Você acertou
          {' '}
          {correctAnswers}
          {' '}
          de
          {' '}
          {numberOfQuestions}
        </p>
      </div>
      <button onClick={ handleSaveResults }>Salvar Resultados</button>
    </div>
  );
}
