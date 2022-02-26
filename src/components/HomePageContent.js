import Banner from "./Banner";
import ProductContainer from "./product/ProductContainer";

export default function HomePageContent({ products }) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      {/* banner */}
      <Banner />

      {/* products */}

      <ProductContainer products={products} />
    </div>
  );
}
