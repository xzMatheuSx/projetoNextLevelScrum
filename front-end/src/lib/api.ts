import axios from 'axios';
import { cookies } from './clients/cookies';

const BaseURL = import.meta.env.VITE_API_URL;
export const token_key = import.meta.env.VITE_TOKEN_KEY;

const api = axios.create({
	baseURL: BaseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(async (config) => {
	if (!config.headers.Authorization) {
		const token = await cookies.get(token_key);

		if (token) config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
