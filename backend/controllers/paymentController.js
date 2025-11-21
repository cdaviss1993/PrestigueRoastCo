import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//@desc Create Stripe Checkout Session
//@route POST /api/payments/create-checkout-session
export const createCheckoutSession = async (req, res) => {
    const { cartItems } = req.body;

    try {
        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.imageURL]
                },
                unit_amount: Math.round(item.price * 100) // Stripe expects amount in cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cart`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Stripe session creation failed' });
    }
};