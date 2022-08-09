import { Box, Tab, Tabs } from '@mui/material';
import Spinner from './Spinner';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const RiderTabs = ({
	tabValue,
	riders,
	setTabValue,
	setSelectTab,
}) => {
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};
	return (
		<Box
			sx={{
				borderBottom: 1,
				borderColor: 'divider',
			}}
		>
			<Tabs
				// disable the tab indicator because it doesn't work well with wrapped container
				TabIndicatorProps={{ sx: { display: 'none' } }}
				sx={{
					'& .MuiTabs-flexContainer': {
						flexWrap: 'wrap',
					},
				}}
				value={tabValue}
				onChange={handleTabChange}
			>
				{riders ? (
					riders.map((rider, index) => (
						<Tab
							label={rider.name}
							key={rider._id}
							onClick={() => setSelectTab(rider._id)}
							{...a11yProps(index)}
						/>
					))
				) : (
					<Spinner />
				)}
			</Tabs>
		</Box>
	);
};

export default RiderTabs;
