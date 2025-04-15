import axios, { AxiosResponse } from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { stringify } from "qs";
import { FlowmeterType } from "../types/flowmeter";
import { UserLoginType } from "../types/user";
import { AllMeasurementsType, MeasurementsParamsType, ThermometerType } from "../types/thermometer";

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

export const fetchThermo = async (params?: unknown): Promise<ThermometerType[]> => {
	const response = await api.get(`/sensors`, { params });
	return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchFlowmeter = (params?: MeasurementsParamsType): Promise<any> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return api.get(`/flowmeter`, { params }).then((response: AxiosResponse<any>) => response.data);
};

export const fetchLastFlowmeter = async (): Promise<FlowmeterType> => {
	const response = await api.get(`/flowmeter/last`);
	return response.data;
};

export const fetchMeasurements = async (params?: MeasurementsParamsType): Promise<ThermometerType[]> => {
	const response = await api.get(`/measurements`, { params });
	return response.data;
};

export const fetchAllMeasurements = async (params?: MeasurementsParamsType): Promise<AllMeasurementsType[]> => {
	const response = await api.get(`/measurements/all`, { params });
	return response.data;
};

export const fetchAllTimestamps = async (params?: MeasurementsParamsType): Promise<string[]> => {
	const response = await api.get(`/measurements/timestamps`, { params });
	return response.data;
};

export const login = async (body: UserLoginType): Promise<UserLoginType> => {
	const response = await api.post(`/auth/login`, body);
	return response.data;
};

export const fetchProfile = async (): Promise<UserLoginType> => {
	const response = await api.get(`/auth/profile`, { withCredentials: true });
	return response.data;
};
