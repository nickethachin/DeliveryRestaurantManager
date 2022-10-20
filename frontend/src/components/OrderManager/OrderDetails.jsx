import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SaveIcon from '@mui/icons-material/Save';
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../features/orders/orderSlice';
import DatePickerNow from '../DatePickerNow';

const OrderDetails = ({
	selectRider,
	riderData,
	orderList,
	addAction,
	removeAction,
	resetAction,
}) => {
	const dispatch = useDispatch();
	const [date, setDate] = useState(null);
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

	const handleSaveClick = () => {
		const order = {
			rider: selectRider,
			details: orderList.map((item) => {
				return { itemset: item._id, amount: item.amount };
			}),
			date:
				date !== null ? dayjs(date).toDate() : undefined,
		};
		dispatch(createOrder(order));
		resetAction();
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
				{selectRider && orderList.length > 0
					? orderList.map((order, index) => (
							<>
								<Stack
									key={index}
									direction='row'
									justifyContent='space-between'
									alignItems='center'
								>
									<Stack
										direction='row'
										spacing={1}
										alignItems='center'
									>
										<ButtonGroup
											size='small'
											orientation='vertical'
										>
											<IconButton
												size='small'
												onClick={() => addAction(order._id)}
											>
												+
											</IconButton>
											<IconButton
												size='small'
												onClick={() =>
													removeAction(order._id)
												}
											>
												-
											</IconButton>
										</ButtonGroup>
										<Divider
											orientation='vertical'
											flexItem
										/>
										<Typography>
											{order.amount}x {order.name}
										</Typography>
									</Stack>
									<Typography>
										{calculatePrice(
											order._id,
											order.amount
										)}
										฿
									</Typography>
								</Stack>
								<Divider variant='middle' />
							</>
					  ))
					: null}
			</Stack>
			<Stack direction='column'>
				<Stack direction='row' justifyContent='flex-end'>
					<Typography>
						Totals: {calculateTotal()}
					</Typography>
				</Stack>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<DatePickerNow value={date} setValue={setDate} />
					<Box>
						<IconButton
							color='success'
							onClick={handleSaveClick}
							size='large'
						>
							<SaveIcon size='large' />
						</IconButton>
						<IconButton
							color='error'
							size='large'
							onClick={resetAction}
						>
							<DoNotDisturbIcon />
						</IconButton>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default OrderDetails;
