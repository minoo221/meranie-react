import React, { JSX, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";

import "primeicons/primeicons.css";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import Login from "./views/Login.tsx";
import { fetchProfile } from "./api/api.ts";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const location = useLocation();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await fetchProfile();
				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
			}
		};
		checkAuth();
	}, []);

	// Počas načítania zobrazí nič (môžeš dať loading spinner)
	if (isAuthenticated === null) return null;

	// Ak nie je prihlásený, presmeruje na login
	return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await fetchProfile();
				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
			}
		};
		checkAuth();
	}, []);

	if (isAuthenticated === null) return null;

	// Ak je prihlásený, presmeruje na hlavnú stránku
	return isAuthenticated ? <Navigate to="/" replace /> : children;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<PrimeReactProvider value={{ unstyled: false }}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<App />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<RedirectIfAuthenticated>
								<Login />
							</RedirectIfAuthenticated>
						}
					/>
				</Routes>
			</BrowserRouter>
		</PrimeReactProvider>
	</React.StrictMode>,
);
