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
