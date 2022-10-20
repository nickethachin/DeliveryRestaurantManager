import {
	Button,
	Divider,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { useSelector } from 'react-redux';

const OrderQuickSelect = ({
	selectRider,
	riderData,
	orderAddItem,
	handleRiderChange,
}) => {
	const { itemsets } = useSelector(
		(state) => state.itemsets
	);
	const { riders } = useSelector((state) => state.riders);
	return (
		<>
			<ToggleButtonGroup
				value={selectRider}
				onChange={handleRiderChange}
				exclusive
			>
				{riders.map((rider) => (
					<ToggleButton value={rider._id} key={rider._id}>
						{rider.name}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
			<Divider sx={{ my: 2 }} />
			<Grid container spacing={2}>
				{itemsets &&
					itemsets.map((itemset, index) => (
						<Grid item key={index}>
							<Button
								key={itemset._id}
								variant='outlined'
								size='large'
								onClick={() => orderAddItem(itemset._id)}
								disabled={!selectRider ? true : false}
							>
								{itemset.name}
							</Button>
						</Grid>
					))}
			</Grid>
		</>
	);
};

export default OrderQuickSelect;
