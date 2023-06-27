interface State {
  userName: string;
  correctAnswers: number;
}

const initialState: State = {
  userName: '',
  correctAnswers: 0,
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
    default:
      return state;
  }
};

export default rootReducer;
