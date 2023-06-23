import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const isUserRegistered = false;

  return (
    <div className="home-page">
      <div className="title">

        <h1>Página Home</h1>
        <button
          onClick={ () => navigate('/register') }
        >
          cadastrar
        </button>
        <p> aqui vai ter dois campos de formulario com nome e idade </p>
        <p> se o usuario estiver cadastrado pode colocar as informaṍes e jogar</p>
        <button
          onClick={ () => navigate('/trivia') }
          disabled={ !isUserRegistered }
        >
          Começar o jogo
        </button>
      </div>
    </div>
  );
}
