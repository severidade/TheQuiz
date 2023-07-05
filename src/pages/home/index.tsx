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
  const [skipValidation, setSkipValidation] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // dados do estado global
  const userName = useSelector((state: { userName: string }) => state.userName);
  const userEmail = useSelector((state: { userEmail: string }) => state.userEmail);
  const gamePlayedAgain = useSelector(
    (state: { gamePlayedAgain: boolean }) => state.gamePlayedAgain,
  );

  // dados do formulário
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handlePlay: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (skipValidation) {
      console.log(skipValidation);
      navigate('/trivia');
      dispatch(playAgain(name, email, false));
      setSkipValidation(false);
    } else {
      // const query = '*[_type == \'user\' && (name == $name || email == $email)]';
      const query = '*[_type == "user" && name == $name && email == $email]';
      const existingUsers = await client.fetch(query, { name, email });

      if (existingUsers.length > 0) {
        navigate('/trivia');
        dispatch(playAgain(name, email, false));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuário não existe',
          text: 'usuário nao cadastrado na base.',
        });
      }
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
      setSkipValidation(true); // Pula a validação do banco pois cadastro foi validado anteriormente
    }
  }, [gamePlayedAgain, userName, userEmail]);

  return (
    <div className="home-page">
      <div className="title">
        <h1>Página Home</h1>
        <p>Olá, este é um jogo sobre curiosidades da cidade de Belo Horizonte.</p>
        <form className="login__wrapper">
          <label htmlFor="name" className="register_form_item">
            <span>Nome: </span>
            <input
              type="text"
              name="name"
              id="nameInput"
              ref={ nameInputRef }
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              required
            />

          </label>
          <label htmlFor="Email" className="register_form_item">
            <span>Email</span>
            <input
              type="text"
              name="email"
              id="emailInput"
              ref={ emailInputRef }
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
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
