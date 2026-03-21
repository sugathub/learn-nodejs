const User = require("../models/user");

async function handleGetAllUsers(req,res){
     try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }
// ------------------------------------------

 async function getUserByID(req,res){
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

 }

//  -----------------------------------------------

 async function fullUpdateByID(req,res){
 try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

//  -------------------------------------------------------

async function partialUpdateByID(req,res){
      try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// --------------------------------------------


async function enterNewDataByID(req,res){
 try {
        const body = req.body;

        if (!body) {
            return res.status(400).json({ message: "Body is missing" });
        }

        if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const result = await User.create(body);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

} 



 module.exports= {
    handleGetAllUsers,
    getUserByID,
    fullUpdateByID,
    partialUpdateByID,
    enterNewDataByID,

 }