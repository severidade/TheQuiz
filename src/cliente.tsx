/* eslint-disable max-len */
import sanityClient from '@sanity/client';

const config = {
  projectId: '4nd77opf',
  dataset: 'production',
  token: 'skezBk6S0DIUsSyd5EFZuB0eSwOfGMm74UdQLM50oPKlUxkv75TmuC8NJ2eM45qynexAMZglhVj9dlZmszT8SQ06nrYCsUnZs3gEMCLD9hag4DFukzY1sji7ZBswXbEntV3oc79ha4XAf175XV98UdN2gYeRMs7SPGgbSlMNIPjhmLUrHipg',
  useCdn: true,
  apiVersion: '2023-06-17',
};

const client = sanityClient(config);

export default client;
