import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const options = [
	{ value: 1, label: 'Option 1' },
	{ value: 2, label: 'Option 2' },
];

const Playground = () => {
	const [value, setValue] = useState(
		options.find((option) => option.value === 2)
	);
	const [inputValue, setInputValue] = useState('');

	return (
		<div>
			<div>{`value: ${
				value !== null ? `'${value.label}'` : 'null'
			}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br />
			<Autocomplete
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id='controllable-states-demo'
				options={options}
				sx={{ width: 300 }}
				isOptionEqualToValue={(option, value) =>
					option.value === value.value
				}
				renderInput={(params) => (
					<TextField {...params} label='Controllable' />
				)}
			/>
		</div>
	);
};

export default Playground;
