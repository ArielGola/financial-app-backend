const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// Init
const app = express();


// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())


// Routes
app.use('/api/users/usr', require('./routes/user.routes'));
app.use('/api/financial/goals', require('./routes/goal.routes'));
app.use('/api/financial/expenses', require('./routes/expenses.routes'));


module.exports = app;