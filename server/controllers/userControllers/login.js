const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    try {
      db.findUser([username]).then(async users => {
        console.log("res", users[0]);

        if (!users[0]) {
          res.status(401).json({ error: "no users found" });
        } else {
          const isMatch = await bcrypt.compare(password, users[0].password);

          if (isMatch) {
            req.session.user = { username: users[0].username };
            res.json({ username: users[0].username });
          } else {
            res.status(401).json({ error: "Incorrect password" });
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.status(401).json("Theres an error");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.status(200).json("You have been logged out");
  },

  verifyLogin: async (req, res) => {
    try {
      const db = req.app.get("db");
      if (req.session.user) {
        const user = await db.get_user(req.session.user.username);
        console.log(user);
        return res.status(200).json(user);
      } else {
        console.log(err);
        res.status(404).json("Not logged in");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Not logged in");
    }
  }
};
