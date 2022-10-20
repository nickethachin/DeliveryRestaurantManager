import { Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getItemsets,
	updateItemset,
} from '../../features/itemsets/itemsetSlice';
import GoBackButton from '../GoBackButton';
import Spinner from '../Spinner';
import ItemsetForm from './ItemsetForm';

const ItemsetEdit = ({ isLoading }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const handleEditItemset = (
		_id,
		name,
		items,
		workCost,
		gasCost
	) => {
		const itemsetData = {
			_id,
			name,
			items,
			workCost,
			gasCost,
		};
		dispatch(getItemsets());
		dispatch(updateItemset(itemsetData));
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
				<Typography variant='h6'>Editing - {id}</Typography>
				<GoBackButton
					location='itemset-manager'
					action={getItemsets}
				/>
			</Stack>
			<ItemsetForm id={id} handleSave={handleEditItemset} />
		</>
	);
};

export default ItemsetEdit;
