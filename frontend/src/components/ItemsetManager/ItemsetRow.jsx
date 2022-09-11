import { Stack, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteItemset } from '../../features/itemsets/itemsetSlice';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const ItemsetRow = ({ index, itemset }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleEditClick = () => {
		navigate(`/itemset-manager/edit/${itemset._id}`);
	};
	const handleDeleteClick = () => {
		dispatch(deleteItemset(itemset._id));
	};
	return (
		<>
			<TableRow>
				<TableCell>{itemset.name}</TableCell>
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

export default ItemsetRow;
