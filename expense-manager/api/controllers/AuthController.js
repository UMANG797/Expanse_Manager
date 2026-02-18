const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

      return res.redirect('/login');

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

      // ✅ Create JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // ✅ Store in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
      });

      return res.redirect('/dashboard');

    } catch (err) {
      return res.send(`Error: ${err.message}`);
    }
  },

  logout: async function (req, res) {
    res.clearCookie('token');
    return res.redirect('/login');
  }

};
