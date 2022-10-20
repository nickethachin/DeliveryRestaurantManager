import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import {
	Button,
	ButtonGroup,
	Container,
	Divider,
	IconButton,
	LinearProgress,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CreateForm from '../components/RiderManager/CreateForm';
import PriceTable from '../components/RiderManager/PriceTable';
import Spinner from '../components/Spinner';
import { getItemsets } from '../features/itemsets/itemsetSlice';
import {
	createRider,
	deleteRider,
	getRiders,
	updateItemPrice,
} from '../features/riders/riderSlice';

const RiderManager = () => {
	const dispatch = useDispatch();
	const { riders, isLoading } = useSelector(
		(state) => state.riders
	);

	const [selectRider, setSelectRider] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	const formInitial = {
		name: '',
		fees: '',
		tax: '',
		gasCost: '',
	};
	const [formData, setFormData] = useState(formInitial);

	const handleClickRider = (id) => {
		const riderData = riders.find(
			(rider) => rider._id === id
		);
		setSelectRider({ ...riderData });
	};

	const formOpen = () => {
		setIsCreating(true);
	};

	const formClose = () => {
		formReset();
		setIsCreating(false);
	};

	const formReset = () => {
		setFormData(formInitial);
	};

	const formSave = () => {
		let message = 'Missing ';
		if (formData.name === '') message = `${message} Name`;
		if (formData.fees === '') message = `${message} Fees`;
		if (formData.tax === '') message = `${message} Tax`;
		message = `${message} field(s).`;

		if (message !== 'Missing  field(s).') {
			toast.error(message);
			return;
		}

		dispatch(createRider(formData));
		formClose();
	};

	const handleDeleteClick = () => {
		dispatch(deleteRider(selectRider._id));
	};

	const savePrice = (newRow) => {
		const data = {
			rider: selectRider._id,
			itemset: newRow.itemset._id,
			amount: newRow.amount,
		};
		dispatch(updateItemPrice(data));
		return newRow;
	};

	useEffect(() => {
		dispatch(getRiders('withprice'));
		dispatch(getItemsets());
	}, [dispatch]);

	if (isLoading) return <Spinner />;
	if (riders.length > 0 && selectRider === '')
		setSelectRider(riders[0]);
	return (
		<Container>
			<Typography variant='h5'>
				Rider&Pricing Manager
			</Typography>
			{isLoading ? (
				<LinearProgress sx={{ my: 2 }} />
			) : (
				<Divider sx={{ my: 2 }} />
			)}
			<Stack direction='column' alignItems='center'>
				<Stack
					direction='row'
					justifyContent='space-between'
					width='100%'
				>
					{isCreating ? (
						<IconButton onClick={formClose}>
							<RemoveIcon />
						</IconButton>
					) : (
						<IconButton onClick={formOpen}>
							<AddIcon />
						</IconButton>
					)}
					<ButtonGroup>
						{riders &&
							riders.map((rider) => (
								<Button
									key={rider._id}
									variant={
										selectRider._id === rider._id
											? 'contained'
											: 'outlined'
									}
									onClick={() =>
										handleClickRider(rider._id)
									}
								>
									{rider.name}
								</Button>
							))}
					</ButtonGroup>
					{isCreating ? (
						<IconButton onClick={formSave}>
							<SaveIcon color='success' />
						</IconButton>
					) : (
						<IconButton onClick={handleDeleteClick}>
							<DeleteIcon color='error' />
						</IconButton>
					)}
				</Stack>
				{isCreating ? (
					<CreateForm
						formData={formData}
						setFormData={setFormData}
					/>
				) : null}
				<Divider sx={{ my: 2 }} />
				<PriceTable
					selectRider={selectRider}
					savePrice={savePrice}
				/>
			</Stack>
		</Container>
	);
};

export default RiderManager;
