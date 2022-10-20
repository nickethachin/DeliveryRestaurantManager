import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../../features/orders/orderSlice';

const OrdersTable = () => {
	const dispatch = useDispatch();
	const { orders } = useSelector((state) => state.orders);
	const columns = [
		{
			headerName: 'Rider',
			field: 'rider',
			valueGetter: (params) => params.row.rider.name,
		},
		{
			headerName: 'Details',
			field: 'formattedDetails',
			valueGetter: (params) => {
				const text = [];
				params.row.details.forEach((item) => {
					text.push(`${item.itemset.name}x${item.amount}`);
				});
				return text.join(', ');
			},
			flex: 1,
		},
		{
			headerName: 'Items',
			field: 'items',
			valueGetter: (params) => params.row.details.length,
		},
		{
			headerName: 'Total',
			field: 'total',
		},
		{
			headerName: 'Date',
			field: 'date',
			width: 150,
			type: 'dateTime',
			renderCell: (params) =>
				new Date(params.row.date).toLocaleString('en-GB', {
					timeStyle: 'short',
					dateStyle: 'short',
				}),
		},
		{
			field: 'delete',
			headerName: 'Del',
			width: 50,
			renderCell: (params) => (
				<IconButton
					variant='contained'
					size='small'
					color='error'
					onClick={() => handleDeleteClick(params.id)}
				>
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	const handleDeleteClick = (id) => {
		dispatch(deleteOrder(id));
	};
	return (
		<Card sx={{ width: '100%' }}>
			<CardHeader title='Table' />
			<CardContent>
				<Box sx={{ width: '100%' }}>
					<DataGrid
						autoHeight
						columns={columns}
						rows={orders}
						getRowId={(row) => row._id}
						disableSelectionOnClick
						initialState={{
							sorting: {
								sortModel: [
									{ field: 'date', sort: 'desc' },
								],
							},
						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

export default OrdersTable;
