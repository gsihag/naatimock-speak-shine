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
  {
    priceId: 'price_1SEnVBRzNOkXz9XJZhFYJgjb',
    name: '5 Mock Tests',
    description: 'Save $2! Best for regular practice',
    price: 18.00,
    currency: 'AUD',
    mode: 'payment',
  },
  {
    priceId: 'price_1SFCyfRzNOkXz9XJa4BsndOh',
    name: '10 Mock Tests',
    description: 'Save $10! Best value package',
    price: 30.00,
    currency: 'AUD',
    mode: 'payment',
  },
];