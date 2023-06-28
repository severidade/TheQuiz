export const setUserName = (name: string) => {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  };
};

export const setUserEmail = (email: string) => {
  return {
    type: 'SET_USER_EMAIL',
    payload: email,
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
