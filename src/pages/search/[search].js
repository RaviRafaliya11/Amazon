import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import SingleProduct from "../../components/product/SingleProduct";
import MainTheme from "../../components/theme/MainTheme";
import { db } from "../../firebase/firebase";

export default function SearchPage({ products }) {
  const router = useRouter();
  const SearchProducts = products.filter(
    (item) =>
      item.title.toLowerCase().includes(router.query.search) ||
      item.category.toLowerCase().includes(router.query.search)
  );

  return (
    <MainTheme>
      <h1 className="border-b border-gray-300 py-3 px-5 text-xl font-semibold shadow-xl md:px-10">
        Search :{" "}
        <span className=" text-lg text-gray-500">{router.query.search}</span>
      </h1>

      {SearchProducts.length > 0 ? (
        <div className="mx-auto grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3   xl:grid-cols-4">
          {SearchProducts.map((product) => (
            <SingleProduct product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="my-10 text-center text-xl font-semibold">
          No Results.
        </div>
      )}
    </MainTheme>
  );
}

export async function getServerSideProps() {
  const products = await getDocs(collection(db, "products"));
  const productsData = products.docs.map((doc) => ({
    productId: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      products: productsData,
    },
  };
}
