import CardModel from "../models/Card.js";

export const getAll = async (req, res) => {
  try {
    const cards = await CardModel.find();
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to receive cards",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await CardModel.findById(cardId);
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to receive cards",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new CardModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
      mainPhotoUrl: req.body.mainPhotoUrl,
      hoverPhotoUrl: req.body.hoverPhotoUrl,
      model: req.body.model,
    });

    const card = await doc.save();

    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create a card",
    });
  }
};
