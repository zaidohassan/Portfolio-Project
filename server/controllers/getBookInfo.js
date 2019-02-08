let accessKey = process.env.AWS_ACCESS_KEY_ID;
let accessSecret = process.env.AWS_SECERT_ACCESS_KEY;
const amazonMws = require("amazon-mws")(accessKey, accessSecret);

let isbnLookUp = (req, res) => {
  const { id } = req.params;
  amazonMws.products
    .search(
      {
        Version: "2011-10-01",
        Action: "ListMatchingProducts",
        SellerId: process.env.MWS_SELLER_ID,
        MarketplaceId: process.env.MWS_MARKETPLACE_ID,
        Query: id
      },
      function(error, response) {
        if (error) {
          console.log("error products", error);
          return;
        }
        let ASIN = response.Products.Product.Identifiers.MarketplaceASIN.ASIN;
        const binding =
          response.Products.Product.AttributeSets.ItemAttributes.Binding;
        const imageURL =
          response.Products.Product.AttributeSets.ItemAttributes.SmallImage.URL;
        const salesRank =
          response.Products.Product.SalesRankings.SalesRank[0].Rank;

        const title =
          response.Products.Product.AttributeSets.ItemAttributes.Title;
        //   console.log(binding, imageURL, salesRank, title);

        amazonMws.products.searchFor(
          {
            Version: "2011-10-01",
            Action: "GetCompetitivePricingForASIN",
            SellerId: process.env.MWS_SELLER_ID,
            MarketplaceId: process.env.MWS_MARKETPLACE_ID,
            "ASINList.ASIN.1": ASIN
          },
          function(error, response) {
            if (error) {
              console.log("error products", error);
              return;
            }

            const usedBuyBoxPrice =
              response.Product.CompetitivePricing.CompetitivePrices
                .CompetitivePrice[1].Price.LandedPrice.Amount;
            res.status(200).json({
              binding,
              imageURL,
              salesRank,
              title,
              usedBuyBoxPrice
            });
          }
        );
      }
    )
    .catch(err => console.log("Theres an error", err));
};

module.exports = {
  isbnLookUp
};
