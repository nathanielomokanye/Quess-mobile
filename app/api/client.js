import { create } from 'apisauce';

const apiClient = create({
  baseURL: 'https://quess-backend.herokuapp.com/api'
});

export default apiClient;
