import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveIcon from '@mui/icons-material/Save';
import {
	Box,
	IconButton,
	Modal,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const ItemForm = ({ action, initialState }) => {
	const dispatch = useDispatch();
	const { materials } = useSelector(
		(state) => state.materials
	);
	const options = materials.map((material) => {
		return { value: material._id, label: material.name };
	});
	const [name, setName] = useState(initialState.name);
	const [materialsList, setMaterialsList] = useState(
		initialState.materials
	);
	// Calculate material's amout usage for 1 item
	useEffect(() => {
		let list = [...materialsList];
		list.forEach((material, index) => {
			const amount = material.usage / material.output;
			list[index]['amount'] = isFinite(amount) ? amount : 0;
		});
	}, [materialsList, setMaterialsList]);

	const handleMaterialChange = (event, index) => {
		// Create mutable list from materialsList
		const list = [...materialsList];

		// Find material's unit with material's id (event.value)
		const unit = materials.find(
			(material) => material._id === event.value
		).unit;

		// Assign matId and unit by Index
		list[index]['matId'] = event.value;
		list[index]['unit'] = unit;
		list[index]['select'] = options.find(
			(opt) => opt.value === materialsList[index].matId
		);

		setMaterialsList(list);
	};

	const handleMaterialInput = (event, index) => {
		const list = [...materialsList];
		list[index][event.target.name] = event.target.value;
		setMaterialsList(list);
	};

	const handleAddMaterial = () => {
		const list = [...materialsList];
		list.push({ usage: 0, output: 0 });
		setMaterialsList(list);
	};

	const handleRemoveMaterial = (index) => {
		const list = [...materialsList];
		list.splice(index, 1);
		setMaterialsList(list);
	};

	const clearForm = () => {
		setName('');
		setMaterialsList([{ usage: 0, output: 0 }]);
	};

	const handleSaveClick = () => {
		const item = {
			_id: initialState._id ? initialState._id : undefined,
			name: name,
			materials: materialsList.map((mat) => {
				return {
					matId: mat.matId,
					amount: mat.amount,
				};
			}),
		};
		dispatch(action(item));
		clearForm();
	};

	return (
		<Stack spacing={2}>
			<TextField
				name='name'
				label='Name'
				variant='outlined'
				size='small'
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			{materialsList.map((material, index) => (
				<Stack
					key={index}
					direction='row'
					spacing={1}
					alignItems='center'
					justifyContent='space-between'
				>
					<Typography variant='body1'>ใช้</Typography>
					<div style={{ width: 200 }}>
						<Select
							name='matId'
							options={options}
							value={material.select}
							isSearchable={true}
							onChange={(event) => {
								handleMaterialChange(event, index);
							}}
						/>
					</div>
					<Typography variant='body1'>จำนวน</Typography>
					<TextField
						name='usage'
						type='number'
						variant='outlined'
						size='small'
						value={material.usage}
						sx={{ maxWidth: 75 }}
						onChange={(event) =>
							handleMaterialInput(event, index)
						}
					/>
					<Typography variant='body1'>
						{materialsList[index]['unit']} เพื่อผลิต
					</Typography>
					<TextField
						name='output'
						type='number'
						variant='outlined'
						size='small'
						value={material.output}
						sx={{ maxWidth: 75 }}
						onChange={(event) =>
							handleMaterialInput(event, index)
						}
					/>
					<Typography variant='body1'>ชิ้น</Typography>
					<IconButton
						size='small'
						color='error'
						disabled={index > 0 ? false : true}
						onClick={() => handleRemoveMaterial(index)}
					>
						<DeleteIcon />
					</IconButton>
				</Stack>
			))}
			<Stack direction='row' justifyContent='space-between'>
				<IconButton onClick={handleAddMaterial}>
					<LibraryAddIcon />
				</IconButton>
				<Stack direction='row' spacing={1}>
					<IconButton
						color='success'
						onClick={handleSaveClick}
					>
						<SaveIcon />
					</IconButton>
					<IconButton color='error' onClick={clearForm}>
						<CancelIcon />
					</IconButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ItemForm;
