import React, { useState, useEffect } from "react";
import FlowmeterData from "./components/FlowmeterData";
import { fetchLastFlowmeter } from "./api/api";
import { FlowmeterType } from "./types/flowmeter";
import { Divider } from "primereact/divider";

export default function App() {
	/* const data = use(fetchSensors().catch((err: Error) => setError(err))); */
	const [lastFlowmeter, setLastFlowmeter] = useState<FlowmeterType | null>(null); // Ukladáme dáta
	const [loading, setLoading] = useState(true); // Stav načítania
	useEffect(() => {
		setInterval(() => {
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
		}, 5000);
	}, []);

	return (
		<>
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
						icon={"/images/water.png"}
					/>
				</div>
			</div>
		</>
	);
}
