import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	createItem,
	getItems,
} from '../../features/items/itemSlice';
import GoBackButton from '../GoBackButton';
import ItemForm from './ItemForm';

const ItemCreate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = 'blank';

	const handleCreateItem = (_, name, materials) => {
		dispatch(
			createItem({
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
				<Typography variant='h6'>
					Create new item
				</Typography>
				<GoBackButton
					location='item-manager'
					action={getItems}
				/>
			</Stack>
			<ItemForm id={id} handleSave={handleCreateItem} />
		</>
	);
};

export default ItemCreate;
