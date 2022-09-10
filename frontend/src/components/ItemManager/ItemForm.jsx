import {
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	addMaterial,
	editName,
	getItems,
	removeMaterial,
	updateItem,
} from '../../features/items/itemSlice';
import Spinner from '../Spinner';
import MaterialItem from './MaterialItem';

import CancelIcon from '@mui/icons-material/Cancel';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveIcon from '@mui/icons-material/Save';
import GoBackButton from '../GoBackButton';

const ItemForm = ({ id }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const items = useSelector((state) => state.items);

	// Get materials from store to use as dropdown option
	const { materials } = useSelector(
		(state) => state.materials
	);
	const options = materials.map((material) => {
		return { value: material._id, label: material.name };
	});

	const { name, materials: materialsList } = useSelector(
		(state) =>
			state.items.items.find(
				(material) => material._id == id
			)
	);

	const handleNameInput = (event) => {
		dispatch(
			editName({
				_id: id,
				name: event.target.value,
			})
		);
	};

	const handleAddMaterial = () => {
		dispatch(addMaterial({ _id: id }));
	};

	const handleRemoveMaterial = (index) => {
		dispatch(removeMaterial({ _id: id, index }));
	};

	const handleSaveItem = () => {
		dispatch(
			updateItem({
				_id: id,
				name,
				materials: materialsList,
			})
		);
		navigate('/item-manager');
	};

	const handleResetItem = () => {
		dispatch(getItems());
	};

	return (
		<>
			<Stack
				direction='row'
				justifyContent='space-between'
				sx={{ mb: 2 }}
			>
				<Typography variant='h6'>Editing - {id}</Typography>
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

export default ItemForm;
