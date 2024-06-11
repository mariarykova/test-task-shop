import Good from "../models/Good.js";

export const getOneModel = async (req, res) => {
  try {
    const model = req.params.model;
    // Find all goods with the specified model
    const goods = await Good.find({ model });
    if (!goods || goods.length === 0) {
      return res.status(404).json({ message: "Model not found" });
    }

    // Aggregate colors and sizes
    const colors = [...new Set(goods.map((good) => good.color))];
    const sizes = [...new Set(goods.map((good) => good.size))];

    // Construct the response
    const response = {
      model,
      title: goods[0].title,
      description: goods[0].description,
      type: goods[0].type,
      price: goods[0].price,
      colors,
      sizes,
      details: goods.map((good) => ({
        color: good.color,
        size: good.size,
        quantity: good.quantity,
        photo: good.photo,
      })),
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to receive the model",
    });
  }
};
