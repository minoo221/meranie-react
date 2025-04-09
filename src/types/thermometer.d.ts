export interface ThermometerType {
	id: number;
	name: string;
	location: string;
	last_value: number;
	last_timestamp: string;
}

export interface MeasurementsParamsType {
	start: string;
	end: string;
	sensorIds?: string;
}