import { TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
	deleteMaterial,
	openEditor,
} from '../../features/materials/materialSlice';

import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

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
					<EditButton
						action={() => handleUpdate(material)}
					/>
					<DeleteButton action={() => handleDelete(_id)} />
				</TableCell>
			</TableRow>
		</>
	);
};

export default MaterialItem;
