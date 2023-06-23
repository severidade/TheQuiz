export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'age',
      title: 'Age',
      type: 'number',
    },
  ],
 
  __experimental_actions: ['create', 'update', 'delete', 'publish'],
};
