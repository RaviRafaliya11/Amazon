import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import MainTheme from "../../components/theme/MainTheme";
import { db } from "../../firebase/firebase";
import SingleProduct from "../../components/product/SingleProduct";

export default function Category({ products }) {
  const router = useRouter();
  return (
    <MainTheme>
      <div className="mx-auto max-w-screen-2xl">
        <div className="mx-1 flex  flex-wrap items-center justify-between gap-5 p-3 sm:mx-3">
          <p className="text-xs font-semibold capitalize sm:text-sm md:text-lg">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => router.push(`/category/`)}
            >
              Category
            </span>
            {` > `} {router.query.category}
          </p>
          <p> About {products.length} results</p>
        </div>
        {products.length > 0 ? (
          <div className="mx-auto grid min-h-screen grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <SingleProduct product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="my-10 flex justify-center text-lg font-semibold">
            <p> {router.query.category} products are coming soon.</p>
          </div>
        )}
      </div>
    </MainTheme>
  );
}

export async function getServerSideProps({ params }) {
  const products = await getDocs(
    query(
      collection(db, "products"),
      where("category", "==", `${params.category}`)
    )
  );
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
