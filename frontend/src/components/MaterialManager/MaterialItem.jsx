import { Button, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
	deleteMaterial,
	openEditor,
	updateMaterial,
} from '../../features/materials/materialSlice';

const MaterialItem = ({ material }) => {
	const dispatch = useDispatch();

	const { _id, name, type, unit } = material;

	const handleUpdate = (material) => {
		dispatch(openEditor(material));
	};

	const handleDelete = (id) => {
		dispatch(deleteMaterial(id));
	};

	return (
		<>
			<TableRow>
				<TableCell>{name}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell>{unit}</TableCell>
				<TableCell sx={{ maxWidth: 10 }}>
					<Button
						variant='outlined'
						size='small'
						onClick={() => handleUpdate(material)}
					>
						Edit
					</Button>
					<Button
						variant='outlined'
						size='small'
						color='warning'
						onClick={() => handleDelete(_id)}
					>
						Delete
					</Button>
				</TableCell>
			</TableRow>
		</>
	);
};

export default MaterialItem;
