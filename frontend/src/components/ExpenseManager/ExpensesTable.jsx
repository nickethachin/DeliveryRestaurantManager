import {
	Button,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RepeatIcon from '@mui/icons-material/Repeat';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import {
	createExpense,
	deleteExpense,
	getExpenses,
} from '../../features/expenses/expenseSlice';

const ExpensesTable = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { expenses } = useSelector(
		(state) => state.expenses
	);
	const { categories } = useSelector(
		(state) => state.expenseCategories
	);

	let rows = [];
	if (expenses !== []) {
		rows = expenses
			.filter((expense) => expense.category !== null)
			.map((expense) => {
				let formattedAmount = expense.amount;
				if ('matId' in expense) {
					formattedAmount = `${expense.amount} ${expense.matId.unit}`;
				}
				return {
					id: expense._id,
					category: expense.category.name,
					name: expense.name,
					amount: formattedAmount,
					total: expense.total,
					date: expense.date,
				};
			});
	}

	const handleCreateClick = () => {
		navigate(`/expense-manager/create/`);
	};

	const handleEditClick = (params) => {
		navigate(`/expense-manager/edit/${params.id}`);
	};

	const handleRepeatClick = (params) => {
		try {
			const data = expenses.find(
				(expense) => expense._id === params.id
			);
			const newData = {
				name: data.name,
				category: data.category._id,
				matId: 'matId' in data ? data.matId._id : undefined,
				amount: data.amount,
				total: data.total,
				date: dayjs().toDate(),
			};
			dispatch(createExpense(newData));
			toast.success(
				`Create ${newData.name} ${newData.total}฿ successfully`
			);
		} catch (error) {
			toast.error(error);
		}
	};

	const handleDeleteClick = (params) => {
		try {
			dispatch(deleteExpense(params.id));
			toast.success('Delete successfully');
		} catch (error) {
			toast.error(error);
		}
	};

	const EditButton = (params) => {
		return (
			<IconButton
				variant='contained'
				size='small'
				color='secondary'
				onClick={() => handleEditClick(params)}
			>
				<EditIcon />
			</IconButton>
		);
	};

	const RepeatButton = (params) => {
		return (
			<IconButton
				variant='contained'
				size='small'
				color='success'
				onClick={() => handleRepeatClick(params)}
			>
				<RepeatIcon />
			</IconButton>
		);
	};

	const DeleteButton = (params) => {
		return (
			<IconButton
				variant='contained'
				size='small'
				color='error'
				onClick={() => handleDeleteClick(params)}
			>
				<DeleteIcon />
			</IconButton>
		);
	};
	const actionButtons = (params) => {
		return (
			<Stack direction='row'>
				<EditButton {...params} />
				<RepeatButton {...params} />
				<DeleteButton {...params} />
			</Stack>
		);
	};

	const columns = [
		{ field: 'category', headerName: 'Category' },
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'amount', headerName: 'Amount' },
		{
			field: 'total',
			headerName: 'Total',
			type: 'number',
			renderCell: (params) => `${params.row.total} ฿`,
		},
		{
			field: 'date',
			headerName: 'Date',
			width: 150,
			type: 'dateTime',
			renderCell: (params) =>
				new Date(params.row.date).toLocaleString('en-GB', {
					timeStyle: 'short',
					dateStyle: 'short',
				}),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 150,
			renderCell: actionButtons,
		},
	];

	return (
		<>
			<Stack
				sx={{ my: 2 }}
				direction='row'
				justifyContent='space-between'
			>
				<Typography variant='h6'>
					Expense records
				</Typography>
				<Button
					variant='contained'
					endIcon={<AddIcon />}
					onClick={handleCreateClick}
				>
					Create
				</Button>
			</Stack>
			<DataGrid
				columns={columns}
				rows={expenses === [] ? [] : rows}
				autoHeight
				disableSelectionOnClick={true}
				initialState={{
					sorting: {
						sortModel: [{ field: 'date', sort: 'desc' }],
					},
				}}
			/>
		</>
	);
};

export default ExpensesTable;
