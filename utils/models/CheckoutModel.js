// checkout store model to preserve checkouts across restarts.
import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  product: {
    type: String,
  },
  shop: {
    type: String,
    required: true,
  },
});

const CheckoutModel = mongoose.model("checkout", checkoutSchema);

export default CheckoutModel;
