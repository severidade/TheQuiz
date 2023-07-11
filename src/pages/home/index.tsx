import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga4';
import Swal from 'sweetalert2';
import { playAgain } from '../../redux/actions';
import client from '../../cliente';
import { validateName, validateEmail } from '../../utils/formValidation';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | null>(null);

  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const userAge = useSelector((state: { userAge: number | null }) => state.userAge);
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
    dispatch(playAgain(name, email, age, false));
  };

  const handlePlay: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    console.log(gamePlayedAgain);
    if (gamePlayedAgain) {
      navigate('/trivia');
      console.log(`passei aqui e estou ${gamePlayedAgain}`);
      console.log('pulei a validacao');

      dispatch(playAgain(name, email, age, false));
    } else {
      // const query = '*[_type == \'user\' && (name == $name || email == $email)]';
      const query = '*[_type == \'user\' && name == $name && email == $email]';

      const existingUsers = await client.fetch(query, { name, email });

      console.log(`passei aqui e estou ${gamePlayedAgain}`);
      console.log('passei na validacao validacao pois estava false');

      if (existingUsers.length > 0) {
        const user = existingUsers[0];
        const ageFromDB = user.age;
        setAge(ageFromDB);
        setIsPlaying(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuário não existe',
          text: 'usuário não cadastrado na base.',
        });
      }
    }
  };

  const trackButtonClick = (buttonLabel: string) => {
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: buttonLabel,
    });
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
      setAge(userAge);
      setIsValid(true);
    }
  }, [gamePlayedAgain, userName, userEmail, userAge]);

  useEffect(() => {
    if (isPlaying && age !== null) {
      navigate('/trivia');
      dispatch(playAgain(name, email, age, false));
    }
  }, [isPlaying, age, dispatch, email, name, navigate]);

  return (
    <div className="container_home">
      <div className="container_login_form">
        <p>Olá, este é um jogo de curiosidades sobre a cidade de Belo Horizonte.</p>
        <form className="login_wrapper">
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="nameInput"
              ref={ nameInputRef }
              value={ name }
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
              onChange={ handleInputChange }
              required
            />
            <span>Email</span>
          </label>

          <button
            onClick={ (e: React.MouseEvent<HTMLButtonElement>) => {
              handlePlay(e);
              trackButtonClick('Btn Jogar');
            } }
            disabled={ isValid }
          >
            Jogar
          </button>

          <fieldset>
            <button
              onClick={ () => {
                navigate('/register');
                trackButtonClick('Btn cadastrar');
              } }
            >
              Cadastrar
            </button>
            <button
              onClick={ () => {
                navigate('/ranking');
                trackButtonClick('Btn ranking');
              } }
            >
              Ranking
            </button>
          </fieldset>

        </form>
      </div>
    </div>
  );
}
