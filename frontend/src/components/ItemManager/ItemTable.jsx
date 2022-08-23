import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ItemRow from './ItemRow';

const ItemTable = () => {
	const { items } = useSelector((state) => state.items);
	return (
		<>
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
