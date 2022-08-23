import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightIcon from '@mui/icons-material/Nightlight';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
	Box,
	Collapse,
	createTheme,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
} from '@mui/material';
import { useState } from 'react';

const SideItem = ({ name, path, icon, sx }) => {
	return (
		<ListItem disablePadding sx={sx}>
			<ListItemButton component='a' href={path}>
				{icon && <ListItemIcon>{icon}</ListItemIcon>}
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
};

const Sidebar = ({ setTheme }) => {
	const [openFoods, setOpenFoods] = useState(true);
	const handleClickFoods = () => {
		setOpenFoods(!openFoods);
	};

	const [isDarkMode, setIsDarkMode] = useState(true);
	const handleModeSwitch = (event) => {
		setIsDarkMode(event.target.checked);
		if (event.target.checked) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
			<List>
				<SideItem
					name='Dashboard'
					path='/'
					icon={<HomeIcon />}
				/>
				<SideItem
					name='Goals'
					path='/goals'
					icon={<FlagIcon />}
				/>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClickFoods}>
						<ListItemIcon>
							<RestaurantMenuIcon />
						</ListItemIcon>
						<ListItemText primary='Foods Editor' />
						{openFoods ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</ListItem>
				<Collapse
					in={openFoods}
					timeout='auto'
					unmountOnExit
				>
					<List component='div' disablePadding>
						<SideItem
							name='Materials'
							path='/material-manager'
							sx={{ pl: 4 }}
						/>
						<SideItem
							name='Item'
							path='/item-manager'
							sx={{ pl: 4 }}
						/>
						<SideItem
							name='Itemset'
							path='/itemset-manager'
							sx={{ pl: 4 }}
						/>
					</List>
				</Collapse>
				<SideItem
					name='Rider&Pricing'
					path='/rider-manager'
					icon={<DeliveryDiningIcon />}
				/>
				<SideItem
					name='Logout'
					path='/logout'
					icon={<LogoutIcon />}
				/>
				<Divider />
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<NightlightIcon />
						</ListItemIcon>
						<Switch
							checked={isDarkMode}
							onChange={handleModeSwitch}
						/>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
};

export default Sidebar;
