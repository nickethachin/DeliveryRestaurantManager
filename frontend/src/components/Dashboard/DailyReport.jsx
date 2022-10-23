import {
	Autocomplete,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Stack,
	TextField,
} from '@mui/material';
import {
	DataGrid,
	GridToolbarContainer,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// const Dropdown = () => {
// 	return (
// 		<Autocomplete
// 			disablePortal
// 			options={[]}
// 			sx={{ width: 300, my: 1 }}
// 			renderInput={(params) => (
// 				<TextField
// 					{...params}
// 					label='Label label label'
// 					size='small'
// 				/>
// 			)}
// 		/>
// 	);
// };
const DailyReport = () => {
	const { orders } = useSelector((state) => state.orders);
	const { expenses } = useSelector(
		(state) => state.expenses
	);
	const { riders } = useSelector((state) => state.riders);
	const [range, setRange] = useState('day');
	const [rows, setRows] = useState(
		riders.map((rider) => {
			// Get all orders from rider within range
			const thisOrders = orders.filter((order) => {
				const isIdMatch = order.rider._id === rider._id;
				const isInRange = true;
				return isIdMatch && isInRange;
			});

			// Calculate revenue
			const revenue = thisOrders.reduce((sum, order) => {
				const number = order.total;
				return (sum += number);
			}, 0);

			// Calculate ingredient cost
			// order>details[]>itemset>items[]>itemId>materials[]>matId&amount
			const totalMaterials = [];
			thisOrders.forEach(({ details }) => {
				details.forEach(({ itemset }) => {
					itemset.items.forEach(({ itemId }) => {
						itemId.materials.forEach((material) => {
							const matIndex = totalMaterials.findIndex(
								(mat) => mat._id === material.matId
							);
							if (matIndex !== -1) {
								totalMaterials[matIndex].amount +=
									material.amount;
							} else {
								totalMaterials.push({
									_id: material.matId,
									amount: material.amount,
								});
							}
						});
					});
				});
			});
			const ingredient = totalMaterials.reduce(
				(sum, mat) => {
					const expense = expenses.find((exp) => {
						if ('matId' in exp) {
							return exp.matId._id === mat._id;
						}
						return false;
					});
					if (expense) {
						const priceEach =
							expense.total / expense.amount;
						const total = mat.amount * priceEach;
						return (sum += total);
					} else {
						return (sum += 0);
					}
				},
				0
			);
			// Calculate gas cost
			let gas = 0;
			if (rider.gasCost) {
				// If rider have gas cost, count items in order and multiply by that
				gas = thisOrders.reduce((sum, order) => {
					const itemsetCount = order.details.reduce(
						(sum, { amount }) => (sum += amount),
						0
					);
					return (sum += itemsetCount * rider.gasCost);
				}, 0);
			} else {
				// Else, use itemset's gas cost
				gas = thisOrders.reduce((sum, order) => {
					const number = order.details.reduce(
						(sum, detail) =>
							(sum += detail.itemset.gasCost),
						0
					);
					return (sum += number);
				}, 0);
			}

			// Calculate work cost
			const work = thisOrders.reduce((sum, order) => {
				const number = order.details.reduce(
					(sum, detail) => (sum += detail.itemset.workCost),
					0
				);
				return (sum += number);
			}, 0);
			return {
				id: rider._id,
				rider: rider.name,
				revenue,
				ingredient,
				gas,
				work,
				profit: 0,
			};
		})
	);
	const columns = [
		{ headerName: 'Rider', field: 'rider', flex: 1 },
		{
			headerName: 'Revenue',
			field: 'revenue',
			type: 'number',
			flex: 1,
		},
		{
			headerName: 'Ingredient',
			field: 'ingredient',
			type: 'number',
			flex: 1,
		},
		{
			headerName: 'Gas',
			field: 'gas',
			type: 'number',
			flex: 1,
		},
		{
			headerName: 'Work',
			field: 'work',
			type: 'number',
			flex: 1,
		},
		{
			headerName: 'Profit',
			field: 'profit',
			type: 'number',
			flex: 1,
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
						{['year', 'month', 'week', 'day'].map(
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
	return (
		<Card>
			<CardHeader title='Account Report' />
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

export default DailyReport;
