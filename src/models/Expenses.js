const { Schema, model } = require('mongoose');

const newExpenses = new Schema({
    incomes: {
        salary: {type: Number},
        otherIncome: {type: Number}
    },
    apartment: {
        mortgage: {type: Number},
        rental: {type: Number}
    },
    childcare: {
        type: Number
    },
    clothing: {
        type: Number
    },
    transport: {
        type: Number
    },
    services: {
        type: Number
    },
    markets: {
        type: Number
    },
    restaurants: {
        type: Number
    },
    leisure: {
        type: Number
    },
    others: {
        type: Number
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('ExpensesModel', newExpenses);