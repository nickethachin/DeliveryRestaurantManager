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
import { editMaterial } from '../../features/items/itemSlice';
import MaterialCalculator from './MaterialCalculator';

const MaterialItem = ({ id, index, remove, options }) => {
	const dispatch = useDispatch();

	const { matId, amount } = useSelector(
		(state) =>
			state.items.items.find((item) => item._id == id)
				.materials[index]
	);
	const { unit: matUnit } = useSelector((state) => {
		if (matId != null) {
			return state.materials.materials.find(
				(material) => material._id == matId
			);
		} else return { unit: null };
	});

	// Autocomplete's value
	const [value, setValue] = useState(() => {
		if (matId != null) {
			return options.find(
				(option) => option.value === matId
			);
		} else return null;
	});
	const [anchorEl, setAnchorEl] = useState(null);

	const handleChangeAmount = (event) => {
		const material = {
			matId,
			amount: event.target.value,
		};
		const payload = {
			_id: id,
			materialIndex: index,
			material,
		};
		dispatch(editMaterial(payload));
	};

	const handleChangeMaterial = (event, newValue) => {
		setValue(newValue);
		const matId = newValue.value;
		const payload = {
			_id: id,
			materialIndex: index,
			material: {
				matId,
				amount,
			},
		};
		dispatch(editMaterial(payload));
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
						handleChangeMaterial(id, newValue);
					}}
					isOptionEqualToValue={(option, value) =>
						option.value === value.value
					}
					renderInput={(params) => (
						<TextField {...params} label='Material' />
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
				<MaterialCalculator
					setAmount={setAmount}
					close={closeCalculator}
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

export default MaterialItem;
