import sanityClient from '@sanity/client';

const config = {
  projectId: '4nd77opf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-06-17',
};

const client = sanityClient(config);

export default client;
