import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	createItemset,
	getItemsets,
} from '../../features/itemsets/itemsetSlice';
import GoBackButton from '../GoBackButton';
import Spinner from '../Spinner';
import ItemsetForm from './ItemsetForm';

const ItemsetCreate = ({ isLoading }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = 'blank';

	const handleCreateItemset = (
		_,
		name,
		items,
		workCost,
		gasCost
	) => {
		const itemsetData = {
			name,
			items,
			workCost,
			gasCost,
		};
		dispatch(createItemset(itemsetData));
		dispatch(getItemsets());
		navigate('/itemset-manager');
	};
	if (isLoading) return <Spinner />;
	return (
		<>
			<Stack
				direction='row'
				justifyContent='space-between'
				sx={{ mb: 2 }}
			>
				<Typography variant='h6'>
					Create new itemset
				</Typography>
				<GoBackButton
					location='itemset-manager'
					action={getItemsets}
				/>
			</Stack>
			<ItemsetForm
				id={id}
				handleSave={handleCreateItemset}
			/>
		</>
	);
};

export default ItemsetCreate;
