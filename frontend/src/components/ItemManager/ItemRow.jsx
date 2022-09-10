import {
	IconButton,
	Stack,
	TableCell,
	TableRow,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
	deleteItem,
	openEditor,
} from '../../features/items/itemSlice';

// Import icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const ItemRow = ({ index, item }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleEditClick = () => {
		navigate(`/item-manager/edit/${item._id}`);
	};
	return (
		<>
			<TableRow>
				<TableCell>{item.name}</TableCell>
				<TableCell>
					<Stack direction='row'>
						<IconButton
							color='success'
							onClick={handleEditClick}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							color='error'
							onClick={() => dispatch(deleteItem(item._id))}
						>
							<DeleteIcon />
						</IconButton>
					</Stack>
				</TableCell>
			</TableRow>
		</>
	);
};

export default ItemRow;
