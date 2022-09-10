import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import MaterialItem from './MaterialRow';

const MaterialTable = () => {
	const { materials } = useSelector(
		(state) => state.materials
	);
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Unit</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{materials !== null
						? materials.map((material) => (
								<MaterialItem
									key={material._id}
									material={material}
								/>
						  ))
						: null}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MaterialTable;
