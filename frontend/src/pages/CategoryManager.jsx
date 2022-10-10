import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoriesList from '../components/CategoryManager/CategoriesList';
import CategoryCreate from '../components/CategoryManager/CategoryCreate';
import CategoryEdit from '../components/CategoryManager/CategoryEdit';
import ProgressDivider from '../components/ProgressDivider';
import { getCategories } from '../features/expenseCategories/categorySlice';

const CategoryManager = () => {
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
		dispatch(getCategories());
	}, []);
	return (
		<>
			<Stack direction='row' justifyContent='space-between'>
				<Typography variant='h5'>
					Category Manager
				</Typography>
				<Button
					variant='contained'
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate('/expense-manager/')}
				>
					Back
				</Button>
			</Stack>

			<ProgressDivider isLoading={isLoading} />
			<Routes>
				<Route path='' element={<CategoriesList />} />
				<Route path='create' element={<CategoryCreate />} />
				<Route path='edit/:id' element={<CategoryEdit />} />
			</Routes>
		</>
	);
};

export default CategoryManager;
