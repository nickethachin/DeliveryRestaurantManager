import {
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const BalanceCard = ({ rider, amount }) => {
	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography color='text.secondary' gutterBottom>
					BALANCE
				</Typography>
				<Stack
					direction='row'
					justifyContent='space-between'
				>
					<Typography variant='h5'>{rider}</Typography>
					<Typography variant='h5'>
						{Number(amount).toFixed(0).toLocaleString()} ฿
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	});

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Divider>
				<Typography variant='h4'>Dashboard</Typography>
			</Divider>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<BalanceCard rider='Grab' amount='295' />
				</Grid>
				<Grid item xs={3}>
					<BalanceCard rider='Lineman' amount='457.65' />
				</Grid>
				<Grid item xs={3}>
					<BalanceCard rider='Shopee' amount='135' />
				</Grid>
				<Grid item xs={3}>
					<BalanceCard rider='Foodpanda' amount='279.45' />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
