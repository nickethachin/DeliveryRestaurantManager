import { IconButton, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getItemsets,
	reset as itemsetReset,
} from '../features/itemsets/itemsetSlice';
import {
	createRider,
	getRiders,
	reset as riderReset,
} from '../features/riders/riderSlice';

// Components
import CreateForm from '../components/RiderTable/CreateForm';
import DeleteRiderButton from '../components/RiderTable/DeleteRiderButton';
import PriceTable from '../components/RiderTable/PriceTable';
import RiderTabs from '../components/RiderTabs';
import Spinner from '../components/Spinner';

// Icons
import CreateIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

const RiderManager = () => {
	// TODO: Finish create rider
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get user state
	const { user } = useSelector((state) => state.auth);
	// Check if logged in
	useEffect(
		(navigate) => {
			if (!user) navigate('/login');
		},
		[user]
	);

	// State for force rerender when save price
	const [editReload, setEditReload] = useState();

	// State for create new rider
	const [isCreating, setIsCreating] = useState(false);
	function toggleCreating() {
		setIsCreating(!isCreating);
	}

	// Tabs state
	const [tabValue, setTabValue] = useState(0);
	const [selectTab, setSelectTab] = useState();

	// Form data state
	const [formData, setFormData] = useState({
		name: '',
		fees: '',
		tax: '',
		gas: '',
	});

	// Get riders
	const {
		riders,
		isLoading: isRiderLoading,
		isError: isRiderError,
		message: riderMessage,
	} = useSelector((state) => state.riders);
	useEffect(() => {
		if (isRiderError) console.log(riderMessage);
		dispatch(getRiders());
		return () => dispatch(riderReset());
	}, [
		editReload,
		navigate,
		isRiderError,
		riderMessage,
		dispatch,
	]);

	// Get itemsets
	const {
		itemsets,
		isLoading: isItemsetLoading,
		isError: isItemsetError,
		message: itemsetMessage,
	} = useSelector((state) => state.itemsets);
	useEffect(() => {
		if (isItemsetError) console.log(itemsetMessage);
		dispatch(getItemsets());
		return () => dispatch(itemsetReset());
	}, [navigate, isItemsetError, itemsetMessage, dispatch]);

	function handleSaveClick(event) {
		event.preventDefault();
		dispatch(createRider(formData));
		setFormData({
			name: '',
			fees: '',
			tax: '',
			gas: '',
		});
		setIsCreating(false);
	}

	// Show spinner if any state is loading
	if (isItemsetLoading || isRiderLoading)
		return <Spinner />;

	return (
		<Box component={Paper}>
			<Stack
				direction='row'
				spacing={3}
				justifyContent='space-between'
			>
				{isCreating ? (
					<IconButton onClick={toggleCreating}>
						<CancelIcon />
					</IconButton>
				) : (
					<IconButton onClick={toggleCreating}>
						<CreateIcon />
					</IconButton>
				)}
				<RiderTabs
					tabValue={tabValue}
					riders={riders}
					setTabValue={setTabValue}
					setSelectTab={setSelectTab}
				/>
				{isCreating ? (
					<IconButton onClick={handleSaveClick}>
						<SaveIcon />
					</IconButton>
				) : (
					<DeleteRiderButton
						riders={riders}
						selectTab={selectTab}
						setSelectTab={setSelectTab}
						setTabValue={setTabValue}
					/>
				)}
			</Stack>
			<Stack direction='row' sx={{ margin: 2 }}>
				{isCreating ? (
					<CreateForm
						formData={formData}
						setFormData={setFormData}
					/>
				) : null}
			</Stack>
			<PriceTable
				user={user}
				value={tabValue}
				riders={riders}
				itemsets={itemsets}
			/>
		</Box>
	);
};

export default RiderManager;