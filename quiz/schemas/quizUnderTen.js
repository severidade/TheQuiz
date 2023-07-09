// schema.js

export default {
  name: 'questionUnderTen',
  title: 'Questionário para crianças',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Enter the question',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Enter the options for the question',
      validation: (Rule) => Rule.min(2).max(4),
    },
    {
      name: 'correctOption',
      title: 'Correct Option',
      type: 'number',
      description: 'Enter the index of the correct option (starting from 0)',
      validation: (Rule) => Rule.required().integer().min(0),
    },
  ],
};
