import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const isUserRegistered = false;

  return (
    <div className="home-page">
      <div className="title">

        <h1>Página Home</h1>

        <p>Olá este é um jogo sobre curiosidades da cidade de Belo horizonte</p>
        <form className="login__wrapper">
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              // value={ name }
              // onChange={ this.handleInputChange }
              required
            />
            {/* importante colocar o span depois do input para o css funcionar */}
            <span>Player Name</span>
          </label>
          <label htmlFor="Email">
            <input
              type="text"
              name="gravatarEmail"
              id="Email"
              // value={ gravatarEmail }
              // onChange={ this.handleInputChange }
              required
            />
            {/* importante colocar o span depois do input para o css funcionar */}
            <span>Email</span>
          </label>
          {/* <button
            data-testid="btn-play"
            disabled={ validity }
            type="button"
            onClick={ this.handleBtnClick }
            className={ CSS.play__button }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleSettingsBtnClick }
            className={ CSS.config__button }
          >
            Configurações
          </button> */}
          <button
            onClick={ () => navigate('/trivia') }
            disabled={ !isUserRegistered }
          >
            Jogar
          </button>

        </form>

        <button
          onClick={ () => navigate('/register') }
        >
          Crie uma conta
        </button>
        <button
          onClick={ () => navigate('/ranking') }
        >
          Ranking
        </button>

      </div>
    </div>
  );
}
