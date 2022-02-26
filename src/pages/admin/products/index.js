import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import AdminTheme from "../../../components/admin/theme/AdminTheme";
import { db } from "../../../firebase/firebase";
import AdminSingleProduct from "../../../components/admin/product/AdminSingleProduct";

export default function ProductHome({ products }) {
  const router = useRouter();

  return (
    <AdminTheme>
      <div className="flex items-center justify-between border-b border-gray-500 pb-2 md:mb-3">
        <h1 className="text-xl font-semibold">All Products</h1>
        <button
          onClick={() => router.push("/admin/products/Add")}
          className=" cursor-pointer rounded bg-yellow-400 p-2"
        >
          Add Product
        </button>
      </div>
      <div className="mx-auto grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <AdminSingleProduct product={product} />
        ))}
      </div>
    </AdminTheme>
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
