const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    quantity: item.quantity,
    description: item.description,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1JckF6SIPfglAC4Wsj4OxunU"],
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "CA"],
    },
    mode: "payment",
    line_items: transformedItems,
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
