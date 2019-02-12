const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    try {
      db.findUser([username]).then(async users => {
        console.log(users[0]);

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
    return res.sendStatus(200);
  }
};
