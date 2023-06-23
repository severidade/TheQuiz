import { useNavigate } from 'react-router-dom';
import UserRegistration from '../../components/UserRegistration';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="title">
        <h1>Página Home</h1>
        <UserRegistration />
        <button onClick={ () => navigate('/trivia') }>
          Começar o jogo
        </button>
      </div>
    </div>
  );
}
