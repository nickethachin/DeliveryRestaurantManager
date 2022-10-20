import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Stack,
} from '@mui/material';

const CreateForm = ({ formData, setFormData }) => {
	const handleFormChange = ({ target }) => {
		const fieldName = target.getAttribute('name');
		const fieldValue = target.value;
		const newFormData = { ...formData };
		newFormData[fieldName] = fieldValue;
		setFormData(newFormData);
	};

	return (
		<Stack direction='row' sx={{ mt: 3 }}>
			<FormControl>
				<InputLabel htmlFor='name'>Name</InputLabel>
				<Input
					id='name'
					name='name'
					aria-describedby='name-helper'
					onChange={handleFormChange}
					value={formData.name}
				/>
				<FormHelperText id='name-helper'>
					Rider's name
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='fees'>Fees</InputLabel>
				<Input
					id='fees'
					name='fees'
					type='number'
					aria-describedby='fees-helper'
					onChange={handleFormChange}
					value={formData.fees}
				/>
				<FormHelperText id='fees-helper'>
					Fees in percentage
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='tax'>Tax</InputLabel>
				<Input
					id='tax'
					name='tax'
					type='number'
					aria-describedby='tax-helper'
					onChange={handleFormChange}
					value={formData.tax}
				/>
				<FormHelperText id='tax-helper'>
					Tax in percentage
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='gas'>Gas Cost</InputLabel>
				<Input
					id='gasCost'
					name='gasCost'
					type='number'
					aria-describedby='gas-helper'
					onChange={handleFormChange}
					value={formData.gasCost}
				/>
				<FormHelperText id='gas-helper'>
					(optional) Seperate gas cost from itemset
				</FormHelperText>
			</FormControl>
		</Stack>
	);
};

export default CreateForm;
