import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiStar } from "react-icons/hi";
import { Fade } from "react-reveal";
import { auth, db, storage } from "../../../firebase/firebase";

export default function AdminSingleProduct({ product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const DeleteProduct = async (id) => {
    if (auth.currentUser.email === !product.ownerEmail) return;
    if (loading) return;
    setLoading(true);
    await deleteDoc(doc(db, "products", `${id}`));
    const desertRef = ref(storage, `products/${id}/image`);
    await deleteObject(desertRef);
    setLoading(false);
    router.push("/admin/products");
  };

  return (
    <Fade>
      <div className="relative z-30 m-1 flex flex-col rounded bg-white p-10 shadow-xl sm:m-2 ">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">
          {product.category}
        </p>
        <img
          className="h-[200px] w-[200px] object-contain"
          src={product.image}
        />
        <div>
          <h4 className="line-clamp-2 my-3">{product.title}</h4>
        </div>
        <div className="flex ">
          {Array(Math.round(product.ratings.rating))
            .fill()
            .map((_, i) => (
              <HiStar key={i} className="h-5 w-5 text-yellow-500" />
            ))}
        </div>

        <p className="line-clamp-2 my-2 text-xs">{product.description}</p>
        <div className="mb-5">{product.price}</div>
        {product.prime && (
          <div className="mb-2 flex items-center justify-between space-x-2">
            <img
              className="h-8 w-8 object-contain"
              src="/Amazon_Prime.svg"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Delivery</p>
          </div>
        )}

        {auth?.currentUser && (
          <div
            className={`mt-auto flex w-full flex-wrap justify-between gap-5 ${
              auth.currentUser.email === product.ownerEmail ? "" : "hidden"
            } `}
          >
            <button
              className="amazon_button"
              onClick={() =>
                router.push(`/admin/products/${product.productId}`)
              }
            >
              Edit
            </button>
            <button
              className="amazon_delete_button"
              onClick={() => DeleteProduct(product.productId)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Fade>
  );
}
