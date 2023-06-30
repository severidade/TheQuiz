import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playAgain } from '../../redux/actions';
// import client from '../../cliente';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const gamePlayedAgain = useSelector(
    (state: { gamePlayedAgain: boolean }) => state.gamePlayedAgain,
  );

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isUserNameValid = userName !== '';
    const isUserEmailValid = userEmail !== '';

    if (
      gamePlayedAgain
      && nameInputRef.current
      && emailInputRef.current
      && isUserNameValid
      && isUserEmailValid
    ) {
      // Atualizar os campos de valor do input com userName e userEmail
      nameInputRef.current.value = userName;
      emailInputRef.current.value = userEmail;
      setIsValid(true);
    }
  }, [gamePlayedAgain, userName, userEmail]);

  useEffect(() => {
    const isUserNameValid = name !== '';
    const isUserEmailValid = email !== '';

    setIsValid(isUserNameValid && isUserEmailValid);
  }, [name, email]);

  // const playRegisteredUser = async () => {
  //   // Consulta a base de dados do Sanity.io para verificar se o usuário existe
  //   try {
  //     const query = '*[_type == "user" && name == $name && email == $email]';
  //     const result = await client.fetch(query, { name, email });

  //     if (result.length > 0) {
  //       // Usuário encontrado, liberar o jogo ou fazer qualquer outra ação necessária
  //       setIsValid(true);
  //     } else {
  //       // Usuário não encontrado
  //       console.log('Usuário não encontrado.');
  //     }
  //   } catch (error) {
  //     console.error('Ocorreu um erro ao consultar a base de dados do Sanity.io:', error);
  //   }
  // };

  const handlePlay = () => {
    dispatch(playAgain(userName, userEmail, false));
    navigate('/trivia');
  };

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
              value={ name } // Usar o estado local name como valor do input
              onChange={ (e) => setName(e.target.value) } // Atualizar o estado local name
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
              value={ email } // Usar o estado local email como valor do input
              onChange={ (e) => setEmail(e.target.value) } // Atualizar o estado local email
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
