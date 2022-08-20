import {
	Box,
	Button,
	MenuItem,
	Modal,
	Stack,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	closeEditor,
	updateMaterial,
} from '../../features/materials/materialSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	'& .MuiTextField-root': { m: 1, width: '10em' },
};

const MaterialEditModal = ({ isOpen }) => {
	const dispatch = useDispatch();

	const { editingData } = useSelector(
		(state) => state.materials
	);

	const [formData, setFormData] = useState({
		_id: '',
		name: '',
		type: '',
		unit: '',
	});

	useEffect(() => {
		setFormData({
			...formData,
			...editingData,
		});

		return () => {
			setFormData({
				_id: '',
				name: '',
				type: '',
				unit: '',
			});
		};
	}, [editingData]);

	const handleFormChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSave = (event) => {
		dispatch(updateMaterial(formData));
		dispatch(closeEditor());
	};

	const handleClose = () => {
		dispatch(closeEditor());
	};

	return (
		<>
			<Modal
				open={isOpen}
				onClose={() => dispatch(closeEditor())}
			>
				<Box sx={style}>
					<TextField
						name='name'
						label='Name'
						value={formData.name}
						onChange={handleFormChange}
						variant='outlined'
						size='small'
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
						<MenuItem value='package'>Packaging</MenuItem>
					</TextField>
					<TextField
						name='unit'
						label='Unit'
						variant='outlined'
						size='small'
						value={formData.unit}
						onChange={handleFormChange}
					/>
					<Stack
						direction='row'
						spacing={1}
						justifyContent='right'
					>
						<Button
							variant='outlined'
							color='success'
							onClick={handleSave}
						>
							Save
						</Button>
						<Button
							variant='outlined'
							color='warning'
							onClick={handleClose}
						>
							Close
						</Button>
					</Stack>
				</Box>
			</Modal>
		</>
	);
};

export default MaterialEditModal;
