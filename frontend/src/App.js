import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MaterialManager from './pages/MaterialManager';
import OrderManager from './pages/OrderManager';
import Playground from './pages/Playground';
import Register from './pages/Register';
import RiderManager from './pages/RiderManager';

function App() {
	return (
		<>
			<Router>
				<div className='container'>
					<Header />
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route
							path='/playground'
							element={<Playground />}
						/>
						<Route
							path='/material-manager'
							element={<MaterialManager />}
						/>
						<Route
							path='/order-manager'
							element={<OrderManager />}
						/>
						<Route
							path='/rider-manager'
							element={<RiderManager />}
						/>
						<Route path='/login' element={<Login />} />
						<Route
							path='/register'
							element={<Register />}
						/>
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
