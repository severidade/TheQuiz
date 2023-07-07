import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { playAgain } from '../../redux/actions';
import client from '../../cliente';
import { validateName, validateEmail } from '../../utils/formValidation';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const gamePlayedAgain = useSelector(
    (state: { gamePlayedAgain: boolean }) => state.gamePlayedAgain,
  );

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    if (inputName === 'name') {
      const formattedName = value.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
      setName(formattedName);
    } else if (inputName === 'email') {
      const formattedEmail = value.toLowerCase();
      setEmail(formattedEmail);
    }
  };

  const handlePlay: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    console.log(gamePlayedAgain);
    if (gamePlayedAgain) {
      navigate('/trivia');
      console.log(`passei aqui e estou ${gamePlayedAgain}`);
      console.log('pulei a validacao');

      dispatch(playAgain(name, email, false));
    } else {
      // const query = '*[_type == \'user\' && (name == $name || email == $email)]';
      const query = '*[_type == \'user\' && name == $name && email == $email]';

      const existingUsers = await client.fetch(query, { name, email });

      console.log(`passei aqui e estou ${gamePlayedAgain}`);
      console.log('passei na validacao validacao pois estava false');

      if (existingUsers.length > 0) {
        navigate('/trivia');
        dispatch(playAgain(name, email, false));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuário não existe',
          text: 'usuário não cadastrado na base.',
        });
      }
    }
  };

  useEffect(() => {
    const handleisValidity = () => {
      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);

      const valid = isNameValid && isEmailValid;
      setIsValid(!valid);
    };

    handleisValidity();
    // console.log(`passei no segundo e estou ${gamePlayedAgain}`);
  }, [name, email]);

  useEffect(() => {
    const isUserNameValid = userName !== '';
    const isUserEmailValid = userEmail !== '';
    console.log(`passei no primeiro aqui e estou ${gamePlayedAgain}`);

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
              // onChange={ (e) => setName(e.target.value) }
              onChange={ handleInputChange }
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
              // onChange={ (e) => setEmail(e.target.value) }
              onChange={ handleInputChange }
              required
            />
            <span>Email</span>
          </label>

          <button onClick={ handlePlay } disabled={ isValid }>
            Jogar
          </button>
        </form>

        <button onClick={ () => navigate('/register') }>Crie uma conta</button>
        <button onClick={ () => navigate('/ranking') }>Ranking</button>
      </div>
    </div>
  );
}
