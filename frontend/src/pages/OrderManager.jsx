import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper
} from '@mui/material';
import {
	getItemsets,
	reset as itemsetReset,
} from '../features/itemsets/itemsetSlice';
import Spinner from '../components/Spinner';
import RiderToggleButton from '../components/RiderToggleButton';

const OrderManager = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	// Prepare Itemsets state
	const {
		itemsets,
		isLoading: isItemsetLoading,
		isError: isItemsetError,
		message: itemsetMessage,
	} = useSelector((state) => state.itemsets);

	// Check if logged in
	useEffect(() => {
		if (!user) navigate('/login');
	}, [user]);

	// Get itemsets
	useEffect(() => {
		if (isItemsetError) console.log(itemsetMessage);
		dispatch(getItemsets());
		return () => dispatch(itemsetReset());
	}, [navigate, isItemsetError, itemsetMessage, dispatch]);

	// Play spinner if loading
	if (isItemsetLoading) return <Spinner />;


    // TODO: Continue working on each rider's price
	function addItem(itemset){
		console.log(itemset)
	}
	return (
		<>
			<RiderToggleButton/>
			<TableContainer component={Paper}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{itemsets ? (
							itemsets.map((itemset) => (
								<TableRow key={itemset._id} onClick={() => addItem(itemset)}>
									<TableCell>{itemset.name}</TableCell>
									<TableCell>??</TableCell>
								</TableRow>
							))
						) : (
							<Spinner />
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default OrderManager