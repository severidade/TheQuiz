interface State {
  userName: string;
  correctAnswers: number;
  numberOfQuestions: number;
}

const initialState: State = {
  userName: '',
  correctAnswers: 0,
  numberOfQuestions: 0,
};

const rootReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
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
    default:
      return state;
  }
};

export default rootReducer;
