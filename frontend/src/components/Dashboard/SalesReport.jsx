import EqualizerIcon from '@mui/icons-material/Equalizer';
import GridOnIcon from '@mui/icons-material/GridOn';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Divider,
	IconButton,
	Stack,
	Toolbar,
	useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';

const SalesReport = () => {
	const theme = useTheme();
	const { riders } = useSelector((state) => state.riders);
	const { orders } = useSelector((state) => state.orders);

	const riderList = ['All'];
	riders.forEach((rider) => riderList.push(rider.name));

	const [selectRider, setSelectRider] = useState('All');
	const [range, setRange] = useState('M');
	const [rows, setRows] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [isChart, setIsChart] = useState(false);

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

				<Button
					color='primary'
					variant={isChart ? 'contained' : 'outlined'}
					endIcon={<EqualizerIcon />}
					onClick={() =>
						setIsChart((previous) => !previous)
					}
				>
					Graph view
				</Button>

				<ButtonGroup variant='text'>
					{['y', 'M', 'w', 'd'].map((localRange, index) => (
						<Button
							key={index}
							variant={
								localRange === range ? 'contained' : 'text'
							}
							onClick={() => setRange(localRange)}
						>
							{localRange}
						</Button>
					))}
				</ButtonGroup>
			</Stack>
		);
	};

	const chartOption = {
		legendTextStyle: {
			color: theme.palette.text.primary,
			fontSize: theme.typography.body1.fontSize,
		},
		backgroundColor: {
			fill: theme.palette.background.paper,
		},
		hAxis: {
			title: 'Menu',
			useFormatFromData: true,
			titleTextStyle: {
				color: theme.palette.text.primary,
				fontSize: theme.typography.body1.fontSize,

				italic: true,
			},
			textStyle: {
				color: theme.palette.text.primary,
				fontSize: theme.typography.body1.fontSize,
			},
		},
		legacyScatterChartLabels: true,
		vAxes: [
			{
				useFormatFromData: true,
				titleTextStyle: {
					color: theme.palette.text.primary,
					fontSize: theme.typography.body1.fontSize,

					italic: true,
				},
				textStyle: {
					color: theme.palette.text.primary,
					fontSize: theme.typography.body1.fontSize,
				},
				title: 'Amount',
				logScale: false,
			},
			{
				useFormatFromData: true,
				logScale: false,
			},
		],
		isStacked: true,
		booleanRole: 'certainty',
		fontName: theme.typography.body1.fontFamily,
	};
	useEffect(() => {
		updateRows();
	}, [selectRider, range]);

	useEffect(() => {
		updateRows();
	}, []);

	useEffect(() => {
		const newData = [['Menu']];

		//Setup
		if (selectRider === 'All') {
			riders.forEach((rider) =>
				newData[0].push(rider.name)
			);
		} else {
			newData[0].push('Amount');
		}

		//Data
		if (selectRider === 'All') {
			// Get all orders in range
			const filteredOrders = orders.filter((order) => {
				return (
					dayjs().diff(dayjs(order.date), range, true) <= 1
				);
			});

			// Get all possible itemset
			const possibleItems = [];
			filteredOrders.forEach((order) => {
				order.details.forEach((detail) => {
					possibleItems.push(detail.itemset.name);
				});
			});

			// Remove duplicate itemsets and push into newData
			const itemsList = [...new Set(possibleItems)];
			itemsList.forEach((item) => newData.push([item]));

			// Replace empty with 0
			for (let i = 0; i < newData.length; i++) {
				for (let j = 0; j < newData[0].length; j++) {
					if (!newData[i][j]) {
						newData[i][j] = 0;
					}
				}
			}

			// Push itemset's amount into newData
			filteredOrders.forEach((order) => {
				// find rider index
				const riderIndex = newData[0].findIndex(
					(rider) => rider === order.rider.name
				);
				order.details.forEach((detail) => {
					// find itemset index
					const itemsetIndex = newData.findIndex(
						(data) => data[0] === detail.itemset.name
					);
					// Push
					newData[itemsetIndex][riderIndex] +=
						detail.amount;
				});
			});
		} else {
			rows.forEach((row) =>
				newData.push([row.name, row.amount])
			);
		}
		while (newData.length < 8) {
			newData.splice(1, 0, [' ', 0]);
			newData.push([' ', 0]);
		}
		setChartData(newData);
	}, [rows]);
	return (
		<Card>
			<CardHeader
				onClick={updateRows}
				title='Sales Report'
			/>
			<CardContent>
				<Stack
					direction='column'
					alignItems='center'
					width='100%'
				>
					<Divider />
					<Toolbar sx={{ width: '100%' }}>
						<CustomToolbar />
					</Toolbar>
					{isChart ? (
						<Chart
							chartType='ColumnChart'
							width='100%'
							height='400px'
							data={chartData}
							options={chartOption}
						/>
					) : (
						<Box width='100%'>
							<DataGrid
								autoHeight
								columns={columns}
								rows={rows}
								disableSelectionOnClick
							/>
						</Box>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
};

export default SalesReport;
