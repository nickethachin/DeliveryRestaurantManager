import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import riderService from '../../features/riders/riderService';
import Spinner from '../Spinner';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabPanel-${index}`}
			aria-labelledby={`tab-${index}`}
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

const PriceTable = ({
	user,
	value,
	riders,
	itemsets,
	editReload,
	setEditReload,
}) => {
	// State and function for edit rider's price
	const [editRiderId, setEditRiderId] = useState(null);
	function handleEditClick(event, itemset) {
		event.preventDefault();
		setEditRiderId(itemset);
	}
	function handleSaveClick(
		event,
		selectedRider,
		itemset,
		amount
	) {
		event.preventDefault();
		// console.log(`save ${itemset.name} as ${amount}฿`);
		riderService.updatePrice(
			{
				rider: selectedRider,
				itemset: itemset._id,
				amount: amount,
			},
			user.token
		);
		setEditRiderId(null);
		const price = selectedRider.price.find(
			(price) => price.itemset === itemset._id
		);
		price.amount = amount;
		// setEditReload(!editReload);
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
	// FIXME: Each child in a list should have a unique "key" prop.
	// TODO: Add partial rerender
	return (
		<>
			{riders ? (
				riders.map((rider, index) => (
					<TabPanel value={value} index={index} key={index}>
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
		</>
	);
};

export default PriceTable;
