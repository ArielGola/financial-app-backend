const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const midds = {};

midds.verifyToken = async (req, res, next) => {
    try {
        
        let token;

        if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*12
        });

        req.userId = decode.id;

        await UserModel.findOne({_id: req.userId});

        next();
        
    } catch (error) {
        res.status(403).json({msg: "El user anduvo mal el verify", error: error.message});
    }
};

midds.comprobateRole = async (req, res, next) => {
    const { role } = req.body;

    if (!role === "admin" || !role === "mod" || !role === "regular") {
        res.status(400).json({msg: "Role invalido"});
    };

    next();
};

midds.verifyRoleAdmin = async (req, res, next) => {
    try {
        
        let token;

        if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*12
        });

        //req.userId = decode.id;

        //const { role } = await UserModel.findOne({_id: req.userId});

        const role = decode.role;

        if (!role || !role === "admin" || role === "regular" || role === "mod") {
            return res.status(403).json({msg: "El role esta mal"});
        };

        next();
        
    } catch (error) {
        return res.status(403).json({msg: "El role esta mal", error: error.message});
    }
}; 


midds.verifyRoleMod = async (req, res, next) => {
    try {
        
        let token;

        if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: 60*60*12
        });

        //req.userId = decode.id;

        //const { role } = await UserModel.findOne({_id: req.userId});

        const role = decode.role;

        if (!role || !role === "mod" || role === "regular" || role === "admin") {
            return res.status(403).json({msg: "El role esta mal"});
        };

        return next();
        
    } catch (error) {
        return res.status(403).json({msg: "El role esta mal", error: error.message});
    }
};

module.exports = midds;