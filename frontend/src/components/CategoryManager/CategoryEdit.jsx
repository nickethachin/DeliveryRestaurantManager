import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../features/expenseCategories/categorySlice';
import CategoryForm from './CategoryForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '70%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	// boxShadow: 24,
	p: 4,
};

const CategoryEdit = ({ open, setOpen, category }) => {
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

	const handleEditClick = (name, parent) => {
		const categoryData = {
			_id: category._id,
			name,
			parent,
		};
		dispatch(updateCategory(categoryData));
		setOpen(false);
	};

	useEffect(() => {
		if (category) {
			setName(category.name);
			setParent(() => {
				return parents.find(
					(parent) => parent.id === category.parent
				);
			});
		}
	}, [category]);
	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<Box sx={style}>
				<Typography variant='h6' sx={{ mb: 2 }}>
					Editing {category._id}
				</Typography>
				<CategoryForm
					action={handleEditClick}
					name={name}
					setName={setName}
					parent={parent}
					setParent={setParent}
					parents={parents}
					isEdit={true}
				/>
			</Box>
		</Modal>
	);
};

export default CategoryEdit;
