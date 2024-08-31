
const crypto = require('crypto');
const user_model = require('../models/user_model');
const user_master = async (req, res) => {
    try {
        res.render('user_master');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const update_user = async (req, res) => {
    try {
        const old_username = req.body.old_username;
        const old_password = req.body.old_password;

        // Find the user by old username
        const user = await user_model.findOne({ username: old_username });

        if (!user) {
            console.error('User not found');
            return res.status(404).send('User not found.');
        }

        // Check if the old password matches
        if (user.password == old_password) {
            if (req.body.new_username && req.body.new_password) {
                const update = await user_model.updateOne({ username: old_username }, { $set: { username: req.body.new_username, password: req.body.new_password } });
            }
            else if (!req.body.new_username && req.body.new_password) {
                const update = await user_model.updateOne({ username: old_username }, { $set: { password: req.body.new_password } });
            }
            else if (req.body.new_username && !req.body.new_password) {
                const update = await user_model.updateOne({ username: old_username }, { $set: { username: req.body.new_username } });
            }
        }

        // If you just want to verify and not update, send a success response
        res.send("<script>alert('User Details Updated Successfully!');window.location.href = '/user/user_master'; </script>");

    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).send('Internal Server Error');
    }
};

const login = async (req,res) => {
    try {
        const in_username = req.body.username;
        const in_password = req.body.password;
        
        const user = await user_model.findOne({username : in_username});
        if(user)
        {
            console.log(user.username);
            console.log(user.password);
            if(in_password === user.password)
            {
                console.log("\nLogin Successfull ...");
                res.redirect('/pooja/by_devotee');
            }
            else
            {
                console.log("Invalid Login Credentials");
                res.send("<script>alert('Invalid Login Credentials !!!'); window.location.href = '/'; </script>");
            }
        }
        else
        {
            console.log("Invalid Login Credentials");
            res.send("<script>alert('Invalid Login Credentials !!!'); window.location.href = '/'; </script>");
        }
    } catch (error) {
        console.log("\n"+error);
    }
};

module.exports = {
    user_master,
    update_user,
    login
};