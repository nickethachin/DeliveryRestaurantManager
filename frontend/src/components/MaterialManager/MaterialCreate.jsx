import {
	Button,
	Divider,
	MenuItem,
	Stack,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMaterial } from '../../features/materials/materialSlice';

const MaterialCreate = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: '',
		type: 'ingredient',
		unit: '',
	});

	const handleFormChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = () => {
		dispatch(createMaterial(formData));
		setFormData({
			name: '',
			type: 'ingredient',
			unit: '',
		});
	};

	return (
		<>
			<h1>MaterialManager</h1>
			<Stack
				direction='row'
				justifyContent='center'
				divider={
					<Divider orientation='vertical' flexItem />
				}
			>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: '10em' },
					}}
				>
					<TextField
						name='name'
						label='Name'
						value={formData.name}
						onChange={handleFormChange}
						variant='outlined'
						size='small'
						autoFocus
					/>
					<TextField
						select
						name='type'
						label='Type'
						size='small'
						value={formData.type}
						onChange={handleFormChange}
					>
						<MenuItem value='ingredient'>
							Ingredient
						</MenuItem>
						<MenuItem value='package'>Package</MenuItem>
					</TextField>
					<TextField
						name='unit'
						label='Unit'
						variant='outlined'
						size='small'
						value={formData.unit}
						onChange={handleFormChange}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								handleSubmit();
							}
						}}
					/>
				</Box>
				<Button
					variant='contained'
					size='small'
					onClick={handleSubmit}
				>
					Add
				</Button>
			</Stack>
		</>
	);
};

export default MaterialCreate;
