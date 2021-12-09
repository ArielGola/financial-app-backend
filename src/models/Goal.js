const { Schema, model } = require('mongoose');

const newGoal = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currentDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('GoalModel', newGoal);