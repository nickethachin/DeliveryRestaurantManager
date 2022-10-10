import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createExpense } from '../../features/expenses/expenseSlice';
import ExpenseForm from './ExpenseForm';
const ExpenseCreate = () => {
	const dispatch = useDispatch();
	const createDispatch = (data) => {
		try {
			dispatch(createExpense(data));
			toast.success(
				`Create ${data.name} ${data.total}฿ successfully`
			);
		} catch (error) {
			toast.error(error);
		}
	};
	return (
		<>
			<Typography variant='h6' sx={{ mb: 2 }}>
				Create new expense
			</Typography>
			<ExpenseForm saveAction={createDispatch} />
		</>
	);
};

export default ExpenseCreate;
