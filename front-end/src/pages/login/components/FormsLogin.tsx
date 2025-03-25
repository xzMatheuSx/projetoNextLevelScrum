import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CiUser } from 'react-icons/ci';
import { AiOutlineEye, AiFillEye } from 'react-icons/ai';
import { toast } from 'sonner';
import { BlurFade } from '@/components/BlurFade';

export default function ProfileForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (username.length < 2) {
			toast.error('Preencha todos os campos!');
			return;
		}
		if (password.length < 1) {
			toast.error('A senha não pode estar vazia.');
			return;
		}

		setIsLoading(true);

		const promise = () => new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: username }), 3000));

		toast.promise(promise, {
			loading: 'Entrando no sistema... ⏳',
			success: (data) => {
				return `Bem-vindo à academia, ${data.name}! 💪`;
			},
			error: 'Erro na entrada. Tente novamente. 🚫',
		}).finally(() => setIsLoading(false));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-10">
			<div className="space-y-4">
				<div className="space-y-4">
					<BlurFade delay={0.25 * 4}>
						<div>
							<label className="text-sm font-bold text-white">Usuário</label>
						</div>
					</BlurFade>
					<BlurFade delay={0.25 * 5}>
						<div className="relative">
							<Input
								type="text"
								className="bg-[#1F1F1F] border-1 border-[#2A2A2A] h-16 rounded-xl text-white pl-3 pr-10"
								placeholder="Digite seu nome..."
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<CiUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f5f5f5]/25 text-2xl" />
						</div>
					</BlurFade>
				</div>
				<div className="space-y-4">
					<BlurFade delay={0.25 * 6}>
						<div>
							<label className="text-sm font-bold text-white">Senha</label>
						</div>
					</BlurFade>
					<BlurFade delay={0.25 * 7}>
						<div className="relative">
							<Input
								type={showPassword ? 'text' : 'password'}
								className="bg-[#1F1F1F] border-1 border-[#2A2A2A] h-16 rounded-xl text-white pl-3 pr-10"
								placeholder="Digite sua senha..."
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div
								className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <AiFillEye className="text-white" /> : <AiOutlineEye className="text-[#f5f5f5]/25" />}
							</div>
						</div>
					</BlurFade>
				</div>
			</div>
			<BlurFade delay={0.25 * 8}>
				<div>
					<Button
						variant={'default'}
						className={`bg-[#006FEE]/25 border-1 border-[#006FEE] w-full h-14 hover:bg-[#006FEE] rounded-xl cursor-pointer ${
							isLoading ? 'opacity-50 pointer-events-none' : ''
						}`}
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? 'Enviar' : 'Enviar'}
					</Button>
				</div>
			</BlurFade>
		</form>
	);
}
