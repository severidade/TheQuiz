/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playAgain } from '../../redux/actions';

export default function Feedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const correctAnswers = useSelector(
    (state: { correctAnswers: number }) => state.correctAnswers,
  );
  const numberOfQuestions = useSelector(
    (state: { numberOfQuestions: number }) => state.numberOfQuestions,
  );
  const gamePlayedAgain = true;

  // Calcula o percentual de acertos
  const percentage = (correctAnswers / numberOfQuestions) * 100;

  // Determina a mensagem com base no percentual de acertos
  let message = '';
  if (percentage <= 40) {
    message = 'Continue explorando as peculiaridades da cidade, afinal, quem precisa de 100% de acertos quando se tem 100% de diversão, não é mesmo?';
  } else if (percentage <= 70) {
    message = 'Uau! Você realmente mostrou que sabe algumas curiosidades incomuns sobre Belo Horizonte! Está no caminho certo para se tornar um especialista em assuntos fora da caixinha. Continue mergulhando nesse universo de informações curiosas e quem sabe você não vira um(a) guia turístico(a) alternativo(a)?';
  } else {
    message = 'Parabéns, oh sábio(a) conhecedor(a) de Belo Horizonte! Você se destacou no nosso quiz de curiosidades não convencionais. Parece que você tem um olhar afiado para as peculiaridades da cidade. Continue explorando e impressionando a todos com seu conhecimento único!';
  }

  const handlePlayAgain = () => {
    dispatch(playAgain(userName, userEmail, gamePlayedAgain));
    navigate('/');
  };

  const handleNewPlayer = () => {
    dispatch(playAgain('', '', false));
    navigate('/');
  };

  return (
    <div className="feedback-page">
      <h1>
        Parabéns
        {' '}
        {userName}
        !
      </h1>
      <div className="message">
        <p>
          {percentage}
          %
        </p>
        <p>
          Você acertou
          {' '}
          {correctAnswers}
          {' '}
          de
          {' '}
          {numberOfQuestions}
          {' '}
          perguntas
        </p>
        <p>{message}</p>
      </div>
      {/* <button onClick={ handleSaveResults }>Salvar Resultados</button> */}
      <button onClick={ handlePlayAgain }>
        Jogar novamente
      </button>
      <button onClick={ handleNewPlayer }>
        Novo Jogador
      </button>
      <button onClick={ () => navigate('/ranking') }>
        Ranking
      </button>
    </div>
  );
}
