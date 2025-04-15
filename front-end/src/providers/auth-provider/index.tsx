import { AuthContext, User } from '@/context/AuthContext';
import api, { token_key } from '@/lib/api';
import { cookies } from '@/lib/clients/cookies';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const timeDifference = (exp: number) => exp - Math.floor(new Date().getTime() / 5000);

	const defineUserAndStoreToken = useCallback(async (access_token: string) => {
		try {
			const decodedToken: User = jwtDecode(access_token);
			cookies.set(token_key, access_token, { sameSite: 'strict', secure: import.meta.env.PROD, maxAge: timeDifference(decodedToken.exp), path: '/' });
			setUser(decodedToken);
			return decodedToken;
		} catch (err) {
			console.log(err);
		}
	}, []);

	const refreshToken = useCallback(
		async (actual_token: string) => {
			return await api
				.post(`/refresh`, { token: actual_token })
				.then(async (res) => {
					await defineUserAndStoreToken(res.data);
				})
				.catch((err) => console.log(err));
		},
		[defineUserAndStoreToken]
	);

	useEffect(() => {
		async function LocalStorageToken() {
			const token = await cookies.get(token_key);
			if (token) {
				await refreshToken(token);
			} else {
				setIsLoading(false);
			}
		}
		LocalStorageToken();
	}, [refreshToken]);

	async function login({ usuario, senha }: { usuario: string; senha: string }): Promise<boolean> {
		let response: boolean = false;
		try {
			setIsLoading(true);
			const data = {
				usuario,
				senha,
			};

			//const parsedLoginForm = await LoginFormSchema.parseAsync(data);

			await api
				.post<{ access_token: string }>('/auth/login', data)
				.then(async (res) => {
					await defineUserAndStoreToken(res.data.access_token).then((decodedToken: User | undefined) =>
						toast.success(`Bem vindo, ${decodedToken?.username}`)
					);
					response = true;

					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					return toast.error(error.response.data.message);
				});
			return response;
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			return response;
		}
	}

	async function logout() {
		if (user?.token) {
			await api.delete(`/token`).catch((err) => toast.error(err.response.data.message));
		}
		setUser(null);
		sessionStorage.removeItem('logado');
		cookies.remove(token_key);
	}

	return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};
