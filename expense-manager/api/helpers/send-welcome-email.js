module.exports = {

  friendlyName: 'Send welcome email',

  description: 'Send welcome email to new user',

  inputs: {
    to: {
      type: 'string',
      required: true
    }
  },

  fn: async function ({ to }) {

    console.log(`Welcome email sent to ${to}`);

    

    return true;
  }
};