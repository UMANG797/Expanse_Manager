const bcrypt = require('bcrypt');
const User = require('../models/User.js');
module.exports = {

  signup: async function (req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.send('Email and password required');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        password: hashedPassword
      }).fetch();

      return res.send(`User created: ${newUser.email}`);

    } catch (err) {
      return res.send(`Error: ${err.message}`);
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.send('User not found');

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.send('Invalid password');

      return res.send(`Welcome ${user.email}`);

    } catch (err) {
      return res.send(`Error: ${err.message}`);
    }
  }

};
