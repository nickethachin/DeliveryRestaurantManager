const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({
	path: './.env',
});
const {
	errorHandler,
} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/riders', require('./routes/riderRoutes'));
app.use(
	'/api/materials',
	require('./routes/materialRoutes')
);
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/itemsets', require('./routes/itemsetRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(
		express.static(
			path.join(__dirname, '../frontend/build')
		)
	);

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(
				__dirname,
				'../',
				'frontend',
				'build',
				'index.html'
			)
		)
	);
} else {
	app.get('/', (req, res) =>
		res.send('Please set to production')
	);
}

app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server started on port ${port}`)
);
