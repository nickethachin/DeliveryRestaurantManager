import {
	Container,
	Divider,
	LinearProgress,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderCreate from '../components/OrderManager/OrderCreate';
import OrdersTable from '../components/OrderManager/OrdersTable.jsx';
import Spinner from '../components/Spinner';
import { getItemsets } from '../features/itemsets/itemsetSlice';
import { getOrders } from '../features/orders/orderSlice';
import { getRiders } from '../features/riders/riderSlice';

const OrderManager = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getItemsets());
		dispatch(getRiders());
		dispatch(getOrders());
	}, [dispatch]);

	const { itemsets, isLoading: isItemsetsLoading } =
		useSelector((state) => state.itemsets);
	const { riders, isLoading: isRidersLoading } =
		useSelector((state) => state.riders);
	const { orders, isLoading: isOrdersLoading } =
		useSelector((state) => state.orders);
	const isLoading =
		isItemsetsLoading && isRidersLoading && isOrdersLoading;

	if (!itemsets || !riders) return <Spinner />;
	return (
		<Container>
			<Stack
				direction='column'
				spacing={2}
				alignItems='center'
			>
				<Typography variant='h5'>Order Manager</Typography>
				{isLoading ? (
					<LinearProgress sx={{ my: 2 }} />
				) : (
					<Divider sx={{ my: 2 }} />
				)}
				<OrderCreate />
				<OrdersTable orders={orders} />
			</Stack>
		</Container>
	);
};

export default OrderManager;
