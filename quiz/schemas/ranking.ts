export default {
  name: 'ranking',
  title: 'Ranking',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
      description: 'Enter the user name',
    },
    {
      name: 'userEmail',
      title: 'User e-mail',
      type: 'string',
      description: 'Enter the user e-mail address',
    },
    {
      name: 'correctAnswers',
      title: 'Correct Answers',
      type: 'number',
      description: 'Enter the number of correct answers',
    },
    {
      name: 'numberOfQuestions',
      title: 'Number of Questions',
      type: 'number',
      description: 'Enter the total number of questions',
    },
  ],
};
