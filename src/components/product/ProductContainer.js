import SingleProduct from "./SingleProduct";

export default function ProductContainer({ products }) {
  return (
    <div className="mx-auto grid grid-flow-row-dense md:-mt-52 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <SingleProduct product={product} key={product.productId} />
      ))}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <SingleProduct product={product} key={product.productId} />
        ))}
      </div>
      {products.slice(5, 15).map((product) => (
        <SingleProduct product={product} key={product.productId} />
      ))}
      <img
        className="mx-auto md:col-span-full"
        src="https://m.media-amazon.com/images/I/51nZ09u5BHL.jpg"
        alt=""
      />
      {products.slice(15, products.length).map((product) => (
        <SingleProduct product={product} key={product.productId} />
      ))}
    </div>
  );
}
