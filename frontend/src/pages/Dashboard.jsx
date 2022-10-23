import {
	Box,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DailyReport from '../components/Dashboard/DailyReport';
import SalesChart from '../components/Dashboard/SalesChart';
import SalesReport from '../components/Dashboard/SalesReport';
import Spinner from '../components/Spinner';
import { getExpenses } from '../features/expenses/expenseSlice';
import { getOrders } from '../features/orders/orderSlice';
import { getRiders } from '../features/riders/riderSlice';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { isLoading: isOrdersLoading } = useSelector(
		(state) => state.orders
	);
	const { sLoading: isRidersLoading } = useSelector(
		(state) => state.riders
	);
	const { sLoading: isExpensesLoading } = useSelector(
		(state) => state.expenses
	);
	const isLoading =
		isRidersLoading && isOrdersLoading && isExpensesLoading;

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	});

	useEffect(() => {
		dispatch(getOrders());
		dispatch(getRiders());
		dispatch(getExpenses());
	}, [dispatch]);

	if (isLoading) return <Spinner />;
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Divider>
				<Typography variant='h4'>Dashboard</Typography>
			</Divider>
			{/* <DailyReport /> */}
			<Stack direction='column' spacing={2}>
				<SalesReport />
			</Stack>
		</Box>
	);
};

export default Dashboard;
