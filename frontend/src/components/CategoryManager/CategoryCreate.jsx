import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCategory,
	getCategories,
} from '../../features/expenseCategories/categorySlice';
import CategoryForm from './CategoryForm';

const CategoryCreate = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector(
		(state) => state.expenseCategories
	);
	const parents = categories
		.filter((category) => category.parent === null)
		.map((parent) => {
			return {
				label: parent.name,
				id: parent._id,
			};
		});

	parents.unshift({
		label: 'No parent',
		id: null,
	});

	const [name, setName] = useState('');
	const [parent, setParent] = useState(parents[0]);

	const handleCreateClick = (name, parent) => {
		const categoryData = {
			name,
			parent,
		};
		dispatch(createCategory(categoryData));
	};
	return (
		<>
			<Typography variant='h6'>
				Create new category
			</Typography>
			<CategoryForm
				action={handleCreateClick}
				name={name}
				setName={setName}
				parent={parent}
				setParent={setParent}
				parents={parents}
			/>
		</>
	);
};

export default CategoryCreate;
