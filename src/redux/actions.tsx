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

export const setUserAge = (age: number | null) => {
  return {
    type: 'SET_USER_AGE',
    payload: age,
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

export const playAgain = (
  userName: string,
  userEmail: string,
  userAge: number | null,
  gamePlayedAgain: boolean,
) => {
  return {
    type: 'PLAY_AGAIN',
    payload: {
      userName,
      userEmail,
      userAge,
      gamePlayedAgain,
    },
  };
};
