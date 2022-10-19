import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	createCategory,
	deleteCategory,
	getCategories,
} from '../../features/expenseCategories/categorySlice';
import DeleteButton from '../DeleteButton';
import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';

const CategoryItem = ({
	name,
	clickAction,
	deleteAction,
}) => {
	return (
		<ListItem
			secondaryAction={
				<DeleteButton action={deleteAction} />
			}
		>
			<ListItemButton onClick={clickAction}>
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
};

const CategorySubItem = ({
	name,
	clickAction,
	deleteAction,
}) => {
	return (
		<ListItem
			secondaryAction={
				<DeleteButton action={deleteAction} />
			}
		>
			<ListItemButton onClick={clickAction} sx={{ pl: 6 }}>
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
};

const CategoriesList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { categories } = useSelector(
		(state) => state.expenseCategories
	);

	const [selectCategory, setSelectCategory] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const handleCategoryClick = (category) => {
		setSelectCategory(category);
		setOpenModal(true);
	};

	const handleDeleteClick = (id) => {
		dispatch(deleteCategory(id));
	};

	return (
		<>
			<CategoryCreate />
			<Divider />
			<List>
				{categories &&
					categories.map((category) => {
						if (category.parent === null) {
							return (
								<div key={category._id}>
									<CategoryItem
										name={category.name}
										clickAction={() => {
											handleCategoryClick(category);
										}}
										deleteAction={() => {
											handleDeleteClick(category._id);
										}}
									/>
									{category.children.length > 0 ? (
										<List component='div' disablePadding>
											{category.children.map((child) => {
												const category = categories.find(
													({ _id }) => _id === child
												);
												return (
													<CategorySubItem
														key={category._id}
														name={category.name}
														clickAction={() => {
															handleCategoryClick(category);
														}}
														deleteAction={() => {
															handleDeleteClick(
																category._id
															);
														}}
													/>
												);
											})}
										</List>
									) : null}
								</div>
							);
						}
					})}
			</List>
			<CategoryEdit
				open={openModal}
				setOpen={setOpenModal}
				category={selectCategory}
			/>
		</>
	);
};

export default CategoriesList;
