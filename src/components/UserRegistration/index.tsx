import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUserName } from '../../actions';
import client from '../../cliente';
import './UserRegistration.css';

function UserRegistration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [validity, setValidity] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mutationResult, setMutationResult] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  // const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    if (inputName === 'name') {
      setName(value);
    } else if (inputName === 'email') {
      setEmail(value);
    } else if (inputName === 'age') {
      setAge(parseInt(value, 10));
    }
    handleValidity();
  };

  const handleValidity = () => {
    const emailValidation = email.match(/\S+@\S+\.\S+/);
    const nameValidation = name.length;
    const ageValidation = !Number.isNaN(Number(age)) && age >= 0 && age < 100; // Utilizando Number.isNaN
    const magicNumber = 4;
    if (emailValidation && nameValidation >= magicNumber && ageValidation) {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se o usuário já existe na base de dados
    const query = '*[_type == \'user\' && (name == $name || email == $email)]';
    const existingUsers = await client.fetch(query, { name, email });

    if (existingUsers.length > 0) {
      setMutationResult(null);
      setMutationError('Usuário com mesmo nome ou email já existe.');
      return;
    }

    // Se o usuário não existe, realizar o cadastro
    const newUser = {
      _type: 'user',
      name,
      email,
      age,
    };

    try {
      setLoading(true); // Ativa o estado de carregamento
      await client.create(newUser);
      console.log('Usuário cadastrado com sucesso!');
      setMutationResult('Usuário cadastrado com sucesso!');
      setMutationError(null);
      setIsUserRegistered(true); // Define que o usuário foi cadastrado com sucesso
      // dispatch(setUserName(name));
    } catch (error: any) {
      console.error('Ocorreu um erro ao cadastrar o usuário:', error.message);
      setMutationResult(null);
      setMutationError('Erro ao cadastrar o usuário');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  const isNameValid = name.length >= 4;
  const isAgeValid = age > 0;
  const isEmailValid = email.match(/\S+@\S+\.\S+/);

  let content;
  if (loading) {
    content = <p>Cadastrando usuário...</p>;
  } else if (isUserRegistered) {
    content = (
      <button onClick={ () => navigate('/trivia') }>Jogar</button>
    );
  } else {
    content = (
      <>
        <form onSubmit={ handleFormSubmit }>
          <label htmlFor="name">
            <span>Nome:</span>
            <input
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ handleInputChange }
              required
            />
          </label>

          <label htmlFor="email">
            <span>E-mail:</span>
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ handleInputChange }
              required
            />
          </label>

          <label htmlFor="age">
            <span>Idade:</span>
            <input
              type="number"
              id="age"
              name="age"
              value={ age }
              onChange={ handleInputChange }
              required
            />
          </label>
          <button type="submit" disabled={ validity }>
            Cadastrar
          </button>
        </form>
        <ul>
          <li className={ isNameValid ? 'valid' : 'invalid' }>
            O nome deve ter pelo menos 4 caracteres.
          </li>
          <li className={ isEmailValid ? 'valid' : 'invalid' }>
            Digite um e-mail válido.
          </li>
          <li className={ isAgeValid ? 'valid' : 'invalid' }>
            Preencha uma idade válida.
          </li>
        </ul>

      </>
    );
  }

  return (
    <div>
      {mutationResult && <p>{mutationResult}</p>}
      {content}
      {mutationError && <p>{mutationError}</p>}
    </div>
  );
}

export default UserRegistration;
