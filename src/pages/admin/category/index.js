import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import AdminTheme from "../../../components/admin/theme/AdminTheme";
import { db, storage } from "../../../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";

export default function CategoryHome({ categories }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteCategory = async (id) => {
    if (loading) return;
    setLoading(true);
    await deleteDoc(doc(db, "categories", `${id}`));
    const desertRef = ref(storage, `categories/${id}/image`);
    await deleteObject(desertRef);
    setLoading(false);
    router.push("/admin/category");
  };

  return (
    <AdminTheme>
      <div className="flex items-center justify-between border-b border-gray-500 pb-2 md:mb-3">
        <h1 className="text-xl font-semibold">All Category</h1>
        <button
          onClick={() => router.push("/admin/category/add")}
          className=" cursor-pointer rounded bg-yellow-400 p-2"
        >
          Add Category
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-5">
        {categories.map((category) => (
          <div onClick={() => router.push(`/admin/category/${category.name}`)}>
            <div className="cursor-pointer overflow-hidden">
              <img
                src={category.image}
                className="h-56 w-56 rounded-md object-cover transition-all duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <div className="my-2 flex items-center justify-between text-lg font-semibold capitalize">
              <p>{category.name}</p>
              <AiFillDelete
                className="mr-1 h-5 w-5 cursor-pointer text-red-400"
                onClick={() => deleteCategory(category.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminTheme>
  );
}

export async function getServerSideProps() {
  const categories = await getDocs(collection(db, "categories"));
  const categoriesData = categories.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      categories: categoriesData,
    },
  };
}
