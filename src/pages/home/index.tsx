import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  // const isUserRegistered = false;

  return (
    <div className="home-page">
      <div className="title">

        <h1>Página Home</h1>

        <p>Olá este é um jogo sobre curiosidades da cidade de Belo horizonte</p>
        <p><em>Lembrar de remover essa tela e ir direto para a de cadastro</em></p>

        <button
          onClick={ () => navigate('/register') }
        >
          Crie uma conta aqui
        </button>

      </div>
    </div>
  );
}
