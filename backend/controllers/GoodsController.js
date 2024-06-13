import Good from "../models/Good.js";
import OrderModel from "../models/Order.js";

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

export const saveOrder = async (req, res) => {
  try {
    const { items, user } = req.body;

    for (const item of items) {
      const checkItem = await Good.findOne({
        model: item.model,
        size: item.size,
        color: item.color,
      });

      if (!checkItem) {
        return res.status(400).json({
          message: `Item not found in goods: ${item.model} ${item.size} ${item.color}`,
        });
      }

      checkItem.quantity -= item.quantity;
      await checkItem.save();
    }

    const newOrder = new OrderModel({
      userId: user._id,
      items,
    });
    const order = await newOrder.save();

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to save order",
    });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const orders = await OrderModel.find(req.params._id);
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to receive oder history",
    });
  }
};
