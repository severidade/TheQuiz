// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cliente from '../../cliente';

export default function Feedback() {
  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const correctAnswers = useSelector(
    (state: { correctAnswers: number }) => state.correctAnswers,
  );
  const numberOfQuestions = useSelector(
    (state: { numberOfQuestions: number }) => state.numberOfQuestions,
  );

  // useEffect(() => {
  //   const handleSaveResults = async () => {
  //     try {
  //       if (userName && correctAnswers !== null && numberOfQuestions !== null) {
  //         // Define os dados que serão salvos
  //         const result = {
  //           _type: 'ranking',
  //           userName,
  //           correctAnswers,
  //           numberOfQuestions,
  //         };

  //         // Envie os dados para o Sanity
  //         await cliente.create(result);

  //         console.log('Resultados salvos com sucesso!');
  //       } else {
  //         console.log('Resultados inválidos, não foram salvos no Sanity.');
  //       }
  //     } catch (error) {
  //       console.error('Erro ao salvar os resultados:', error);
  //     }
  //   };

  //   handleSaveResults();
  // }, [userName, correctAnswers, numberOfQuestions]);

  const handleSaveResults = async () => {
    try {
      // Define os dados que serão salvos
      const result = {
        _type: 'ranking',
        userName,
        userEmail,
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
        {/* <button onClick={ handleSaveResults }>Salvar Resultados</button> */}
      </div>
    </div>
  );
}
