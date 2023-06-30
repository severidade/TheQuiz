import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const gamePlayedAgain = useSelector(
    (state: { gamePlayedAgain: boolean }) => state.gamePlayedAgain,
  );

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handlePlay = () => {
    navigate('/trivia');
  };

  useEffect(() => {
    if (gamePlayedAgain && nameInputRef.current && emailInputRef.current) {
      // Atualizar os campos de valor do input com userName e userEmail
      nameInputRef.current.value = userName;
      emailInputRef.current.value = userEmail;
      setIsValid(true);
    }
  }, [gamePlayedAgain, userName, userEmail]);

  console.log(typeof gamePlayedAgain);
  console.log(gamePlayedAgain ? 'Verdadeiro' : 'Falso');

  return (
    <div className="home-page">
      <div className="title">
        <h1>Página Home</h1>
        <p>Olá, este é um jogo sobre curiosidades da cidade de Belo Horizonte.</p>
        <form className="login__wrapper">
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="nameInput"
              ref={ nameInputRef }
              required
            />
            <span>Player Name</span>
          </label>
          <label htmlFor="Email">
            <input
              type="text"
              name="gravatarEmail"
              id="emailInput"
              ref={ emailInputRef }
              required
            />
            <span>Email</span>
          </label>

          <button onClick={ handlePlay } disabled={ !isValid }>
            Jogar
          </button>
        </form>

        <button onClick={ () => navigate('/register') }>Crie uma conta</button>
        <button onClick={ () => navigate('/ranking') }>Ranking</button>
      </div>
    </div>
  );
}
