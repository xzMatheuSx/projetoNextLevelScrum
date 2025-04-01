import { useState, useEffect } from 'react';
import api from '@/lib/api';

export function useFetch<T = unknown>(endpoint: string) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await api.get(endpoint);
				setData(response.data);
			} catch (err) {
				console.error('Erro ao buscar os dados:', err);
				setError('Erro ao buscar os dados.');
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [endpoint]);

	return { data, loading, error };
}
