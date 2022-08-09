import { Input, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

const EditableRow = ({
	itemset,
	rider,
	findPrice,
	save,
	cancel,
}) => {
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
					autoFocus
					type='number'
					name='amount'
					required={true}
					defaultValue={findPrice(rider, itemset._id)}
					onFocus={handleInput}
					onChange={handleInput}
					onBlur={(e) => save(e, rider, itemset, editData)}
					onKeyDown={(e) =>
						e.key === 'Enter'
							? save(e, rider, itemset, editData)
							: null
					}
				></Input>
			</TableCell>
		</TableRow>
	);
};

export default EditableRow;
