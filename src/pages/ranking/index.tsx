import { useNavigate } from 'react-router-dom';

export default function Ranking() {
  const navigate = useNavigate();
  return (
    <div className="ranking-page">
      <div className="title">
        <h1>Página Ranking</h1>
        <p>Falta implementar essa página</p>
      </div>
      <button
        onClick={ () => navigate('/') }
      >
        Início
      </button>
    </div>
  );
}
