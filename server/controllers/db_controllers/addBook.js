module.exports = {
  addBook: (req, res) => {
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
      ASIN,
      selectedDate
    } = req.body;

    console.log(
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
      ASIN,
      selectedDate
    );

    db.addBook([
      profitFBA,
      totalFbaFee,
      mfProfit,
      mfFees,
      costOfGood,
      usedBuyBoxPrice,
      selectedDate,
      ASIN,
      imageURL,
      title,
      binding,
      salesRank
    ])
      .then(() => {
        res.status(200).response("OhYeah");
      })
      .catch(err => {
        res.status(500).send(err, "You done messed up A-A-Ron");
        console.log(err);
      });
  }
};
