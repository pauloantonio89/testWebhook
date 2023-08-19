const getAllGames = async (req, res) => {
  const games = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Text response from webhook"
          ]
        }
      }
    ]
  }
  return res.status(200).json(games);
};



module.exports = {
  getAllGames,
 
};