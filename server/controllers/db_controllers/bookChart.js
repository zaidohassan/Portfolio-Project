module.exports = {
  bookChart: (req, res) => {
    const db = req.app.get("db");
    const { date } = req.body;
    db.chartBook(date).then(response => {
      res.status(200).json(response);
    });
  }
};
