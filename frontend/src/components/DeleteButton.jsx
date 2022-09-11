import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const DeleteButton = ({ action }) => {
	return (
		<IconButton color='error' onClick={action}>
			<DeleteIcon />
		</IconButton>
	);
};

export default DeleteButton;
