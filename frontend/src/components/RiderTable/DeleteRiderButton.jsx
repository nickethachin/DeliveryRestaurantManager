import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteRider } from '../../features/riders/riderSlice';

// Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

const DeleteRiderButton = ({
	riders,
	selectTab,
	setSelectTab,
	setTabValue,
}) => {
	const dispatch = useDispatch();

	const [isConfirming, setIsConfirming] = useState(false);

	function getRiderName(id = selectTab) {
		if (id != null)
			return riders.find((rider) => rider._id === id).name;
	}
	function confirmOpen() {
		setIsConfirming(true);
	}

	function confirmClose() {
		setIsConfirming(false);
	}

	function handleConfirmed() {
		setIsConfirming(false);
		dispatch(deleteRider(selectTab));
		setSelectTab(null);
		setTabValue(0);
	}

	return (
		<>
			<Dialog open={isConfirming} onClose={confirmClose}>
				<DialogTitle>{`Are you sure?`}</DialogTitle>
				<DialogContent>
					<DialogContentText>{`If you click confirm, rider '${getRiderName()}' will be deleted forever.`}</DialogContentText>
					<DialogActions>
						<Button
							variant='contained'
							onClick={confirmClose}
						>
							Cancel
						</Button>
						<Button
							onClick={handleConfirmed}
							variant='contained'
							color='error'
							autoFocus
						>
							Confirm
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
			<IconButton color='error' onClick={confirmOpen}>
				<DeleteForeverIcon />
			</IconButton>
		</>
	);
};

export default DeleteRiderButton;
