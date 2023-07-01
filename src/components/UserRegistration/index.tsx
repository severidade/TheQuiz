import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { setUserName, setUserEmail } from '../../redux/actions';

import client from '../../cliente';
import './UserRegistration.css';

function UserRegistration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [validity, setValidity] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mutationResult, setMutationResult] = useState<string | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleValidity = () => {
      const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const nameValidation = name.length;
      const ageValidation = age !== null
        && !Number.isNaN(Number(age))
        && age >= 1
        && age < 100;
      const magicNumber = 4;
      if (emailValidation && nameValidation >= magicNumber && ageValidation) {
        setValidity(false);
      } else {
        setValidity(true);
      }
    };

    handleValidity();
  }, [name, email, age]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    if (inputName === 'name') {
      setName(value);
    } else if (inputName === 'email') {
      setEmail(value);
    } else if (inputName === 'age') {
      setAge(parseInt(value, 10));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se o usuário já existe na base de dados
    const query = '*[_type == \'user\' && (name == $name || email == $email)]';
    const existingUsers = await client.fetch(query, { name, email });

    if (existingUsers.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Usuário já existe',
        text: 'Um usuário com o mesmo nome ou e-mail já está cadastrado.',
      });
      setMutationResult(null);
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
      setMutationResult(`Olá ${name}. Seu cadastrado foi realizado com sucesso!`);

      dispatch(setUserName(name));
      dispatch(setUserEmail(email));

      setIsUserRegistered(true); // Define que o usuário foi cadastrado com sucesso
    } catch (error: any) {
      console.error('Ocorreu um erro ao cadastrar o usuário:', error.message);
      setMutationResult(null);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  const isNameValid = name.length >= 4;
  const isAgeValid = age !== null && age >= 1 && age < 100;
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
      <form
        className="register_form"
        onSubmit={ handleFormSubmit }
      >
        <label htmlFor="name" className="register_form_item">
          <span>Nome:</span>
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ handleInputChange }
            required
          />
          <span className={ isNameValid ? 'valid' : 'invalid' }>
            O nome deve ter pelo menos 4 caracteres.
          </span>
        </label>

        <label htmlFor="email" className="register_form_item">
          <span>E-mail:</span>
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            onInput={ handleInputChange }
            required
          />
          <span className={ isEmailValid ? 'valid' : 'invalid' }>
            Digite um e-mail válido.
          </span>
        </label>

        <label htmlFor="age" className="register_form_item">
          <span>Idade:</span>
          <input
            type="number"
            min="0"
            id="age"
            name="age"
            value={ age !== null ? age : '' }
            onChange={ handleInputChange }
            required
          />
          <span className={ isAgeValid ? 'valid' : 'invalid' }>
            Preencha uma idade válida.
          </span>
        </label>

        <button type="submit" disabled={ validity }>
          Cadastrar
        </button>
      </form>
    );
  }

  return (
    <div>
      {mutationResult && <p>{mutationResult}</p>}
      {content}
    </div>
  );
}

export default UserRegistration;
