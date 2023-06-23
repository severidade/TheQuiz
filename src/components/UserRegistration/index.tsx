import { useState } from 'react';
import client from '../../cliente';

function UserRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const [mutationResult, setMutationResult] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      _type: 'user',
      name,
      email,
      age,
    };

    try {
      await client.create(newUser);
      console.log('Usuário cadastrado com sucesso!');
      setMutationResult('Usuário cadastrado com sucesso!');
      setMutationError(null);
    } catch (error: any) {
      console.error('Ocorreu um erro ao cadastrar o usuário:', error.message);
      setMutationResult(null);
      setMutationError('Erro ao cadastrar o usuário');
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={ handleFormSubmit }>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />

        <label htmlFor="age">Idade:</label>
        <input
          type="number"
          id="age"
          value={ age }
          onChange={ (e) => setAge(parseInt(e.target.value, 10)) }

        />

        <button type="submit">Cadastrar</button>
      </form>

      {mutationResult && <p>{mutationResult}</p>}
      {mutationError && <p>{mutationError}</p>}
    </div>
  );
}

export default UserRegistration;
