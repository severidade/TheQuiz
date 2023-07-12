export default {
  name: 'kids_ranking',
  title: 'Ranking Crianças',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
      description: 'Enter the user name',
    },
    {
      name: 'userAge',
      title: 'Idade do Jogador',
      type: 'number',
      description: 'quantos anos ele tem',
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
