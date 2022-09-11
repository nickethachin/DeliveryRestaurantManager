import DeleteIcon from '@mui/icons-material/Delete';
import {
	Autocomplete,
	FormControl,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Popover,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';

import CalculateIcon from '@mui/icons-material/Calculate';
import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../../features/itemsets/itemsetSlice';
import RatioCalculator from '../RatioCalculator';

const ItemItemset = ({ id, index, remove, options }) => {
	const dispatch = useDispatch();

	const { itemId, amount } = useSelector(
		(state) =>
			state.itemsets.itemsets.find(
				(itemset) => itemset._id === id
			).items[index]
	);
	const { unit: matUnit } = useSelector((state) => {
		if (itemId != null) {
			return state.items.items.find(
				(item) => item._id === itemId
			);
		} else return { unit: null };
	});

	// Autocomplete's value
	const [value, setValue] = useState(() => {
		if (itemId != null) {
			return options.find(
				(option) => option.value === itemId
			);
		} else return null;
	});
	const [anchorEl, setAnchorEl] = useState(null);

	const handleChangeAmount = (event) => {
		const item = {
			itemId,
			amount: Number(event.target.value),
		};
		const payload = {
			_id: id,
			itemIndex: index,
			item,
		};
		dispatch(editItem(payload));
	};

	const handleChangeItem = (event, newValue) => {
		setValue(newValue);
		const itemId = newValue.value;
		const payload = {
			_id: id,
			itemIndex: index,
			item: {
				itemId,
				amount,
			},
		};
		dispatch(editItem(payload));
	};

	const openCalculator = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const closeCalculator = () => {
		setAnchorEl(null);
	};
	const setAmount = (amount) => {
		const event = { target: { value: amount } };
		handleChangeAmount(event);
	};

	return (
		<Stack
			key={index}
			direction='row'
			spacing={1}
			alignItems='center'
			justifyContent='space-between'
		>
			<Typography variant='body1'>
				{index + 1}.) ใช้
			</Typography>
			<div style={{ width: '300px' }}>
				<Autocomplete
					options={options}
					value={value}
					onChange={(event, newValue) => {
						handleChangeItem(id, newValue);
					}}
					isOptionEqualToValue={(option, value) =>
						option.value === value.value
					}
					renderInput={(params) => (
						<TextField {...params} label='Item' />
					)}
				/>
			</div>
			<Typography variant='body1'>จำนวน</Typography>

			<FormControl>
				<OutlinedInput
					value={amount}
					onChange={handleChangeAmount}
					type='number'
					sx={{ width: 200 }}
					endAdornment={
						<InputAdornment position='end'>
							{matUnit}
						</InputAdornment>
					}
					startAdornment={
						<InputAdornment position='start'>
							<CalculateIcon onClick={openCalculator} />
						</InputAdornment>
					}
				/>
			</FormControl>

			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={closeCalculator}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<RatioCalculator
					setAmount={setAmount}
					close={closeCalculator}
					unit={matUnit}
				/>
			</Popover>

			<Typography variant='body1'>ต่อชุด</Typography>
			<IconButton
				size='small'
				color='error'
				onClick={() => remove(index)}
			>
				<DeleteIcon />
			</IconButton>
		</Stack>
	);
};

export default ItemItemset;
