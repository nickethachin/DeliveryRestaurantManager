import {
	Card,
	CardContent,
	CardHeader,
} from '@mui/material';
import { Chart } from 'react-google-charts';

const SalesChart = () => {
	const random = (number) => {
		return Math.floor(Math.random() * number);
	};
	const data = [
		['Menu', 'Self-Delivery', 'Grab', 'Lineman', 'Shopee'],
		[
			'shrimp',
			random(7),
			random(20),
			random(15),
			random(10),
		],
		[
			'salmon',
			random(7),
			random(20),
			random(15),
			random(10),
		],
		['rice', random(7), random(20), random(15), random(10)],
		[
			'sushi',
			random(7),
			random(20),
			random(15),
			random(10),
		],
		[
			'yangban',
			random(7),
			random(20),
			random(15),
			random(10),
		],
	];
	return (
		<Card>
			<CardHeader title='Sales Chart' />
			<CardContent>
				<Chart
					chartType='Bar'
					width='100%'
					height='600px'
					data={data}
					options={{
						backgroundColor: '#333333',
					}}
				/>
			</CardContent>
		</Card>
	);
};

export default SalesChart;
