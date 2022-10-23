import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';

const columns = [
	{
		field: 'name',
		headerName: 'Menu',
		valueGetter: (params) => {
			return params.row.itemset.name;
		},
		flex: 1,
	},
	{
		field: 'amount',
		headerName: 'Price',
		type: 'number',
		editable: true,
	},
];
const PriceTable = ({ selectRider, savePrice }) => {
	const { itemsets } = useSelector(
		(state) => state.itemsets
	);
	const rows = itemsets.map((itemset) => {
		let amount = 0;
		const price = selectRider.price.find((p) => {
			if (!p.itemset) return false;
			return p.itemset._id === itemset._id;
		});
		if (price) amount = price.amount;
		return {
			itemset: {
				_id: itemset._id,
				name: itemset.name,
			},
			amount,
		};
	});
	if (!selectRider) return <Spinner />;
	return (
		<Box
			sx={{
				height: 600,
				width: { md: '100%', lg: '65%' },
			}}
		>
			<DataGrid
				columns={columns}
				rows={rows}
				getRowId={(row) => row.itemset._id}
				experimentalFeatures={{ newEditingApi: true }}
				processRowUpdate={savePrice}
				disableSelectionOnClick
			/>
		</Box>
	);
};

export default PriceTable;
