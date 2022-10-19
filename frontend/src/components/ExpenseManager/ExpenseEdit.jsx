import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateExpense } from '../../features/expenses/expenseSlice';
import ExpenseForm from './ExpenseForm';

const ExpenseEdit = ({ saveAction }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { expenses } = useSelector(
		(state) => state.expenses
	);
	const expense = expenses.find(
		(expense) => expense._id === id
	);

	const updateDispatch = (data) => {
		try {
			const newData = { ...data, _id: expense._id };
			dispatch(updateExpense(newData));
			toast.success(
				`Update ${newData.name} ${newData.total}฿ successfully`
			);
		} catch (error) {}
	};
	if (expense) {
		return (
			<>
				<Typography variant='h6' sx={{ mb: 2 }}>
					Editing {expense._id}
				</Typography>
				<ExpenseForm
					expense={expense}
					saveAction={updateDispatch}
				/>
			</>
		);
	}
};

export default ExpenseEdit;
