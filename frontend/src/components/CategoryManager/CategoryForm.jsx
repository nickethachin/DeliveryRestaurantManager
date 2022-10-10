import SaveIcon from '@mui/icons-material/Save';
import {
	Autocomplete,
	Grid,
	IconButton,
	TextField,
} from '@mui/material';
import { useState } from 'react';
const CategoryForm = ({
	action,
	name,
	setName,
	parent,
	setParent,
	parents,
	isEdit,
}) => {
	const [parentInput, setParentInput] = useState('');

	return (
		<Grid
			container
			sx={{ mb: 2 }}
			alignItems='center'
			justifyContent='space-around'
		>
			<Grid item xs={5}>
				<TextField
					fullWidth
					value={name}
					onChange={(e) => setName(e.target.value)}
					label='Name'
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={5}>
				<Autocomplete
					disabled={isEdit}
					fullWidth
					options={parents}
					renderInput={(params) => (
						<TextField {...params} label='Parent' />
					)}
					value={parent}
					onChange={(event, newValue) => {
						setParent(newValue);
					}}
					inputValue={parentInput}
					onInputChange={(event, newInputValue) => {
						setParentInput(newInputValue);
					}}
					isOptionEqualToValue={(option, value) =>
						option.id === value.id
					}
					getOptionDisabled={(option) =>
						option.label === 'Ingredient' ||
						option.label === 'Material' ||
						option.label === 'Packaging'
					}
				/>
			</Grid>
			<Grid item>
				<IconButton
					color='success'
					onClick={() => {
						action(name, parent.id);
						setName('');
						setParent(parents[0]);
					}}
				>
					<SaveIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default CategoryForm;
