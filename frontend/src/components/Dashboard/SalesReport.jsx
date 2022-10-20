import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Stack,
} from '@mui/material';
import {
	DataGrid,
	GridToolbarContainer,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SalesReport = () => {
	const { riders } = useSelector((state) => state.riders);
	const { orders } = useSelector((state) => state.orders);

	const riderList = ['All'];
	riders.forEach((rider) => riderList.push(rider.name));

	const [selectRider, setSelectRider] = useState('All');
	const [range, setRange] = useState('M');
	const [rows, setRows] = useState([]);

	const updateRows = () => {
		const itemList = [];
		let filteredOrders = orders.filter((order) => {
			return (
				dayjs().diff(dayjs(order.date), range, true) <= 1
			);
		});
		if (selectRider !== 'All') {
			filteredOrders = filteredOrders.filter(
				(order) => order.rider.name === selectRider
			);
		}
		filteredOrders.forEach((order) => {
			order.details.forEach((item) => {
				const index = itemList.findIndex(
					(i) => i.id === item.itemset._id
				);
				if (index !== -1) {
					itemList[index].amount += item.amount;
				} else {
					itemList.push({
						id: item.itemset._id,
						name: item.itemset.name,
						amount: item.amount,
					});
				}
			});
		});
		setRows(itemList);
	};

	const handleSelectRider = (name) => {
		setSelectRider(name);
	};

	const columns = [
		{ headerName: 'Menu', field: 'name', flex: 1 },
		{
			headerName: 'Amount',
			field: 'amount',
			type: 'number',
		},
	];

	const CustomToolbar = () => {
		return (
			<GridToolbarContainer>
				<Stack
					direction='row'
					justifyContent='space-between'
					width='100%'
				>
					<ButtonGroup variant='text'>
						{riders &&
							riderList.map((localRider, index) => (
								<Button
									key={index}
									variant={
										localRider === selectRider
											? 'contained'
											: 'text'
									}
									onClick={() =>
										handleSelectRider(localRider)
									}
								>
									{localRider}
								</Button>
							))}
					</ButtonGroup>
					<ButtonGroup variant='text'>
						{['y', 'M', 'w', 'd'].map(
							(localRange, index) => (
								<Button
									key={index}
									variant={
										localRange === range
											? 'contained'
											: 'text'
									}
									onClick={() => setRange(localRange)}
								>
									{localRange}
								</Button>
							)
						)}
					</ButtonGroup>
				</Stack>
			</GridToolbarContainer>
		);
	};

	useEffect(() => {
		updateRows();
	}, [selectRider, range]);
	useEffect(() => {
		updateRows();
	}, []);

	return (
		<Card>
			<CardHeader
				onClick={updateRows}
				title='Sales Report'
			/>
			<CardContent>
				<Stack direction='column' alignItems='center'>
					<Divider />
					<Box width='100%'>
						<DataGrid
							autoHeight
							columns={columns}
							rows={rows}
							disableSelectionOnClick
							components={{ Toolbar: CustomToolbar }}
						/>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default SalesReport;
