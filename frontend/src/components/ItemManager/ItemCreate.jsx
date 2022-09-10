import {
	Button,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../../features/items/itemSlice';
import GoBackButton from '../GoBackButton';
import MaterialItem from './MaterialItem';

import CancelIcon from '@mui/icons-material/Cancel';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveIcon from '@mui/icons-material/Save';
import Spinner from '../Spinner';

const ItemCreate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const items = useSelector((state) => state.items);

	// Get materials from store to use as dropdown option
	const { materials } = useSelector(
		(state) => state.materials
	);
	const options = materials.map((material) => {
		return { value: material._id, label: material.name };
	});

	const { name, materials: materialsList } = useSelector(
		(state) => state.items.items[state.items.items.length]
	);
	return (
		<>
			<Stack direction='row' justifyContent='space-between'>
				<Typography variant='h6'>
					Create new item
				</Typography>
				<GoBackButton
					location='item-manager'
					action={getItems}
				/>
			</Stack>
			<Stack spacing={2}>
				<TextField
					name='name'
					variant='outlined'
					size='small'
					value={name}
					onChange={handleNameInput}
				/>
				{materialsList !== undefined ? (
					materialsList.map((material, index) => {
						return (
							<MaterialItem
								material={material}
								index={index}
								remove={handleRemoveMaterial}
								options={options}
								key={index}
							/>
						);
					})
				) : (
					<Spinner />
				)}
				<Stack
					direction='row'
					justifyContent='space-between'
				>
					<IconButton onClick={handleAddMaterial}>
						<LibraryAddIcon />
					</IconButton>
					<Stack direction='row' spacing={1}>
						<IconButton
							color='success'
							onClick={handleSaveItem}
						>
							<SaveIcon />
						</IconButton>
						<IconButton
							onClick={handleResetItem}
							color='error'
						>
							<CancelIcon />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default ItemCreate;
