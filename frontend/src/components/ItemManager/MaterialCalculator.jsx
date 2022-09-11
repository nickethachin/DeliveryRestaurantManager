import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
const MaterialCalculator = ({ setAmount, close, unit }) => {
	const [input, setInput] = useState(0);
	const [output, setOutput] = useState(0);

	const handleApply = () => {
		setAmount(input / output);
		setInput(0);
		setOutput(0);
		close();
	};
	return (
		<Stack
			direction='row'
			spacing={1}
			sx={{ margin: 1 }}
			alignItems='center'
		>
			<Typography variant='body1'>ใช้</Typography>
			<TextField
				type='number'
				size='small'
				sx={{ width: 100 }}
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<Typography variant='body1'>{unit} จะได้</Typography>
			<TextField
				type='number'
				size='small'
				sx={{ width: 100 }}
				value={output}
				onChange={(e) => setOutput(e.target.value)}
			/>
			<Typography variant='body1'>ชุด</Typography>
			<IconButton onClick={handleApply} color='success'>
				<CheckCircleIcon size='small' />
			</IconButton>
		</Stack>
	);
};

export default MaterialCalculator;
