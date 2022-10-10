import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpensesTable from '../components/ExpenseManager/ExpensesTable';
import ProgressDivider from '../components/ProgressDivider';
import { getCategories } from '../features/expenseCategories/categorySlice';
import { getExpenses } from '../features/expenses/expenseSlice';

import CategoryIcon from '@mui/icons-material/Category';
import ExpenseCreate from '../components/ExpenseManager/ExpenseCreate';
import ExpenseEdit from '../components/ExpenseManager/ExpenseEdit';

const ExpenseManager = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, message } = useSelector(
		(state) => state.expenses
	);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (isError) {
			toast.error(message);
		}
	}, [user, isError, message]);

	useEffect(() => {
		dispatch(getExpenses());
		dispatch(getCategories());
	}, []);

	const handleCategoryClick = () => {
		navigate(`/expense-manager/category/`);
	};

	return (
		<>
			<Stack
				sx={{ my: 2 }}
				direction='row'
				justifyContent='space-between'
			>
				<Typography variant='h5'>
					Expense Manager
				</Typography>

				<Button
					variant='text'
					color='warning'
					endIcon={<CategoryIcon />}
					onClick={handleCategoryClick}
				>
					Category Edit
				</Button>
			</Stack>
			<ProgressDivider isLoading={isLoading} />
			<Routes>
				<Route path='' element={<ExpensesTable />} />
				<Route path='create' element={<ExpenseCreate />} />
				<Route path='edit/:id' element={<ExpenseEdit />} />
				<Route path='category/*' />
			</Routes>
		</>
	);
};

export default ExpenseManager;
