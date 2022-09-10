import { Button, TableCell, TableRow } from '@mui/material';

const ReadOnlyRow = ({
	itemset,
	rider,
	edit,
	findPrice,
}) => {
	return (
		<TableRow>
			<TableCell>{itemset.name}</TableCell>
			<TableCell align='center'>
				<Button
					size='small'
					onClick={(e) => edit(e, itemset._id)}
					variant='outlined'
				>
					{findPrice(rider, itemset._id)}
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default ReadOnlyRow;
