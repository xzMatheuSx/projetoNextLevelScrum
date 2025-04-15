import { createContext } from 'react';

export type User = {
	username: string;
	token: string;
	exp: number;
	iat: number;
};

export type AuthContextType = {
	user: User | null;
	login: (credentials: { usuario: string; senha: string }) => Promise<boolean>;
	logout: () => void;
	isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
