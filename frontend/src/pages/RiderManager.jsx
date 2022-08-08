import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getRiders,
	reset as riderReset,
} from '../features/riders/riderSlice';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import EditableRow from '../components/PriceTable/EditableRow';
import ReadOnlyRow from '../components/PriceTable/ReadOnlyRow';
import Spinner from '../components/Spinner';
import {
	getItemsets,
	reset as itemsetReset,
} from '../features/itemsets/itemsetSlice';
import riderService from '../features/riders/riderService';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>{children}</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const RiderManager = () => {
	// TODO: move things to components to keep thing clean
	// TODO: Create, remove rider
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	// Check if logged in
	useEffect(() => {
		if (!user) navigate('/login');
	}, [user]);

	// State for force rerender when save price
	const [editReload, setEditReload] = useState();

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

	// Tab state
	const [value, setValue] = useState(0);
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

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

	// State and function for edit rider's price
	const [editRiderId, setEditRiderId] = useState(null);
	function handleEditClick(event, itemset) {
		event.preventDefault();
		setEditRiderId(itemset);
	}
	function handleSaveClick(event, rider, itemset, amount) {
		event.preventDefault();
		console.log(`save ${itemset.name} as ${amount}฿`);
		riderService.updatePrice(
			{
				rider: rider,
				itemset: itemset._id,
				amount: amount,
			},
			user.token
		);
		setEditRiderId(null);
		setEditReload(!editReload);
	}
	function handleCancelClick(event) {
		event.preventDefault();
		setEditRiderId(null);
	}

	function findPrice(rider, itemset) {
		let amount = 0;
		try {
			amount = rider.price.find(
				(price) => price.itemset === itemset
			).amount;
		} catch (e) {}
		return amount;
	}

	if (isItemsetLoading || isRiderLoading)
		return <Spinner />;

	return (
		<Box sx={{ width: '100%' }}>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
				}}
			>
				<Tabs
					value={value}
					onChange={handleTabChange}
					aria-label='basic tabs example'
					variant='scrollable'
				>
					{riders ? (
						riders.map((rider, index) => (
							<Tab
								label={rider.name}
								key={rider._id}
								{...a11yProps(index)}
							/>
						))
					) : (
						<Spinner />
					)}
				</Tabs>
			</Box>
			{riders ? (
				riders.map((rider, index) => (
					<TabPanel
						value={value}
						index={index}
						key={rider._id}
					>
						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell>Item name</TableCell>
									<TableCell align='center'>
										Price
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{itemsets ? (
									itemsets.map((itemset) => (
										<>
											{editRiderId === itemset._id ? (
												<EditableRow
													itemset={itemset}
													rider={rider}
													findPrice={findPrice}
													save={handleSaveClick}
													cancel={handleCancelClick}
												/>
											) : (
												<ReadOnlyRow
													itemset={itemset}
													rider={rider}
													findPrice={findPrice}
													edit={handleEditClick}
												/>
											)}
										</>
									))
								) : (
									<Spinner />
								)}
							</TableBody>
						</Table>
					</TabPanel>
				))
			) : (
				<Spinner />
			)}
		</Box>
	);
};

export default RiderManager;
