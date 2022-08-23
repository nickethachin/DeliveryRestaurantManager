import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
	Breadcrumbs,
	Link,
	Typography,
} from '@mui/material';

const Bread = ({ crumbs }) => {
	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize='small' />}
		>
			{crumbs &&
				crumbs.map(({ name, path }, key) =>
					path ? (
						<Link
							key={key}
							underline='hover'
							color='inherit'
							href={path}
						>
							{name}
						</Link>
					) : (
						<Typography key={key}>{name}</Typography>
					)
				)}
		</Breadcrumbs>
	);
};

export default Bread;
