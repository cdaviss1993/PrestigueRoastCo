import React, {useContext} from "react";
import { CartContext } from "../contexts/CartContext.js";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test-yourkeyhere'); // Replace with your Stripe public key

export default function Checkout() {
    const { cart } = useContext(CartContext);

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const { data } = await axios.post('/api/payments/create-checkout-session', {
                cartItems: cart }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            await stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="p-6">'
            <h1 className="text-3xl mb-4">Checkout</h1>
            <button onClick={handleCheckout} className="bg-gold text-black px-4 py-2 rounded">
                Pay with Stripe
            </button>
        </div>
    );
}