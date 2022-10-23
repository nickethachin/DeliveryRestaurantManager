import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteMaterial,
	openEditor,
} from '../../features/materials/materialSlice';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const MaterialTable = () => {
	const { materials } = useSelector(
		(state) => state.materials
	);
	const dispatch = useDispatch();

	const handleUpdate = (material) => {
		dispatch(openEditor(material));
	};

	const handleDelete = (id) => {
		dispatch(deleteMaterial(id));
	};

	const actionButtons = ({ row }) => {
		return (
			<>
				<EditButton action={() => handleUpdate(row)} />
				<DeleteButton
					action={() => handleDelete(row._id)}
				/>
			</>
		);
	};
	const columns = [
		{ headerName: 'Name', field: 'name', flex: 1 },
		{ headerName: 'Type', field: 'type' },
		{ headerName: 'Unit', field: 'unit' },
		{
			headerName: 'updatedAt',
			field: 'updatedAt',
			width: 150,
			type: 'dateTime',
			renderCell: (params) =>
				new Date(params.row.updatedAt).toLocaleString(
					'en-GB',
					{
						timeStyle: 'short',
						dateStyle: 'short',
					}
				),
		},
		{
			headerName: 'Action',
			field: 'action',
			renderCell: actionButtons,
		},
	];
	return (
		<DataGrid
			columns={columns}
			rows={materials === [] ? [] : materials}
			autoHeight
			disableSelectionOnClick={true}
			getRowId={(row) => row._id}
			initialState={{
				sorting: {
					sortModel: [{ field: 'updatedAt', sort: 'desc' }],
				},
			}}
		/>
	);
};

export default MaterialTable;
