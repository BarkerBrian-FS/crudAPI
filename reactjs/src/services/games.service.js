import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8000/api/v1/games'

const getAllPrivateGames = () => {
    return axios.get(`/`, {headers: authHeader})
}

const gamesService = {
    getAllPrivateGames
}

export default gamesService;