let accessKey = process.env.AWS_ACCESS_KEY_ID;
let accessSecret = process.env.AWS_SECERT_ACCESS_KEY;
const amazonMws = require("amazon-mws")(accessKey, accessSecret);

let isbnLookUp = async (req, res) => {
  const { id } = req.params;
  await amazonMws.products
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

        let ASIN = "";
        let binding = "";
        let imageURL = "";
        let salesRank = "";
        let title = "";
        let withArray = response.Products.Product[0];
        let noArray = response.Products.Product;

        if (!noArray.Identifiers) {
          ASIN = withArray.Identifiers.MarketplaceASIN.ASIN;
          binding = withArray.AttributeSets.ItemAttributes.Binding;
          imageURL = withArray.AttributeSets.ItemAttributes.SmallImage.URL;
          salesRank = withArray.SalesRankings.SalesRank[0].Rank;
          title = withArray.AttributeSets.ItemAttributes.Title;
        } else {
          ASIN = noArray.Identifiers.MarketplaceASIN.ASIN;
          binding = noArray.AttributeSets.ItemAttributes.Binding;
          imageURL = noArray.AttributeSets.ItemAttributes.SmallImage.URL;
          salesRank = noArray.SalesRankings.SalesRank[0].Rank;
          title = noArray.AttributeSets.ItemAttributes.Title;
        }
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

            let usedBuyBoxPrice = "";
            let noArrayPrice =
              response.Product.CompetitivePricing.CompetitivePrices
                .CompetitivePrice;
            let withArrayPrice =
              response.Product.CompetitivePricing.CompetitivePrices
                .CompetitivePrice[0];

            if (!noArrayPrice.Price) {
              usedBuyBoxPrice = withArrayPrice.Price.LandedPrice.Amount;
            } else {
              usedBuyBoxPrice = noArrayPrice.Price.LandedPrice.Amount;
            }
            // some are not stored in an array
            // some are stored in an array it would be CompetitivePrice[0] or  [1]

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
