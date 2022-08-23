import {
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import {
	addData,
	reset,
} from '../../features/formdatas/formDataSlice';
import { updateItem } from '../../features/items/itemSlice';
import Spinner from '../Spinner';

const ItemEdit = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	// Get materials from store to use as dropdown option
	const { materials } = useSelector(
		(state) => state.materials
	);

	const options = materials.map((material) => {
		return { value: material._id, label: material.name };
	});

	const { items } = useSelector((state) => state.items);
	const currentItem = items.find((item) => item._id === id);
	useEffect(() => {
		if (currentItem !== undefined) {
			dispatch(
				addData({
					name: currentItem.name,
					materials: currentItem.materials,
				})
			);
		}
	}, [currentItem]);
	const { name, materials: materialsList } = useSelector(
		(state) => state.formData.data
	);

	const handleNameInput = (event) => {
		dispatch(
			addData({
				name: event.target.value,
				materials: materialsList,
			})
		);
	};

	const handleMaterialChange = (event, index) => {
		const unit = materials.find(
			(material) => material._id === event.value
		).unit;
		const select = options.find(
			(opt) => opt.value === event.value
		);
		const newList = materialsList.map((mat, matIndex) => {
			if (matIndex === index) {
				return {
					...mat,
					matId: event.value,
					unit,
					select,
				};
			}
			return mat;
		});
		dispatch(addData({ name, materials: newList }));
	};

	const handleMaterialInput = (event, index) => {
		const newList = materialsList.map((mat, matIndex) => {
			if (matIndex === index) {
				return {
					...mat,
					[event.target.name]: event.target.value,
				};
			}
			return mat;
		});
		dispatch(addData({ name, materials: newList }));
	};

	const handleAddMaterial = () => {
		const newList = [...materialsList];
		newList.push({ usage: 0, output: 0 });
		dispatch(addData({ name, materials: newList }));
	};

	const handleRemoveMaterial = (index) => {
		const newList = [...materialsList];
		newList.splice(index, 1);
		dispatch(addData({ name, materials: newList }));
	};

	const clearForm = () => {
		dispatch(reset());
		dispatch(
			addData({
				name: currentItem.name,
				materials: currentItem.materials,
			})
		);
	};

	const handleUpdateItem = () => {
		const item = {
			name: name,
			materials: materialsList.map((mat) => {
				return {
					matId: mat.matId,
					amount: mat.amount,
				};
			}),
		};
		dispatch(updateItem(item));
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
				onChange={handleNameInput}
			/>
			{materialsList !== undefined ? (
				materialsList.map((material, index) => (
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
				))
			) : (
				<Spinner />
			)}
			<Stack direction='row' justifyContent='space-between'>
				<IconButton onClick={handleAddMaterial}>
					<LibraryAddIcon />
				</IconButton>
				<Stack direction='row' spacing={1}>
					<IconButton
						color='success'
						onClick={handleUpdateItem}
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

export default ItemEdit;
