const User = require('../models/User');
const bcrypt = require('bcrypt');

    ////////////////////////// Creates a new user///////////////////////////////////////////////
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }); // searching for the email
        if (!user) {  // we can do that since the email is unique:true (as a primary key)
            res.render('login-user', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);// matching the found pw it returns  true of false
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try {

        const user = new User({ email: req.body.email, password: req.body.password });
        await user.save();
        res.redirect('/?message=user saved')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-user', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}