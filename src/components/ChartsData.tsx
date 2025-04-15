import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { AllMeasurementsType } from "../types/thermometer";
import "chartjs-adapter-date-fns";
import "chartjs-plugin-zoom";

interface FlowmeterDataProps {
	visible: boolean;
	sensorType: "flowmeter" | "thermometer" | "pressure";
	labels: string[];
	measurementData: AllMeasurementsType[];
	onClose: () => void;
}

function ChartsData({ visible, sensorType, labels, measurementData, onClose }: FlowmeterDataProps) {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		if (visible) {
			const documentStyle = getComputedStyle(document.documentElement);
			const textColor = documentStyle.getPropertyValue("--text-color");
			const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
			const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

			const lineColors = [
				documentStyle.getPropertyValue("--cyan-500"),
				documentStyle.getPropertyValue("--yellow-500"),
				documentStyle.getPropertyValue("--green-500"),
				documentStyle.getPropertyValue("--red-500"),
				documentStyle.getPropertyValue("--purple-500"),
			];

			// 1. Získaj všetky unikátne časové pečiatky
			const allTimestamps = new Set<string>();
			measurementData.forEach((item: AllMeasurementsType) => {
				item.measurement.forEach((m) => allTimestamps.add(m.timestamp));
			});
			const sortedTimestamps = Array.from(allTimestamps).sort();

			// 2. Zosúladi dáta pre každý senzor
			const datasets = measurementData.map((item: AllMeasurementsType) => {
				const sensorMeasurementsMap = new Map(item.measurement.map((m) => [m.timestamp, m.value]));
				const dataPoints = sortedTimestamps.map((timestamp) => ({
					x: new Date(timestamp),
					y: sensorMeasurementsMap.get(timestamp) !== undefined ? sensorMeasurementsMap.get(timestamp) : null,
				}));

				console.log("datapoints", dataPoints);

				return {
					label: item.sensor_id,
					data: dataPoints,
					fill: false,
					borderColor: lineColors[measurementData.indexOf(item) % lineColors.length],
					tension: 0.4,
					spanGaps: true,
				};
			});

			const data = {
				/*labels: sortedTimestamps,*/ // Používame zoradené unikátne časové pečiatky ako labely
				datasets: datasets,
			};
			/*const data = {
				labels: labels,
				dataset: measurementData.map((item: AllMeasurementsType) => {
					return {
						label: item.sensor_id,
						data: item.measurement.map((data) => data.value),
						fill: false,
						borderColor: documentStyle.getPropertyValue("--blue-500"),
						tension: 0.4,
						/!*parsing: {
							xAxisKey: "timestamp",
							yAxisKey: "value",
						},*!/
					};
				}),
			};*/

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor,
						},
					},
					decimation: {
						enabled: true,
						algorithm: "lttb",
						samples: 1000,
					},
				},
				parsing: {
					xAxisKey: "x",
					yAxisKey: "y",
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary,
						},
						grid: {
							color: surfaceBorder,
						},
						type: "time", // dôležité pre dátumy
						time: {
							tooltipFormat: "dd.MM.yyyy HH:mm:ss",
							displayFormats: {
								second: "HH:mm:ss",
								minute: "HH:mm",
								hour: "HH:mm",
								day: "dd.MM.",
							},
						},
						title: {
							display: true,
							text: "Čas",
						},
					},
					y: {
						ticks: {
							color: textColorSecondary,
						},
						grid: {
							color: surfaceBorder,
						},
						title: {
							display: true,
							text: "Teplota (°C)",
						},
					},
				},
			};
			setChartData(data);
			setChartOptions(options);
		}
	}, [visible]);
	return (
		<Dialog
			header="Header"
			visible={visible}
			style={{ width: "80vw" }}
			onHide={() => {
				onClose();
			}}
		>
			<div className="card">
				<Chart type="line" data={chartData} options={chartOptions} />
			</div>
		</Dialog>
	);
}

export default ChartsData;
