import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { playAgain } from '../../redux/actions';
import client from '../../cliente';

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

  const handlePlay: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const query = '*[_type == \'user\' && (name == $name || email == $email)]';
    const existingUsers = await client.fetch(query, { name, email });

    if (existingUsers.length > 0) {
      navigate('/trivia');
      console.log('cheguei aqui');
      dispatch(playAgain(name, email, false));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Usuário não existe',
        text: 'usuário nao cadastrado na base.',
      });
    }
  };

  useEffect(() => {
    const emailValidation = email.match(/\S+@\S+\.\S+/);
    const nameValidation = name.length;
    const magicNumber = 4;
    if (emailValidation && nameValidation >= magicNumber) {
      setIsValid(true);
    }
  }, [name, email]);

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
      setName(userName);
      setEmail(userEmail);
      setIsValid(true);
    }
  }, [gamePlayedAgain, userName, userEmail]);

  // console.log(typeof gamePlayedAgain);
  // console.log(gamePlayedAgain ? 'Verdadeiro' : 'Falso');
  // console.log(name, email);
  // console.log(userName, userEmail);

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
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              required
            />
            <span>Player Name</span>
          </label>
          <label htmlFor="Email">
            <input
              type="text"
              name="email"
              id="emailInput"
              ref={ emailInputRef }
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
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
