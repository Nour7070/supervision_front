import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // ton backend
  // Tu peux aussi ajouter d'autres options ici :
  // headers: { 'Authorization': 'Bearer ...' },
  // withCredentials: true,
});

export default api;
