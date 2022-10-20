import {
	Container,
	Divider,
	LinearProgress,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { getItemsets } from '../features/itemsets/itemsetSlice';
import { getRiders } from '../features/riders/riderSlice';

import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OrderCreate from '../components/OrderManager/OrderCreate';

const orders = [
	{
		_id: '1234567890',
		riderId: '62e4ed1e47c29ab190eb7358',
		details: [
			{
				itemsetId: '62e4fa6ec7be9c26f1f7a026',
				amount: 2,
			},
		],
	},
	{
		_id: '951468273',
		riderId: '62e4ed2247c29ab190eb735b',
		details: [
			{
				itemsetId: '62e5030ab51423ac2378c880',
				amount: 1,
			},
			{
				itemsetId: '62e5032fb51423ac2378c883',
				amount: 1,
			},
			{
				itemsetId: '62e50496b51423ac2378c892',
				amount: 1,
			},
			{
				itemsetId: '62e50528b51423ac2378c89e',
				amount: 2,
			},
		],
	},
];

const OrderManager = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getItemsets());
		dispatch(getRiders());
	}, [dispatch]);

	const { itemsets, isLoading: isItemsetsLoading } =
		useSelector((state) => state.itemsets);
	const { riders, isLoading: isRidersLoading } =
		useSelector((state) => state.riders);
	const isLoading = isItemsetsLoading && isRidersLoading;

	if (!itemsets || !riders) return <Spinner />;
	return (
		<Container>
			<Typography variant='h5'>Order Manager</Typography>
			{isLoading ? (
				<LinearProgress sx={{ my: 2 }} />
			) : (
				<Divider sx={{ my: 2 }} />
			)}
			<OrderCreate />
		</Container>
	);
};

export default OrderManager;
