import {
	alpha,
	Box,
	Card,
	CardContent,
	createTheme,
	CssBaseline,
	Stack,
	ThemeProvider,
} from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import routes from './routes';

function App() {
	const getTheme = (theme) => {
		const lightMode = createTheme({
			palette: {
				mode: 'light',
			},
		});
		const darkMode = createTheme({
			palette: {
				mode: 'dark',
				primary: {
					main: '#01A1BD',
				},
				secondary: {
					main: '#EFA25F',
				},
				background: {
					default: '#171521',
					paper: '#1A1926',
				},
				text: {
					primary: '#f0f0f0',
				},
			},
			typography: {
				fontFamily: ['Roboto', 'Poppins', 'Kanit'].join(
					','
				),
			},
		});

		switch (theme) {
			case 'light':
				return lightMode;
			case 'dark':
				return darkMode;
			default:
				return darkMode;
		}
	};
	const [theme, setTheme] = useState('dark');

	return (
		<ThemeProvider theme={getTheme(theme)}>
			<CssBaseline />
			<Navbar />
			<Box
				bgcolor={'background.default'}
				color={'text.primary'}
			>
				<Stack
					direction='row'
					spacing={1}
					justifyContent='space-between'
				>
					<Sidebar setTheme={setTheme} />
					<Box flex={1}>
						<Card variant='outlined'>
							<CardContent>
								<Routes>
									{routes.map((route) => (
										<Route
											key={route.path}
											path={route.path}
											exact={route.exact}
											element={<route.Component />}
										/>
									))}
								</Routes>
							</CardContent>
						</Card>
					</Box>
				</Stack>
			</Box>
			<ToastContainer />
		</ThemeProvider>
	);
}

export default App;
