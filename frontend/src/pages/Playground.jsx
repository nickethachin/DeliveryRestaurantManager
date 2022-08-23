import { useState } from 'react';
import Select from 'react-select';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const Playground = () => {
	const [selectedOption, setSelectedOption] =
		useState('vanilla');
	const selectVal = options.find(
		(opt) => opt.value === selectedOption
	);
	return (
		<Select
			defaultValue={selectVal}
			onChange={setSelectedOption}
			options={options}
		/>
	);
};

export default Playground;
