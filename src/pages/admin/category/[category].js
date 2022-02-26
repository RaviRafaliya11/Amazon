import AdminTheme from "../../../components/admin/theme/AdminTheme";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { db, storage } from "../../../firebase/firebase";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import AdminSingleProduct from "../../../components/admin/product/AdminSingleProduct";

export default function CategoryDetail({ products }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const DeleteProduct = async (id) => {
    if (loading) return;
    setLoading(true);
    await deleteDoc(doc(db, "products", `${id}`));
    const desertRef = ref(storage, `products/${id}/image`);
    await deleteObject(desertRef);
    setLoading(false);
    router.push(`/admin/category/${router.query.category}`);
  };
  return (
    <AdminTheme>
      <div className="mx-1 flex  flex-wrap items-center justify-between gap-5 p-3 sm:mx-3">
        <p className="text-xs font-semibold capitalize sm:text-sm md:text-lg">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push(`/admin/category/`)}
          >
            Category
          </span>
          {` > `} {router.query.category}
        </p>
        <p> About {products.length} results</p>
      </div>

      <div className="mx-auto grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <AdminSingleProduct product={product} />
        ))}
      </div>
    </AdminTheme>
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
