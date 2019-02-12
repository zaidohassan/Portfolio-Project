const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    const db = req.app.get("db");

    try {
      const checkUser = await db.get_user(username);
      if (!checkUser === []) {
        res.status(409).json("Username Taken");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const result = await db.register_user([username, hash, email]);
        const user = result[0];
        req.session.user = {
          id: user.user_id,
          username: user.username,
          email: user.email
        };
        res.status(200).json(req.session.user);
      }
    } catch (err) {
      console.log(err);
      res.status(401).json("Theres an error");
    }
  }
};
