userCtrls = {};
tokenObject = {};

const UserModel = require('../models/User');

const jwt = require('jsonwebtoken');


userCtrls.getAllsUsers = async (req, res) => {
    try {
        
        const users = await UserModel.find();
        res.json({users});
        
    } catch (error) {
        console.log(error.message);
    }
};


userCtrls.getUser = async ( req, res) => {
    try {

        const user = await UserModel.findOne({_id: req.params.id});
        res.status(200).json({user});

    } catch (error) {
        console.log(error.message);
    }
};


userCtrls.createUser = async (req, res) => {
    try {

        const { name, email, age, country, password, role } = req.body;
        const newUser = new UserModel({
            name,
            email,
            age,
            country,
            role,
            password: await UserModel.encryptPass(password)
        });
        await newUser.save();

        const token = jwt.sign({id: newUser._id, role: newUser.role}, process.env.JWT_SECRET, {
            expiresIn: 60*60*6
        });

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }

        localStorage.setItem('token', token);

        res.status(200).json({message: "Succes request", token});

    } catch (error) {
        console.log(error.message);
    }
};


userCtrls.loginUser = async (req, res) => {
    try {
        
        const userFound = await UserModel.findOne({email: req.body.email});

        const matchPass = await UserModel.comparePass(req.body.password, userFound.password);

        const nameFound = userFound.name;

        if (!userFound || !matchPass || nameFound !== req.body.name) {
            return res.status(400).json({message: 'User Not Found'});
        };

        const token = jwt.sign({id: userFound._id, role: userFound.role}, process.env.JWT_SECRET, {
            expiresIn: 60*60*12
        });

        tokenObject.token = token;

        res.status(200).json({token});

    } catch (error) {
        console.log(error.message);
    }
};


userCtrls.updateUser = async (req, res) => {
    try {

        const { avatar } = req.body;
        await UserModel.findOneAndUpdate({_id: req.params.id}, {avatar});
        res.status(200).json({message: "Succes request"});

    } catch (error) {
        console.log(error.message);
    }
};


userCtrls.deleteUser = async (req, res) => {
    try {

        await UserModel.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message: "Succes request"});

    } catch (error) {
        console.log(error.message);
    } 
};


userCtrls.changeRole = async (req, res) => {
    try {

        const { role } = req.body;

        if (!role === "admin" || !role === "mod" || !role === "regular") {
            return res.status(400).json({msg: "Role invalido"});
        };

        const newRole = await UserModel.findOneAndUpdate({_id: req.params.id}, {role});

        res.status(200).json({newRole});

    } catch (error) {
        console.log(error.message);
    }
};


module.exports = userCtrls;