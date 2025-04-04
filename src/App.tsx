import React, { useState, useEffect } from "react";
import FlowmeterData from "./components/FlowmeterData";
import { fetchLastFlowmeter, fetchThermo } from "./api/api";
import { FlowmeterType } from "./types/flowmeter";
import { Divider } from "primereact/divider";
import { ThermometerType } from "./types/thermometer";

export default function App() {
	/* const data = use(fetchSensors().catch((err: Error) => setError(err))); */
	const [lastFlowmeter, setLastFlowmeter] = useState<FlowmeterType | null>(null); // Ukladáme dáta
	const [lastThermo, setLastThermo] = useState<ThermometerType[] | []>([]); // Ukladáme dáta
	const [loading, setLoading] = useState(true); // Stav načítania

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

	useEffect(() => {
		fetchFlowmeterData();
		fetchThermometerData();
		setInterval(() => {
			fetchFlowmeterData();
			fetchThermometerData();
		}, 5000);
	}, []);

	const thermoItems = lastThermo.map((item) => (
		<FlowmeterData
			key={item.id} // Dôležité pre React pri renderovaní zoznamov
			title={item.location}
			value={item.last_value}
			unit="°C"
			icon={"/images/thermometer.png"}
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
					/>
					<FlowmeterData
						title="Aktuálna spotreba"
						value={lastFlowmeter?.litres_per_minute}
						unit="L/min"
						icon={"/images/water-pipe.png"}
					/>
				</div>
			</div>
		</>
	);
}
