import { AuthContext, User } from '@/context/AuthContext';
import api, { token_key } from '@/lib/api';
import { cookies } from '@/lib/clients/cookies';
import { ReactNode, useCallback, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

	const timeDifference = (exp: number) => exp - Math.floor(Date.now() / 1000);

	const logout = useCallback(async () => {
		try {
			const token = cookies.get(token_key);
			if (token) {
				await api.delete('/token', {
					headers: { Authorization: `Bearer ${token}` },
				});
			}
		} catch (err) {
			toast.success('Voce foi deslogado!');
		} finally {
			setUser(null);
			cookies.remove(token_key);
			if (logoutTimerRef.current) {
				clearTimeout(logoutTimerRef.current);
				logoutTimerRef.current = null;
			}
		}
	}, []);

	const defineUserAndStoreToken = useCallback(
		async (access_token: string) => {
			try {
				const decodedToken: User = jwtDecode(access_token);
				const diff = timeDifference(decodedToken.exp);

				if (diff <= 0) {
					await logout();
					return null;
				}

				cookies.set(token_key, access_token, {
					sameSite: 'strict',
					secure: import.meta.env.PROD,
					maxAge: diff,
					path: '/',
				});
				setUser(decodedToken);

				if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
				logoutTimerRef.current = setTimeout(logout, diff * 1000);

				return decodedToken;
			} catch (err) {
				console.error('Erro ao decodificar token:', err);
				await logout();
				return null;
			}
		},
		[logout]
	);

	useEffect(() => {
		const loadUserFromCookies = async () => {
			try {
				const token = cookies.get(token_key);
				if (token) {
					await defineUserAndStoreToken(token);
				}
			} catch (error) {
				console.error('Erro ao carregar token:', error);
				await logout();
			} finally {
				setIsLoading(false);
			}
		};
		loadUserFromCookies();
	}, [defineUserAndStoreToken, logout]);

	async function login({ usuario, senha }: { usuario: string; senha: string }): Promise<boolean> {
		try {
			setIsLoading(true);
			const { data } = await api.post<{ access_token: string }>('/auth/login', { usuario, senha });
			const decodedToken = await defineUserAndStoreToken(data.access_token);

			if (decodedToken) {
				toast.success(`Bem-vindo, ${decodedToken.username}!`);
				return true;
			}
			return false;
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Erro ao fazer login');
			return false;
		} finally {
			setIsLoading(false);
		}
	}

	return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};
