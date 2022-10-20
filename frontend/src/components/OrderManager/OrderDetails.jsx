import {
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SaveIcon from '@mui/icons-material/Save';

const OrderDetails = ({ riderData, orderList }) => {
	let prices = [];
	if (riderData && 'price' in riderData) {
		prices = riderData.price;
	}
	const calculatePrice = (id, amount) => {
		if (prices === []) {
			return;
		}
		return (
			prices.find((price) => price.itemset === id).amount *
			amount
		);
	};
	const calculateTotal = () => {
		if (prices.length < 1 || orderList.length < 1) {
			return;
		}
		const totals = orderList.reduce(
			(total, order) =>
				(total += calculatePrice(order._id, order.amount)),
			0
		);
		return totals;
	};

	return (
		<Stack
			direction='column'
			justifyContent='space-between'
			// sx={{ minHeight: 250 }}
			sx={{ height: '80%' }}
			spacing={2}
		>
			{riderData !== '' &&
			riderData !== undefined &&
			riderData !== null &&
			'name' in riderData ? (
				<Typography>Order from {riderData.name}</Typography>
			) : (
				<Typography>Please select rider</Typography>
			)}
			<Stack direction='column'>
				{orderList.length > 0
					? orderList.map((order, index) => (
							<Stack
								key={index}
								direction='row'
								justifyContent='space-between'
							>
								<Typography>
									{order.amount}x {order.name}
								</Typography>
								<Typography>
									{calculatePrice(order._id, order.amount)}฿
								</Typography>
							</Stack>
					  ))
					: null}
			</Stack>
			<Stack direction='column'>
				<Stack direction='row' justifyContent='flex-end'>
					<Typography>
						Totals: {calculateTotal()}
					</Typography>
				</Stack>
				<Stack direction='row' justifyContent='flex-end'>
					<IconButton color='success'>
						<SaveIcon />
					</IconButton>
					<IconButton color='error'>
						<DoNotDisturbIcon />
					</IconButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default OrderDetails;
