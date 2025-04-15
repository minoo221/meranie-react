export interface ThermometerType {
	id: number;
	name: string;
	location: string;
	last_value: number;
	last_timestamp: string;
}

export interface AllMeasurementsType {
	sensor_id: string;
	measurement: MeasurementsType[];
}

export interface MeasurementsType {
	id: number;
	sensor_id: string;
	value: number;
	timestamp: string;
}

export interface MeasurementsParamsType {
	start: string;
	end: string;
	sensorIds?: string;
}
