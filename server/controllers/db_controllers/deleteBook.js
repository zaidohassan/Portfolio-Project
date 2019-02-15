module.exports = {
  deleteBook: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_book(+id)
      .then(response => {
        console.log(response);

        res.status(200).json("One less book");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};
