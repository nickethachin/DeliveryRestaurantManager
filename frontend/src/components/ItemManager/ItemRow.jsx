import { Stack, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteItem } from '../../features/items/itemSlice';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const ItemRow = ({ index, item }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleEditClick = () => {
		navigate(`/item-manager/edit/${item._id}`);
	};
	const handleDeleteClick = () => {
		dispatch(deleteItem(item._id));
	};
	return (
		<>
			<TableRow>
				<TableCell>{item.name}</TableCell>
				<TableCell>
					<Stack direction='row'>
						<EditButton action={handleEditClick} />
						<DeleteButton action={handleDeleteClick} />
					</Stack>
				</TableCell>
			</TableRow>
		</>
	);
};

export default ItemRow;
