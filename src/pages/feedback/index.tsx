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

  // const handleSaveResults = async () => {
  //   try {
  //     // Define os dados que serão salvos
  //     const result = {
  //       _type: 'ranking',
  //       userName,
  //       userEmail,
  //       correctAnswers,
  //       numberOfQuestions,
  //     };

  //     // Envie os dados para o Sanity
  //     await cliente.create(result);

  //     console.log('Resultados salvos com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao salvar os resultados:', error);
  //   }
  // };

  // Calcula o percentual de acertos
  const percentage = (correctAnswers / numberOfQuestions) * 100;

  // Determina a mensagem com base no percentual de acertos
  let message = '';
  if (percentage <= 40) {
    // eslint-disable-next-line max-len
    message = 'Continue explorando as peculiaridades da cidade, afinal, quem precisa de 100% de acertos quando se tem 100% de diversão, não é mesmo?';
  } else if (percentage <= 70) {
    // eslint-disable-next-line max-len
    message = 'Uau! Você realmente mostrou que sabe algumas curiosidades incomuns sobre Belo Horizonte! Está no caminho certo para se tornar um especialista em assuntos fora da caixinha. Continue mergulhando nesse universo de informações curiosas e quem sabe você não vira um(a) guia turístico(a) alternativo(a)?';
  } else {
    // eslint-disable-next-line max-len
    message = 'Parabéns, oh sábio(a) conhecedor(a) de Belo Horizonte! Você se destacou no nosso quiz de curiosidades não convencionais. Parece que você tem um olhar afiado para as peculiaridades da cidade. Continue explorando e impressionando a todos com seu conhecimento único!';
  }

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
          {' '}
          (
          {percentage}
          %)
        </p>
        <p>{message}</p>
        {/* <button onClick={ handleSaveResults }>Salvar Resultados</button> */}
      </div>
    </div>
  );
}
