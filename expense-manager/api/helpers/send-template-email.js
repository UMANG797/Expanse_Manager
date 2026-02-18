const nodemailer = require('nodemailer');

module.exports = {

  friendlyName: 'Send welcome email',

  description: 'Send welcome email to new user',

  inputs: {
    to: {
      type: 'string',
      required: true
    }
  },

  fn: async function (inputs) {

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Expense Manager" <${process.env.EMAIL_USER}>`,
      to: inputs.to,
      subject: "Welcome to Expense Manager 🎉",
      html: `
        <h2>Welcome!</h2>
        <p>Your account has been successfully created.</p>
        <p>Start managing your finances now 🚀</p>
      `
    });

  }
};
