import { ProductCard } from '@/components/stripe/ProductCard';
import { SubscriptionStatus } from '@/components/stripe/SubscriptionStatus';
import { stripeProducts } from '@/stripe-config';

export function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">NAATI Mock Tests</h1>
        
        <div className="mb-8">
          <SubscriptionStatus />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stripeProducts.map((product) => (
            <ProductCard key={product.priceId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}