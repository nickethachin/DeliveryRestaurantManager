import {
	Button,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemsetRow from './ItemsetRow';

import AddIcon from '@mui/icons-material/Add';
import { addBlank } from '../../features/itemsets/itemsetSlice';

const ItemsetTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { itemsets } = useSelector(
		(state) => state.itemsets
	);
	const handleCreateClick = () => {
		dispatch(addBlank());
		navigate('/itemset-manager/create');
	};

	return (
		<>
			<Stack direction='row' justifyContent='space-between'>
				<Typography variant='h6'>Itemset table</Typography>
				<Button
					variant='contained'
					endIcon={<AddIcon />}
					onClick={handleCreateClick}
				>
					Create
				</Button>
			</Stack>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: 'bold' }}>
								Name
							</TableCell>
							<TableCell
								style={{ width: 100, fontWeight: 'bold' }}
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{itemsets.length > 0 ? (
							itemsets.map((itemset, index) => (
								<ItemsetRow
									key={itemset._id}
									index={index}
									itemset={itemset}
								/>
							))
						) : (
							<TableRow>
								<TableCell colSpan={2}>
									Empty table
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ItemsetTable;
