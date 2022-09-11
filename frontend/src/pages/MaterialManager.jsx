import {
	Divider,
	LinearProgress,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MaterialCreate from '../components/MaterialManager/MaterialCreate';
import MaterialEditModal from '../components/MaterialManager/MaterialEditModal';
import MaterialTable from '../components/MaterialManager/MaterialTable';
import {
	getMaterials,
	reset,
} from '../features/materials/materialSlice';

const MaterialManager = () => {
	// TODO: Read
	// TODO: Update
	// TODO: Delete
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const { isLoading, isError, editingData, message } =
		useSelector((state) => state.materials);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (isError) {
			toast.error(message);
		}
		dispatch(getMaterials());
		return () => dispatch(reset());
	}, [user, navigate, isError, message, dispatch]);

	return (
		<>
			<Typography variant='h5'>Material Manager</Typography>
			<MaterialCreate />
			{isLoading ? (
				<LinearProgress sx={{ my: 2 }} />
			) : (
				<Divider sx={{ my: 2 }} />
			)}
			<MaterialTable />
			<MaterialEditModal isOpen={editingData.isEditing} />
		</>
	);
};

export default MaterialManager;
