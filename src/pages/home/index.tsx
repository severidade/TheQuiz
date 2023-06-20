import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="title">
        <h1>Página Home</h1>
        <button onClick={ () => navigate('/trivia') }>
          Começar o jogo
        </button>
      </div>
    </div>
  );
}
