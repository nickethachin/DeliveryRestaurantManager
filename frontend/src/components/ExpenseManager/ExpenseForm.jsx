import {
	Autocomplete,
	Button,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMaterials } from '../../features/materials/materialSlice';
import DatePickerNow from '../DatePickerNow';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RepeatIcon from '@mui/icons-material/Repeat';
const ExpenseForm = ({
	saveAction,
	expense = undefined,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getMaterials());
	}, []);

	const { categories } = useSelector(
		(state) => state.expenseCategories
	);
	const mainCategories = categories
		.filter((category) => category.parent === null)
		.map((parent) => {
			return {
				label: parent.name,
				id: parent._id,
			};
		});
	const [selectMainCategory, setMainCategory] =
		useState(null);
	const [mainCategoriesInput, setMainCategoriesInput] =
		useState('');

	const [subCategories, setSubCategories] = useState(null);
	const [selectSubCategory, setSubCategory] =
		useState(null);
	const [subCategoriesInput, setSubCategoriesInput] =
		useState('');

	const [selectItem, setSelectItem] = useState(null);
	const [itemInput, setItemInput] = useState('');

	const [amount, setAmount] = useState('');
	const [desc, setDesc] = useState('');
	const [date, setDate] = useState(null);
	const [total, setTotal] = useState('');

	useEffect(() => {
		dispatch(getMaterials());
	}, []);

	const items = useSelector(
		(state) => state.materials.materials
	).map((item) => {
		return {
			id: item._id,
			type: item.type,
			label: item.name,
			unit: item.unit,
		};
	});
	useEffect(() => {
		let mainCategoryData = { name: '', children: [] };
		if (selectMainCategory !== null) {
			mainCategoryData = categories.find(
				(category) => category._id === selectMainCategory.id
			);
		}

		const hasChildren =
			mainCategoryData.children.length > 0;
		if (hasChildren) {
			setSubCategories(() => {
				return mainCategoryData.children.map((child) => {
					const childData = categories.find(
						(category) => category._id === child
					);
					return {
						label: childData.name,
						id: childData._id,
					};
				});
			});
		}
	}, [selectMainCategory]);

	useEffect(() => {
		// if Editing instead of creating
		if (expense) {
			setMainCategory(
				mainCategories.find(
					(category) => category.id === expense.category._id
				)
			);
			if ('matId' in expense) {
				setSelectItem(
					items.find(
						(item) => item.id === expense.matId._id
					)
				);
			} else {
				setDesc(expense.name);
			}
			setAmount(expense.amount);
			setTotal(expense.total);
			setDate(expense.date);
		}
	}, []);
	const saveToDatabase = () => {
		if (selectMainCategory === null) {
			toast.error('Category field is empty');
			return;
		}
		if (total === '' || total <= 0) {
			toast.error('Invalid Total field');
			return;
		}
		if (amount === '' || amount <= 0) {
			toast.error('Invalid amount field');
			return;
		}
		let data = null;
		if (selectItem !== null) {
			data = {
				name: selectItem.label,
				matId: selectItem.id,
				category: selectMainCategory.id,
			};
		} else {
			data = {
				name: desc,
				category:
					selectSubCategory === null
						? selectMainCategory.id
						: selectSubCategory.id,
			};
		}

		if (data.name === null || data.name === '') {
			toast.error('Invalid item data');
			return;
		}

		data = {
			...data,
			amount: amount,
			total: total,
			date:
				date !== null ? dayjs(date).toDate() : undefined,
		};
		saveAction(data);
	};
	const handleSaveAndRepeat = () => {
		saveToDatabase();
		setSelectItem(null);
		setDesc('');
		setAmount('');
		setTotal('');
	};

	const handleSaveAndBack = () => {
		saveToDatabase();
		navigate('/expense-manager/');
	};
	return (
		<Stack spacing={2}>
			<Stack direction='row' spaceing={2}>
				<Autocomplete
					fullWidth
					options={mainCategories}
					renderInput={(params) => (
						<TextField {...params} label='Category' />
					)}
					value={selectMainCategory}
					onChange={(event, newValue) => {
						setMainCategory(newValue);
						setSelectItem(null);
						setAmount('');
						setDesc('');
					}}
					inputValue={mainCategoriesInput}
					onInputChange={(event, newInputValue) => {
						setMainCategoriesInput(newInputValue);
					}}
					isOptionEqualToValue={(option, value) =>
						option.id === value.id
					}
				/>
				{subCategories && subCategories.length > 0 ? (
					<Autocomplete
						fullWidth
						options={subCategories}
						renderInput={(params) => (
							<TextField {...params} label='Sub-Category' />
						)}
						value={selectSubCategory}
						onChange={(event, newValue) => {
							setSubCategory(newValue);
						}}
						inputValue={subCategoriesInput}
						onInputChange={(event, newInputValue) => {
							setSubCategoriesInput(newInputValue);
						}}
						isOptionEqualToValue={(option, value) =>
							option.id === value.id
						}
					/>
				) : null}
			</Stack>

			{selectMainCategory &&
			(selectMainCategory.label.toLowerCase() ===
				'ingredient' ||
				selectMainCategory.label.toLowerCase() ===
					'packaging') ? (
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					spacing={2}
				>
					<Autocomplete
						size='small'
						fullWidth
						options={items.filter((item) => {
							const label =
								selectMainCategory.label.toLowerCase();
							if (label === 'ingredient')
								return item.type === 'ingredient';
							if (label === 'packaging')
								return item.type === 'package';
						})}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Select ingredient'
							/>
						)}
						value={selectItem}
						onChange={(event, newValue) => {
							setSelectItem(newValue);
						}}
						inputValue={itemInput}
						onInputChange={(event, newInputValue) => {
							setItemInput(newInputValue);
						}}
						isOptionEqualToValue={(option, value) =>
							option.id === value.id
						}
					/>

					<TextField
						type='number'
						size='small'
						value={amount}
						onChange={(event) =>
							setAmount(event.target.value)
						}
					/>
					<Typography variant='body'>
						{selectItem !== null ? selectItem.unit : 'unit'}
					</Typography>
				</Stack>
			) : (
				<Stack
					direction='row'
					spacing={2}
					alignItems='center'
					justifyContent='space-between'
				>
					<TextField
						fullWidth
						label='Expense description/name'
						value={desc}
						onChange={(event) =>
							setDesc(event.target.value)
						}
					/>
					<TextField
						type='number'
						value={amount}
						label='Amount'
						onChange={(event) =>
							setAmount(event.target.value)
						}
					/>
				</Stack>
			)}
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
			>
				<DatePickerNow value={date} setValue={setDate} />
				<Stack
					direction='row'
					alignItems='center'
					spacing={2}
				>
					<Typography variant='h6'>Total</Typography>
					<TextField
						type='number'
						value={total}
						onChange={(event) =>
							setTotal(event.target.value)
						}
						helperText='Total cost for this expenses (฿)'
					/>
					<Typography variant='h6'>฿</Typography>
				</Stack>
			</Stack>

			<Stack
				direction='row'
				alignItems='center'
				justifyContent='flex-end'
				spacing={2}
			>
				{expense ? null : (
					<Button
						variant='contained'
						onClick={handleSaveAndRepeat}
					>
						<RepeatIcon />
						Save & Add new Expense
					</Button>
				)}
				<Button
					variant='contained'
					onClick={handleSaveAndBack}
				>
					<ArrowBackIcon />
					Save & Go back
				</Button>
			</Stack>
		</Stack>
	);
};

export default ExpenseForm;
