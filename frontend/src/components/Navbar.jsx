import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {
	AppBar,
	Avatar,
	Menu,
	MenuItem,
	styled,
	Toolbar,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

const StyledToolbar = styled(Toolbar)({
	display: 'flex',
	justifyContent: 'space-between',
});

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<AppBar position='sticky'>
			<StyledToolbar>
				<Link to='/'>
					<Typography
						variant='h6'
						color='white'
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						SmileDong
					</Typography>
					<EmojiEmotionsIcon
						sx={{ display: { xs: 'block', sm: 'none' } }}
					/>
				</Link>
				<Avatar
					id='profile-button'
					sx={{ width: 30, height: 30 }}
					onClick={handleClick}
					src='https://www.gbtps.org/wp-content/uploads/2015/08/blank-avatar.png'
				/>
				<Menu
					id='profile-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={onLogout}>Logout</MenuItem>
				</Menu>
			</StyledToolbar>
		</AppBar>
	);
};

export default Navbar;
