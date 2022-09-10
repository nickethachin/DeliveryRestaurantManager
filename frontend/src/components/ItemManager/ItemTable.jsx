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
import ItemRow from './ItemRow';

import AddIcon from '@mui/icons-material/Add';
import { addBlank } from '../../features/items/itemSlice';

const ItemTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { items } = useSelector((state) => state.items);
	const handleCreateClick = () => {
		dispatch(addBlank());
		navigate('/item-manager/create');
	};

	return (
		<>
			<Stack direction='row' justifyContent='space-between'>
				<Typography variant='h6'>Items table</Typography>
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
						{items.map((item, index) => (
							<ItemRow
								key={item._id}
								index={index}
								item={item}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ItemTable;
