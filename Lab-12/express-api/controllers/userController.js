let users = [
    {id:1, name: "Deepak"},
    {id:2, name:"Arjun"},
    {id:3, name:"Arun"}
];

function getUsers(req,res) {
    res.json(users);
}

function getUserById(req,res) {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    res.json(user);
}

function createUser(req,res) {
    const newUser = {
        id: users.length+1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
}

function updateUser(req,res){
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    user.name = req.body.name;
    res.json(user);
}

function deleteUser(req,res) {
    users = users.filter(u => u.id != parseInt(req.params.id));
    res.json({message:"User deleted successfully"});
}

module.exports = {getUsers,getUserById,createUser,updateUser,deleteUser};
