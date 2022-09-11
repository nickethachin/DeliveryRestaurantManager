import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

const EditButton = ({ action }) => {
	return (
		<IconButton color='success' onClick={action}>
			<EditIcon />
		</IconButton>
	);
};

export default EditButton;
