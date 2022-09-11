import {
	Divider,
	LinearProgress,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import ItemsetCreate from '../components/ItemsetManager/ItemsetCreate';
import ItemsetEdit from '../components/ItemsetManager/ItemsetEdit';
import ItemsetTable from '../components/ItemsetManager/ItemsetTable';
import { getItems } from '../features/items/itemSlice';
import { getItemsets } from '../features/itemsets/itemsetSlice';

const ItemsetManager = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, isError, message } = useSelector(
		(state) => state.itemsets
	);
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (isError) {
			toast.error(message);
		} else if (message != '') {
			toast.done(message);
		}
	}, [user, isError, message]);

	useEffect(() => {
		dispatch(getItemsets());
		dispatch(getItems());
	}, []);

	return (
		<>
			<Typography variant='h5'>Itemset Manager</Typography>
			{isLoading ? (
				<LinearProgress sx={{ my: 2 }} />
			) : (
				<Divider sx={{ my: 2 }} />
			)}
			<Routes>
				<Route path='' element={<ItemsetTable />} />
				<Route path='create' element={<ItemsetCreate />} />
				<Route path='edit/:id' element={<ItemsetEdit />} />
			</Routes>
		</>
	);
};

export default ItemsetManager;
