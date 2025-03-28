import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { fetchProfile, login } from "../api/api";
import { UserLoginType } from "../types/user";

function Login() {
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIdentifier(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const loginData = {
			identifier: identifier,
			password: password,
		};
		login(loginData)
			.then((data: UserLoginType) => {
				console.log("login", data);
				fetchProfileData();
			})
			.catch((err: Error) => {
				console.error(err);
			});
		/* .finally(() => {
				setLoading(false);
			}); */
	};

	const fetchProfileData = () => {
		fetchProfile()
			.then((data: UserLoginType) => {
				console.log("login", data);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchProfileData();
	}, []);

	return (
		<div className="container mx-auto w-full">
			<div className="flex items-center justify-center w-full">
				<form onSubmit={handleSubmit} className="surface-card p-4 shadow-2 border-round w-full lg:w-80">
					<div className="text-center mb-5">
						<img src="/images/privacy.png" alt="hyper" width="60px" className="mb-3 mx-auto" />
						<div className="text-900 text-3xl font-medium mb-3">Vitaj spät!</div>
						{/* <span className="text-600 font-medium line-height-3">Don't have an account?</span>
					<a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> */}
					</div>

					<div className="text-left">
						<div className="mb-4">
							<label htmlFor="email" className="block text-900 font-medium mb-2">
								Email alebo login
							</label>
							<InputText
								id="email"
								type="text"
								placeholder="Email"
								className="w-full mb-3"
								value={identifier}
								onChange={handleIdentifierChange}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="block text-900 font-medium mb-2">
								Heslo
							</label>
							<InputText
								id="password"
								type="password"
								placeholder="Heslo"
								className="w-full mb-3"
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						{/* <div className="flex align-items-center justify-content-between mb-6">

						<a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
							Forgot your password?
						</a>
					</div> */}

						<Button type="submit" label="Sign In" icon="pi pi-user" className="!flex w-full" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
