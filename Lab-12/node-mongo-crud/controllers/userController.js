const User = require("../models/User");

exports.createUser = async (req,res)=> {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.updateUser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(user);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteUser = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted successfully"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};