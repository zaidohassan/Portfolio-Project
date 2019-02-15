module.exports = {
  getBooks: (req, res) => {
    const db = req.app.get("db");
    const { newDate } = req.body;
    db.getBook([newDate]).then(response => {
      res.status(200).json(response);
    });
  },
  didMount: (req, res) => {
    const db = req.app.get("db");
    const { todaysDate } = req.body;
    db.getBook([todaysDate]).then(response => {
      res.status(200).json(response);
    });
  }
};
