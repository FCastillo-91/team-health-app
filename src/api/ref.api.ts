import { database } from "./config/database";

export const collectionTeamsRef = () => {
  return database.collection('teams');
};

export const collectionSurveysRef = () => {
  return database.collection('surveys');
};

export const collectionResultsRef = () => {
  return database.collection('results');
};

