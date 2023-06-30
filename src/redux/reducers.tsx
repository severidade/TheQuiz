interface State {
  userName: string;
  userEmail: string;
  correctAnswers: number;
  numberOfQuestions: number;
  gamePlayedAgain: boolean;
}

const initialState: State = {
  userName: '',
  userEmail: '',
  correctAnswers: 0,
  numberOfQuestions: 0,
  gamePlayedAgain: false,
};

const rootReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };
    case 'SET_USER_EMAIL':
      return {
        ...state,
        userEmail: action.payload,
      };
    case 'SET_CORRECT_ANSWERS':
      return {
        ...state,
        correctAnswers: action.payload,
      };
    case 'SET_NUMBER_OF_QUESTIONS':
      return {
        ...state,
        numberOfQuestions: action.payload,
      };
    case 'PLAY_AGAIN':
      return {
        ...state,
        gamePlayedAgain: true, // Definindo playAgain como true
        userName: action.payload.userName, // Atualizando o userName no estado
        userEmail: action.payload.userEmail, // Atualizando o userEmail no estado
      };
    default:
      return state;
  }
};

export default rootReducer;
