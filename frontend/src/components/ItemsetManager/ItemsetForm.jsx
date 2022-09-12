import {
	IconButton,
	Stack,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	addItem,
	editGasCost,
	editName,
	editWorkCost,
	getItemsets,
	removeItem,
} from '../../features/itemsets/itemsetSlice';
import Spinner from '../Spinner';
import ItemItem from './ItemItem';

import CancelIcon from '@mui/icons-material/Cancel';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveIcon from '@mui/icons-material/Save';

const ItemsetForm = ({ id, handleSave }) => {
	const dispatch = useDispatch();

	// Get items from store to use as dropdown option
	const { items } = useSelector((state) => state.items);
	const options = items.map((item) => {
		return { value: item._id, label: item.name };
	});

	const {
		name,
		items: itemsList,
		workCost,
		gasCost,
	} = useSelector((state) => {
		return state.itemsets.itemsets.find(
			(itemset) => itemset._id === id
		);
	});

	const handleNameInput = (event) => {
		dispatch(
			editName({
				_id: id,
				name: event.target.value,
			})
		);
	};

	const handleWorkCostInput = (event) => {
		dispatch(
			editWorkCost({
				_id: id,
				workCost: Number(event.target.value),
			})
		);
	};

	const handleGasCostInput = (event) => {
		dispatch(
			editGasCost({
				_id: id,
				gasCost: Number(event.target.value),
			})
		);
	};

	const handleAddItem = () => {
		dispatch(addItem({ _id: id }));
	};

	const handleRemoveItem = (index) => {
		dispatch(removeItem({ _id: id, index }));
	};

	const handleResetItemset = () => {
		dispatch(getItemsets());
	};

	return (
		<>
			<Stack spacing={2}>
				<Stack direction='row'>
					<TextField
						name='name'
						variant='outlined'
						size='small'
						value={name}
						onChange={handleNameInput}
						fullWidth
					/>
					<TextField
						name='workCost'
						type='number'
						label='Work Cost'
						variant='outlined'
						size='small'
						value={workCost}
						onChange={handleWorkCostInput}
					/>
					<TextField
						name='gasCost'
						type='number'
						label='Gas Cost'
						variant='outlined'
						size='small'
						value={gasCost}
						onChange={handleGasCostInput}
					/>
				</Stack>
				{itemsList !== undefined ? (
					itemsList.map((item, index) => {
						return (
							<ItemItem
								id={id}
								item={item}
								index={index}
								remove={handleRemoveItem}
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
					<IconButton onClick={handleAddItem}>
						<LibraryAddIcon />
					</IconButton>
					<Stack direction='row' spacing={1}>
						<IconButton
							color='success'
							onClick={() => {
								handleSave(
									id,
									name,
									itemsList,
									workCost,
									gasCost
								);
							}}
						>
							<SaveIcon />
						</IconButton>
						<IconButton
							onClick={handleResetItemset}
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

export default ItemsetForm;
