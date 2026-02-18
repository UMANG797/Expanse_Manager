module.exports = {

  index: async function (req, res) {
    return res.view('dashboard', {
      user: req.user
    });
  }

};
