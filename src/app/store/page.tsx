import type { Metadata } from 'next'
import StoreHero from '@/components/store/StoreHero'
import StoreWhyShop from '@/components/store/StoreWhyShop'
import StoreCategories from '@/components/store/StoreCategories'
import StoreFeaturedProducts from '@/components/store/StoreFeaturedProducts'
import StoreOrderProcess from '@/components/store/StoreOrderProcess'
import StoreDelivery from '@/components/store/StoreDelivery'
import StoreQualityCheck from '@/components/store/StoreQualityCheck'
import StoreFAQ from '@/components/store/StoreFAQ'
import StoreContact from '@/components/store/StoreContact'

export const metadata: Metadata = {
  title: 'Practicode Store — Laptops, Accessories & Developer Merch',
  description:
    'Shop quality UK used laptops, productivity accessories, customized merchandise, and developer essentials at Practicode Academy. Student-friendly pricing with nationwide delivery across Nigeria.',
  keywords: [
    'UK used laptops Nigeria',
    'buy laptop Ibadan',
    'developer accessories Nigeria',
    'Practicode store',
    'customized tech merch',
    'student laptops Nigeria',
    'HP EliteBook Nigeria',
    'Dell laptop Ibadan',
  ],
  alternates: {
    canonical: 'https://practicodea.tech/store',
  },
  openGraph: {
    title: 'Practicode Store — Laptops, Accessories & Developer Merch',
    description:
      'Quality technology products for students, professionals, and businesses. UK used laptops, accessories, and developer essentials with nationwide delivery.',
    url: 'https://practicodea.tech/store',
  },
}

export default function StorePage() {
  return (
    <>
      {/* Hero */}
      <StoreHero />

      {/* Why shop with us */}
      {/* <StoreWhyShop /> */}

      {/* Product categories */}
      <StoreCategories />

      {/* Featured products — e-commerce grid + detail drawer */}
      <StoreFeaturedProducts />

      {/* Order process */}
      <StoreOrderProcess />

      {/* Delivery & visit store */}
      <StoreDelivery />

      {/* UK Used laptop quality check */}
      <StoreQualityCheck />

      {/* FAQ */}
      <StoreFAQ />

      {/* Need help choosing + contact */}
      <StoreContact />
    </>
  )
}
