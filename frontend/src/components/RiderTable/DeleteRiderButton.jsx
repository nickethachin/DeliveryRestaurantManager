import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteRider } from '../../features/riders/riderSlice';

// Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteRiderButton = ({ selectTab }) => {
	const dispatch = useDispatch();
	return (
		<IconButton
			color='warning'
			// onClick={() => dispatch(deleteRider(selectTab))}
			onClick={() => console.log(`Delete ${selectTab}`)}
		>
			<DeleteForeverIcon />
		</IconButton>
	);
};

export default DeleteRiderButton;
