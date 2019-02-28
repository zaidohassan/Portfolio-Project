module.exports = {
  addBook: (req, res) => {
    try {
      const db = req.app.get("db");
      const {
        profitFBA,
        totalFbaFee,
        mfProfit,
        mfFees,
        costOfGood,
        title,
        binding,
        salesRank,
        usedBuyBoxPrice,
        imageURL,
        ASIN
      } = req.body;

      db.addBook([
        profitFBA,
        totalFbaFee,
        mfProfit,
        mfFees,
        costOfGood,
        usedBuyBoxPrice,
        ASIN,
        imageURL,
        title,
        binding,
        salesRank
      ]).then(response => {
        console.log(response);
        res.status(200).json(response);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Could not Add book");
    }
  },

  rejectBookCount: (req, res) => {
    try {
      const db = req.app.get("db");
      const { todaysDate } = req.body;
      db.rejectAddBook(todaysDate).then(response => {
        console.log(response);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Could not Add Rejected book");
    }
  },

  getBookCount: (req, res) => {
    try {
      const db = req.app.get("db");
      const { todaysDate } = req.body;
      db.getBookCount(todaysDate).then(response => {
        let acceptCount = response[0].count;
        let rejectCount = response[1].count;
        res.status(200).json({ acceptCount, rejectCount });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Could not Add Rejected book");
    }
  }
};
