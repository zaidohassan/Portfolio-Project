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
        res.status(200).json(response);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Could not Add book");
    }
  }
};
