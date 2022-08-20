import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MaterialCreate from '../components/MaterialManager/MaterialCreate';
import MaterialEditModal from '../components/MaterialManager/MaterialEditModal';
import MaterialTable from '../components/MaterialManager/MaterialTable';
import Spinner from '../components/Spinner';
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
		dispatch(getMaterials());
		return () => dispatch(reset());
	}, [user, navigate, isError, message, dispatch]);

	return (
		<>
			<MaterialCreate />
			<MaterialTable />
			<MaterialEditModal isOpen={editingData.isEditing} />
			{isLoading ? <Spinner /> : null}
		</>
	);
};

export default MaterialManager;
