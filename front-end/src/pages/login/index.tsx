import LoginForm from './components/FormsLogin';
import { BlurFade } from '../../components/BlurFade';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/GridPattern';

export default function LoginPage() {
	return (
		<>
			<div className=" flex size-full ">
				<GridPattern
					width={20}
					height={20}
					x={-1}
					y={-1}
					strokeDasharray={'5 3'}
					className={cn('[mask-image:radial-gradient(1200px_circle_at_top_right,white,transparent)]', 'opacity-[10%] ')}
					style={{ stroke: '#ffffffff' }}
				/>
			</div>
			<div className=" flex h-screen px-10 bg-[#1A1A1A] ">
				<div className="flex w-full lg:w-1/2 items-center justify-center flex-col  ">
					<div className="w-full max-w-[650px] ">
						<BlurFade delay={0.25 * 2}>
							<h1 className="text-white text-4xl font-extrabold pb-5  ">
								Sistema Academia Next Level -
								<div>
									<p className="text-[#006FEE]">ANLV</p>
								</div>
							</h1>
						</BlurFade>
						<BlurFade delay={0.25 * 3}>
							<p className="text-white  font-light text-sm">
								Acesse o painel para gerenciar as operações da academia, monitorar o desempenho dos alunos, atualizar dados dos treinos
								e garantir a excelência no atendimento e nos serviços oferecidos.
							</p>
						</BlurFade>
						<div className="pt-12">
							<LoginForm />
						</div>
					</div>
				</div>
				<div className="hidden lg:flex w-1/2 items-center justify-center">
					<div className="">
						<BlurFade delay={0.25 * 8} direction="right">
							<div className="text-center">
								<img src="./images/login/academiaLogin.svg" />
							</div>
						</BlurFade>
					</div>
				</div>
			</div>
		</>
	);
}
