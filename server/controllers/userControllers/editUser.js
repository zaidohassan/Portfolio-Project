module.exports = {
  editUser: (req, res) => {
    const db = req.app.get("db");
    const { newEmail, profilePic } = req.body;
    const { id } = req.params;

    try {
      if (!profilePic) {
        db.editUserInfo([+id, newEmail]).then(async users => {
          console.log(users[0]);
          res.status(200).json(users[0]);
        });
      } else {
        db.editUserInfowithPic([+id, newEmail, profilePic]).then(
          async users => {
            console.log(users[0]);
            res.status(200).json(users[0]);
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(401).json("Theres an error");
    }
  }
};
