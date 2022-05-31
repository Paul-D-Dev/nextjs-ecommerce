import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1L5ag2FzjRlBvG9ZZ3JRw21V' },
                    { shipping_rate: 'shr_1L5agVFzjRlBvG9ZxqcShopK' },
                ],
                line_items: req.body.map(item => {
                    const img = item.images[0].asset._ref;
                    const urlSanity = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/`;
                    const newImage = img.replace('image-', urlSanity).replace('-webp', '.webp')
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled:true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            // Return session from Stripe's transaction
            res.status(200).json(session);
        } catch (err) {
            res.status(err.status || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
