import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
} from '@mui/material';

const CreateForm = () => {
	return (
		<>
			<FormControl>
				<InputLabel htmlFor='name'>Name</InputLabel>
				<Input id='name' aria-describedby='name-helper' />
				<FormHelperText id='name-helper'>
					Rider's name
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='fees'>Fees</InputLabel>
				<Input id='fees' aria-describedby='fees-helper' />
				<FormHelperText id='fees-helper'>
					Fees in percentage
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='tax'>Tax</InputLabel>
				<Input id='tax' aria-describedby='tax-helper' />
				<FormHelperText id='tax-helper'>
					Tax in percentage
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='gas'>Gas Cost</InputLabel>
				<Input id='gas' aria-describedby='gas-helper' />
				<FormHelperText id='gas-helper'>
					(optional) Seperate gas cost from itemset
				</FormHelperText>
			</FormControl>
		</>
	);
};

export default CreateForm;
