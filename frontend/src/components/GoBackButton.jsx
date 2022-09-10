import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ location, action }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<Button
			variant='contained'
			startIcon={<ArrowBackIcon />}
			onClick={() => {
				dispatch(action());
				navigate(`/${location}`);
			}}
		>
			Go back
		</Button>
	);
};

export default GoBackButton;
