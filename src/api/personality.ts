import axios from './instance';

export const postPersonalityTest = (data: {answers: string[]}) =>
  axios.post('/api/personality/test', data);
