export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SEnUsRzNOkXz9XJf0WIpneQ',
    name: '1 Mock Test',
    description: 'Single NAATI mock test credit',
    price: 4.00,
    currency: 'AUD',
    mode: 'payment',
  },
];