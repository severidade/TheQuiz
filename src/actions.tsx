export const setUserName = (name: string) => {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  };
};

export const setCorrectAnswers = (count: number) => {
  return {
    type: 'SET_CORRECT_ANSWERS',
    payload: count,
  };
};

export const setNumberOfQuestions = (count: number) => {
  return {
    type: 'SET_NUMBER_OF_QUESTIONS',
    payload: count,
  };
};
