goalCtrls = {};

const GoalModel = require('../models/Goal');
const jwt = require('jsonwebtoken');


goalCtrls.getGoals = async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(404).json({msg: "Error in getGoals, there's no header"});

        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*6
        });

        const goals = await GoalModel.find({user: decode.id});

        if (!goals || goals.length === 0) {
            return res.status(400).json({msg: "Not goals found"});
        } else {
            res.status(200).json(goals);
        }

    } catch (error) {
        console.log(error.message);
    }
};

goalCtrls.getGoal = async (req, res) => {
    try {

        const goal = await GoalModel.findOne({_id: req.params.id});
        res.status(200).json(goal);

    } catch (error) {
        console.log(error.message);
    }
};

goalCtrls.createGoal = async (req, res) => {
    try {

        const { title, description, currentDate, deadline, cost } = req.body;

        const newGoal = new GoalModel({
            title,
            description,
            currentDate,
            deadline,
            cost
        });

        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(405).json({msg: "Error in crreateGoal, there's no header"});

        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*6
        });

        newGoal.user = decode.id;

        newGoal.save();
        
        res.status(200).json({message: "Succes request"});

    } catch (error) {
        console.log(error.message);
    }
};

goalCtrls.updateGoal = async (req, res) => {
    try {

        const { title, description, currentDate, deadline, cost } = req.body;
        await GoalModel.findOneAndUpdate({_id: req.params.id}, {
            title,
            description,
            currentDate,
            deadline,
            cost
        });
        res.status(200).json({message: "Succes request"});

    } catch (error) {
        console.log(error.message);
    }
};

goalCtrls.deleteGoal = async (req, res) => {
    try {

        await GoalModel.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message: "Succes request"});

    } catch (error) {
        console.log(error.message);
    }
};

 
module.exports = goalCtrls;