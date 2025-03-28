import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter, Route, Routes } from "react-router";

import "primeicons/primeicons.css";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import Login from "./views/Login.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<PrimeReactProvider value={{ unstyled: false }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</PrimeReactProvider>
	</React.StrictMode>,
);
