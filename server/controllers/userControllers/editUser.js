module.exports = {
  editUser: (req, res) => {
    const db = req.app.get("db");
    const { newEmail } = req.body;
    const { id } = req.params;

    try {
      db.editUserInfo([+id, newEmail]).then(async users => {
        console.log(users[0]);
        res.status(200).json(users[0]);
      });
    } catch (err) {
      console.log(err);
      res.status(401).json("Theres an error");
    }
  }
};
