import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DatePickerNow = ({ value, setValue }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DateTimePicker
				ampm={false}
				renderInput={(props) => (
					<TextField
						{...props}
						required={false}
						helperText='Leave empty to set to current time'
					/>
				)}
				label='Date&Time'
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
			/>
		</LocalizationProvider>
	);
};

export default DatePickerNow;
