import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { useForm } from "react-hook-form";
import AdminTheme from "../../../components/admin/theme/AdminTheme";
import { auth, db, storage } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function ProductDetail({ product, categories }) {
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === product.ownerEmail) {
        } else {
          router.back();
        }
      }
    });
  }, [auth.currentUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (renderEvent) => {
      setSelectedFile(renderEvent.target.result);
    };
  };

  const editProduct = async (data) => {
    if (loading) return;
    setLoading(true);

    await updateDoc(doc(db, "products", `${router.query.id}`), {
      description: data.description,
      price: data.price,
      ratings: { rating: data.Rating, count: data.Count },
      title: data.title,
      category: data.Category,
      prime: data.Prime,
    });
    if (selectedFile) {
      const desertRef = ref(storage, `products/${router.query.id}/image`);
      await deleteObject(desertRef);
      const imageRef = ref(storage, `products/${router.query.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "products", `${router.query.id}`), {
            image: downloadURL,
          });
        }
      );
    }
    setLoading(false);
    router.push("/admin/products");
  };

  return (
    <AdminTheme>
      <div className="flex items-center justify-between border-b border-gray-500 pb-2">
        <h1 className="text-xl font-semibold">Edit Product</h1>
        <button
          onClick={() => router.push("/admin/products")}
          className=" cursor-pointer rounded bg-red-400 p-2"
        >
          Cancel
        </button>
      </div>
      <form
        onSubmit={handleSubmit(editProduct)}
        className="mx-auto my-10 flex flex-col gap-5 lg:max-w-2xl"
      >
        <div className="flex flex-col">
          <label className="formlabel">Title</label>
          <input
            className="forminput"
            type="text"
            placeholder="Title"
            defaultValue={product.title}
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && <span className="formerror">Invalid Title.</span>}
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Price</label>
          <input
            className="forminput"
            type="number"
            placeholder="Price"
            defaultValue={product.price}
            {...register("price", { required: true })}
          />
          {errors.price && <span className="formerror">Invalid Price.</span>}
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Description</label>
          <textarea
            className="forminput"
            rows={3}
            type="text"
            placeholder="Enter Description"
            defaultValue={product.description}
            {...register("description", { required: true })}
          />{" "}
          {errors.description && (
            <span className="formerror">Invalid Description.</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label className="formlabel">Rating</label>
            <input
              className="forminput"
              type="number"
              step="any"
              placeholder="Rating"
              {...register("Rating", {
                required: true,
                value: product.ratings.rating,
                min: 0,
                max: 5,
              })}
            />
            {errors.Rating && (
              <span className="formerror">Rating must be between 0 to 5..</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="formlabel">Total Count</label>
            <input
              className="forminput"
              type="number"
              placeholder="Count"
              {...register("Count", {
                required: true,
                value: product.ratings.count,
              })}
            />
            {errors.Count && <span className="formerror">Invalid Count.</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Category</label>
          <select
            defaultValue={product.category}
            className="forminput"
            {...register("Category", {
              required: true,
            })}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={`${cat.name}`}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.Category && (
            <span className="formerror">Invalid Category.</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Prime</label>
          <input
            defaultValue={product.Prime}
            type="checkbox"
            className="mt-3 h-5 w-5"
            {...register("Prime")}
          />
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Image</label>
          {selectedFile ? (
            <img
              className="mt-1 h-56 w-56 cursor-pointer object-contain"
              src={selectedFile}
              onClick={() => setSelectedFile(null)}
              alt=""
            />
          ) : (
            <FcAddImage
              className="h-20 w-20  cursor-pointer "
              onClick={() => filePickerRef.current.click()}
            />
          )}

          <input
            ref={filePickerRef}
            type="file"
            hidden
            accept="image/png, image/gif, image/jpeg"
            onChange={addImageToPost}
          />
        </div>

        <input
          type="submit"
          value={loading ? "Loading..." : "Submit"}
          className="forminput cursor-pointer bg-yellow-400"
        />
      </form>
    </AdminTheme>
  );
}

export async function getServerSideProps({ params }) {
  const product = await getDoc(doc(db, "products", `${params.id}`));
  const productsData = product.data();

  const categories = await getDocs(collection(db, "categories"));
  const categoriesData = categories.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      product: productsData,
      categories: categoriesData,
    },
  };
}
