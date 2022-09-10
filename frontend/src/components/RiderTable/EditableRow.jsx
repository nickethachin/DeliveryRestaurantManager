import { Input, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

const EditableRow = ({ itemset, rider, findPrice }) => {
	const [editData, setEditData] = useState(null);
	function handleInput(event) {
		event.preventDefault();
		setEditData(event.target.value);
		if (event.type === 'focus') event.target.select();
	}

	return (
		<TableRow>
			<TableCell>{itemset.name}</TableCell>
			<TableCell align='center'>
				<Input
					sx={{ width: 50 }}
					type='number'
					name='amount'
					required={true}
					defaultValue={findPrice(rider, itemset._id)}
					onFocus={handleInput}
					onChange={handleInput}
				></Input>
			</TableCell>
		</TableRow>
	);
};

export default EditableRow;
