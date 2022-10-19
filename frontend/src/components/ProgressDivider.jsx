import { Divider, LinearProgress } from '@mui/material';
const ProgressDivider = ({ isLoading }) => {
	return (
		<>
			{isLoading ? (
				<LinearProgress sx={{ my: 2 }} />
			) : (
				<Divider sx={{ my: 2 }} />
			)}
		</>
	);
};

export default ProgressDivider;
