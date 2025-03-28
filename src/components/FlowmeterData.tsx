import { Card } from "primereact/card";
import { FlowmeterType } from "../types/flowmeter";

interface FlowmeterDataProps {
	title?: string;
	value?: string | number;
	unit?: string;
	icon?: string;
}

function FlowmeterData({ title, value, unit, icon }: FlowmeterDataProps) {
	return (
		<Card
			pt={{
				body: () => ({
					className: "!py-0 ",
				}),
				root: () => ({
					className: "!bg-gray-50",
				}),
				content: () => ({
					className: "flex items-center",
				}),
			}}
			className="md:col-span-1"
		>
			<div className="mr-4 ">
				<img src={icon} alt="water" className="!w-15" />
			</div>
			<div>
				<h4 className="!text-base text-gray-500 text-left">{title}</h4>
				<h3 className="text-4xl text-blue-500 text-left">
					{value} {unit}
				</h3>
			</div>
		</Card>
	);
}

export default FlowmeterData;
