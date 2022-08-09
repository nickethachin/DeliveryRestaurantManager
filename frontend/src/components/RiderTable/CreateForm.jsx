import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
} from '@mui/material';

const CreateForm = ({ formData, setFormData }) => {
	function handleFormChange(event) {
		event.preventDefault();
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...formData };
		newFormData[fieldName] = fieldValue;
		setFormData(newFormData);
	}

	return (
		<>
			<FormControl>
				<InputLabel htmlFor='name'>Name</InputLabel>
				<Input
					id='name'
					name='name'
					aria-describedby='name-helper'
					onChange={handleFormChange}
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
					aria-describedby='fees-helper'
					onChange={handleFormChange}
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
					aria-describedby='tax-helper'
					onChange={handleFormChange}
				/>
				<FormHelperText id='tax-helper'>
					Tax in percentage
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='gas'>Gas Cost</InputLabel>
				<Input
					id='gas'
					name='gas'
					aria-describedby='gas-helper'
					onChange={handleFormChange}
				/>
				<FormHelperText id='gas-helper'>
					(optional) Seperate gas cost from itemset
				</FormHelperText>
			</FormControl>
		</>
	);
};

export default CreateForm;
