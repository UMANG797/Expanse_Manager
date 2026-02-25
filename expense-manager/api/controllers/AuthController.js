const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  signup: async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send('Email and password required');
    }
    if(password.length<8)
    {
      return res.send("password must be at least 8 characters");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //new user creation
    const newUser = await User.create({
      email,
      password: hashedPassword
    }).fetch();

    //account creation for new user (default account)
    await Account.create({
      name: email,
      owner: newUser.id
    });

    // ✅ Send welcome email
    await sails.helpers.sendWelcomeEmail.with({
      to: email
    });

    //redirect to login page after successful signup
    return res.redirect('/login');

  } catch (err) {
    console.log(err);
    return res.send(`Error: ${err.message}`);
  }
},

//login handler
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

      //redirect to dashboard after successful login
      return res.redirect('/dashboard');

    } catch (err) {
      return res.send(`Error: ${err.message}`);
    }
  },

  //logout handler (delete the token cookie)
  logout: async function (req, res) {
    res.clearCookie('token');
    //redirect to login page after logout
    return res.redirect('/login');
  }

};
