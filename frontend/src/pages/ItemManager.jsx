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
import ItemCreate from '../components/ItemManager/ItemCreate';
import ItemEdit from '../components/ItemManager/ItemEdit';
import ItemTable from '../components/ItemManager/ItemTable';
import { getItems } from '../features/items/itemSlice';
import { getMaterials } from '../features/materials/materialSlice';
const ItemManager = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading: isItemsLoading } = useSelector(
		(state) => state.items
	);
	const { isLoading: isMaterialsLoading } = useSelector(
		(state) => state.materials
	);
	const isLoading = isItemsLoading && isMaterialsLoading;

	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	useEffect(() => {
		dispatch(getItems());
		dispatch(getMaterials());
	}, []);
	if (isLoading) {
		return (
			<>
				<Typography variant='h5'>Item Manager</Typography>
				<LinearProgress sx={{ my: 2 }} />
			</>
		);
	}
	return (
		<>
			<Typography variant='h5'>Item Manager</Typography>
			<Divider sx={{ my: 2 }} />
			<Routes>
				<Route path='' element={<ItemTable />} />
				<Route path='create' element={<ItemCreate />} />
				<Route path='edit/:id' element={<ItemEdit />} />
			</Routes>
		</>
	);
};

export default ItemManager;
