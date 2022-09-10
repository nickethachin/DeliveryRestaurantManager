import { Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getItems,
	updateItem,
} from '../../features/items/itemSlice';
import GoBackButton from '../GoBackButton';
import ItemForm from './ItemForm';

const ItemEdit = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const handleEditItem = (_id, name, materials) => {
		dispatch(
			updateItem({
				_id,
				name,
				materials,
			})
		);
		navigate('/item-manager');
	};
	return (
		<>
			<Stack
				direction='row'
				justifyContent='space-between'
				sx={{ mb: 2 }}
			>
				<Typography variant='h6'>Editing - {id}</Typography>
				<GoBackButton
					location='item-manager'
					action={getItems}
				/>
			</Stack>
			<ItemForm id={id} handleSave={handleEditItem} />
		</>
	);
};

export default ItemEdit;
