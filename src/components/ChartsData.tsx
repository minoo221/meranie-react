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
			<p className="m-0">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
				ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
				anim id est laborum.
			</p>
		</Dialog>
	);
}

export default ChartsData;
