import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import ItemCreate from '../components/ItemManager/ItemCreate';
import ItemEdit from '../components/ItemManager/ItemEdit';
import ItemTable from '../components/ItemManager/ItemTable';
import Spinner from '../components/Spinner';
import {
	getItems,
	reset as resetItems,
} from '../features/items/itemSlice';
import {
	getMaterials,
	reset as resetMaterials,
} from '../features/materials/materialSlice';

const ItemManager = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { editingData } = useSelector(
		(state) => state.items
	);
	const { isLoading, isError, message } = useSelector(
		(state) => state.items
	);

	useEffect(() => {
		dispatch(getItems());
		dispatch(getMaterials());
	}, []);
	return (
		<>
			<Routes>
				<Route path='' element={<ItemTable />} />
				<Route path='create' element={<ItemCreate />} />
				<Route path='edit/:id' element={<ItemEdit />} />
			</Routes>
			{isLoading ? <Spinner /> : null}
		</>
	);
};

export default ItemManager;
