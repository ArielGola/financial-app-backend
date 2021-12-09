expensesCtrls = {};

const ExpensesModel = require('../models/Expenses');
const jwt = require('jsonwebtoken');
const { NativeError } = require('mongoose');


async function getExpensesDatabase(req) {
    try {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) return false;
        
        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*6
        });

        const response = await ExpensesModel.find({user: decode.id});

        if (!response || response.length === 0) {
            return false;
        } else {
            return response;
        }

    } catch (error) {
        console.log(error.message);
    }
};

expensesCtrls.getExpenses = async (req, res) => {
    try {

        res.status(200).json(await getExpensesDatabase(req));
        
    } catch (error) {
        console.log(error.message);
    }
};

expensesCtrls.createExpenses = async (req, res) => {
    try {
        
        const isCreateUpdate = await getExpensesDatabase(req);

        let validatePost = isCreateUpdate.length >= 1;

        if (validatePost === true) {
            return res.status(400).json({message: "You only can create one balance of expenses"});
        }
        
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(405).json({msg: "Error in createExpenses, there's no header"});

        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*6
        });

        let reqBodyContent = req.body;
        
        reqBodyContent.user = decode.id;

        const newExpenses = await new ExpensesModel(reqBodyContent);

        newExpenses.save();

        res.status(200).json({message: "Success creating"});

    } catch (error) {
        console.log(error.message);
    }
};

expensesCtrls.updateExpenses = async (req, res) => {
    try {
        
        await ExpensesModel.findOneAndUpdate({_id: req.params.id}, req.body);
        res.status(200).json({message: "Success updating"});

    } catch (error) {
        console.log(error.message);
    }
};

expensesCtrls.deleteExpenses = async (req, res) => {
    try {
        
        await ExpensesModel.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message: "Succes request"});
        
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = expensesCtrls;