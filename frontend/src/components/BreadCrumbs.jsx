import { Breadcrumbs, Link } from '@mui/material';

const BreadCrumbs = () => {
	const currentPath = window.location.pathname.split('/');
	const crumbs = [];
	for (let i = 0; i < currentPath.length; i++) {
		let path = '';
		for (let j = 0; j <= i; j++) {
			path = `${path}${currentPath[j]}/`;
		}
		crumbs.push(path);
	}
	// .filter(
	// 	({ path }) => path === currentPath
	// );
	return (
		<Breadcrumbs>
			<Link underline='hover' color='inherit' href='/'>
				Home
			</Link>
		</Breadcrumbs>
	);
};

export default BreadCrumbs;
