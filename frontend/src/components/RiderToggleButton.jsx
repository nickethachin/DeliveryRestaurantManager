import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Spinner from './Spinner';

const RiderToggleButton = ({selectRider, riders, handle}) => {

	return (
		<ToggleButtonGroup value={selectRider} exclusive onChange={handle}>
			{riders ? (
				riders.map((rider) => (
					<ToggleButton key={rider._id} value={rider._id}>
						{rider.name}
					</ToggleButton>
				))
			) : (
				<Spinner />
			)}
		</ToggleButtonGroup>
	);
};

export default RiderToggleButton;
