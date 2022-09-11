import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import ItemManager from './pages/ItemManager';
import ItemsetManager from './pages/ItemsetManager';
import Login from './pages/Login';
import MaterialManager from './pages/MaterialManager';
import OrderManager from './pages/OrderManager';
import Playground from './pages/Playground';
import Register from './pages/Register';
import RiderManager from './pages/RiderManager';

const routes = [
	{
		path: '/',
		name: 'Home',
		exact: true,
		Component: Dashboard,
	},
	{
		path: '/goals',
		name: 'Goals',
		Component: Goals,
	},
	{
		path: '/login',
		name: 'Login',
		Component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		Component: Register,
	},
	{
		path: '/playground',
		name: 'Playground',
		Component: Playground,
	},
	{
		path: '/material-manager',
		name: 'Material Manager',
		Component: MaterialManager,
	},
	{
		path: '/item-manager/*',
		name: 'Item Manager',
		Component: ItemManager,
	},
	{
		path: '/order-manager',
		name: 'Order Manager',
		Component: OrderManager,
	},
	{
		path: '/rider-manager',
		name: 'Rider Manager',
		Component: RiderManager,
	},
	{
		path: '/itemset-manager/*',
		name: 'Itemset Manager',
		Component: ItemsetManager,
	},
];

export default routes;
