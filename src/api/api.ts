import axios, { AxiosResponse, AxiosHeaders } from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { stringify } from "qs";
import { FlowmeterType } from "../types/flowmeter";
import { UserLoginType } from "../types/user";

export const api = axios.create({
	baseURL: apiUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) => stringify(params, { encode: true }),
});

// Pridaj interceptor na odpovede
/* api.interceptors.response.use(
	(response) => response, // Ak je odpoveď OK, necháme ju prejsť
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location.href = "/login"; // Presmerovanie na login stránku
		}
		return Promise.reject(error);
	},
); */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchSensors = (params?: any): Promise<any> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return api.get(`vip`, { params }).then((response: AxiosResponse<any>) => response.data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchFlowmeter = (params?: unknown): Promise<any> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return api.get(`/flowmeter`, { params }).then((response: AxiosResponse<any>) => response.data);
};

export const fetchLastFlowmeter = (): Promise<FlowmeterType> => {
	return api.get(`/flowmeter/last`).then((response: AxiosResponse<FlowmeterType>) => response.data);
};

export const login = (body: UserLoginType): Promise<UserLoginType> => {
	return api.post(`/auth/login`, body).then((response: AxiosResponse<UserLoginType>) => response.data);
};

export const fetchProfile = (): Promise<UserLoginType> => {
	return api.get(`/auth/profile`, { withCredentials: true }).then((response: AxiosResponse<UserLoginType>) => response.data);
};
