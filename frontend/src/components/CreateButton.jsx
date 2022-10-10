import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

const CreateButton = ({ action }) => {
	return (
		<Button
			variant='contained'
			endIcon={<AddIcon />}
			onClick={action}
		>
			Create
		</Button>
	);
};

export default CreateButton;
