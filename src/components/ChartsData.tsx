import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

interface FlowmeterDataProps {
	visible: boolean;
	sensorType: "flowmeter" | "thermometer" | "pressure";
}

function ChartsData({ visible, sensorType }: FlowmeterDataProps) {
	useEffect(() => {
		if (visible === true) {
			console.log("open");
		}
	}, [visible]);
	return (
		<Dialog
			header="Header"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => {
				if (!visible) return;
			}}
		>
			<div className="card">
				<Chart type="line" data={chartData} options={chartOptions} />
			</div>
		</Dialog>
	);
}

export default ChartsData;
