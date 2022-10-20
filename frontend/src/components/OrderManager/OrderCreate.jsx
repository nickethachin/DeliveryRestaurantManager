import {
	Card,
	CardContent,
	CardHeader,
	Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderDetails from './OrderDetails';
import OrderQuickSelect from './OrderQuickSelect';

const OrderCreate = () => {
	const dispatch = useDispatch();

	const { itemsets } = useSelector(
		(state) => state.itemsets
	);
	const { riders, isLoading } = useSelector(
		(state) => state.riders
	);

	const [selectRider, setSelectRider] = useState('');
	const [riderData, setRiderData] = useState({ name: '' });
	const [orderList, setOrderList] = useState([]);
	const orderAddItem = (id) => {
		let newOrders = orderList;
		// find item in orderList
		const itemIndex = newOrders.findIndex(
			(order) => order._id === id
		);
		if (itemIndex !== -1) {
			// If found, edit amount
			newOrders[itemIndex].amount++;
		} else {
			// If not found, push to the array
			const itemData = itemsets.find(
				(itemset) => itemset._id === id
			);
			newOrders.push({ ...itemData, amount: 1 });
		}
		setOrderList([...newOrders]);
	};
	const orderRemoveItem = (id) => {
		let newOrders = orderList;
		// find item in orderList
		const itemIndex = newOrders.findIndex(
			(order) => order._id === id
		);
		const item = newOrders[itemIndex];
		if (item.amount > 1) {
			newOrders[itemIndex].amount--;
		} else {
			newOrders.splice(itemIndex, 1);
		}
		setOrderList([...newOrders]);
	};
	const orderReset = () => {
		setOrderList([]);
	};
	const handleRiderChange = (event, newRider) => {
		if (newRider !== null) setSelectRider(newRider);
	};

	useEffect(() => {
		const newRider = riders.find(
			(rider) => rider._id === selectRider
		);
		setRiderData({ ...newRider });
	}, [selectRider]);

	return (
		<Stack
			direction={{ md: 'column', lg: 'row' }}
			justifyContent='space-between'
			spacing={2}
		>
			<Card sx={{ width: { md: '100%', lg: '65%' } }}>
				<CardHeader title='Editor' />
				<CardContent>
					<OrderQuickSelect
						selectRider={selectRider}
						riderData={riderData}
						orderAddItem={orderAddItem}
						handleRiderChange={handleRiderChange}
					/>
				</CardContent>
			</Card>
			<Card
				sx={{
					width: { md: '100%', lg: '33%' },
				}}
			>
				<CardHeader
					title='Details'
					onClick={() => console.log(orderList)}
				/>
				<CardContent sx={{ height: '100%' }}>
					<OrderDetails
						selectRider={selectRider}
						riderData={riderData}
						orderList={orderList}
						addAction={orderAddItem}
						removeAction={orderRemoveItem}
						resetAction={orderReset}
					/>
				</CardContent>
			</Card>
		</Stack>
	);
};

export default OrderCreate;
