import { useState, useEffect } from "react";
import FlowmeterData from "./components/FlowmeterData";
import { fetchAllMeasurements, fetchAllTimestamps, fetchLastFlowmeter, fetchThermo } from "./api/api";
import { FlowmeterType } from "./types/flowmeter";
import { Divider } from "primereact/divider";
import { AllMeasurementsType, MeasurementsParamsType, ThermometerType } from "./types/thermometer";
import ChartsData from "./components/ChartsData";
import { DateTime } from "luxon";

type SensorType = "flowmeter" | "thermometer" | "pressure";

export default function App() {
	/* const data = use(fetchSensors().catch((err: Error) => setError(err))); */
	const [lastFlowmeter, setLastFlowmeter] = useState<FlowmeterType | null>(null); // Ukladáme dáta
	const [lastThermo, setLastThermo] = useState<ThermometerType[] | []>([]); // Ukladáme dáta
	const [loading, setLoading] = useState(true); // Stav načítania
	const [visible, setVisible] = useState(false); // Stav viditeľnosti
	const [selectedSensorType, setSelectedSensorType] = useState<SensorType>("thermometer"); // Vybraný senzor
	const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null); // Vybraný senzor
	const [measurementAllData, setMeasurementAllData] = useState<AllMeasurementsType[] | []>([]); // Vybrané dáta senzora
	const [selectedSensorTimestamps, setSelectedSensorTimestamps] = useState<string[]>([]); // Vybrané dáta senzora

	const fetchFlowmeterData = () => {
		fetchLastFlowmeter()
			.then((data: FlowmeterType) => {
				setLastFlowmeter(data);
				setLoading(false);
				console.log("lastFlowmeter", data);
			})
			.catch((err: Error) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const fetchThermometerData = () => {
		fetchThermo()
			.then((data: ThermometerType[]) => {
				setLastThermo(data);
				setLoading(false);
				console.log("lastFlowmeter", data);
			})
			.catch((err: Error) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const fetchAllMeasurementsData = () => {
		const params = {
			start: "2025-03-01 00:00:00",
			end: "2025-04-04 00:00:00",
		};
		fetchAllMeasurements(params)
			.then((data: AllMeasurementsType[]) => {
				console.log("fetchAllMeasurementsData", data);
				setMeasurementAllData(data);
			})
			.catch((err: Error) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const fetchAllTimestampsData = async (params: MeasurementsParamsType) => {
		await fetchAllTimestamps(params)
			.then((data: string[]) => {
				setSelectedSensorTimestamps(data);
				console.log("fetchAllTimestampsData", data);
			})
			.catch((err: Error) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleThermometerClick = async (item: ThermometerType, sensorType: SensorType) => {
		console.log("Sensor clicked", item);

		const paramsTimestamps = {
			start: DateTime.now().minus({ days: 30 }).toFormat("yyyy-MM-dd HH:mm:ss"),
			end: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
			/*sensorIds: item.name.toString(),*/
		};

		await fetchAllTimestampsData(paramsTimestamps);
		setSelectedSensorType(sensorType);
		setVisible(true);
	};

	useEffect(() => {
		fetchFlowmeterData();
		fetchThermometerData();
		fetchAllMeasurementsData();
		/* setInterval(() => {
			fetchFlowmeterData();
			fetchThermometerData();
		}, 5000); */
	}, []);

	const thermoItems = lastThermo.map((item) => (
		<FlowmeterData
			key={item.id} // Dôležité pre React pri renderovaní zoznamov
			title={item.location}
			value={item.last_value}
			sensorType="thermometer"
			unit="°C"
			icon={"/images/thermometer.png"}
			onClick={() => handleThermometerClick(item, "thermometer")}
		/>
	));

	return (
		<>
			<div className="container mx-auto w-full !mb-14">
				<div className="w-full text-left mb-4">
					<h2 className="text-gray-800">Teploty</h2>
					<Divider className="my-4"></Divider>
				</div>
				<div className="grid grid-cols-3 gap-4">{thermoItems}</div>
			</div>
			<div className="container mx-auto w-full">
				<div className="w-full text-left mb-4">
					<h2 className="text-gray-800">Prietok vody</h2>
					<Divider className="my-4"></Divider>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<FlowmeterData
						title="Celková spotreba"
						value={lastFlowmeter?.litres}
						unit="L"
						icon={"/images/water.png"}
						sensorType="flowmeter"
					/>
					<FlowmeterData
						title="Aktuálna spotreba"
						value={lastFlowmeter?.litres_per_minute}
						unit="L/min"
						icon={"/images/water-pipe.png"}
						sensorType="flowmeter"
					/>
				</div>
			</div>
			<ChartsData
				sensorType={selectedSensorType}
				visible={visible}
				labels={selectedSensorTimestamps}
				measurementData={measurementAllData}
				onClose={() => setVisible(false)}
			/>
		</>
	);
}
