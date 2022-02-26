import AdminTheme from "../../../components/admin/theme/AdminTheme";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/firebase";
import { FcAddImage } from "react-icons/fc";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function AddProduct({ categories }) {
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
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

  const addProduct = async (data) => {
    if (loading || !selectedFile) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "products"), {
      description: data.Description,
      price: data.Price,
      ratings: { rating: 0, count: 0 },
      title: data.Title,
      category: data.Category,
      prime: data.Prime,
      ownerEmail: auth.currentUser.email,
      ownerDetails: {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    });
    const imageRef = ref(storage, `products/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "products", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setLoading(false);
    toast.success("Product Added", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    router.push("/admin/products");
  };

  return (
    <AdminTheme>
      {" "}
      <ToastContainer />
      <div className="flex items-center justify-between border-b border-gray-500 pb-2">
        <h1 className="text-xl font-semibold">Add Product</h1>
        <button
          onClick={() => router.push("/admin/products")}
          className=" cursor-pointer rounded bg-red-400 p-2"
        >
          Cancel
        </button>
      </div>
      <form
        onSubmit={handleSubmit(addProduct)}
        className="mx-auto my-10 flex flex-col gap-5 lg:max-w-2xl"
      >
        <div className="flex flex-col">
          <label className="formlabel">Title</label>
          <input
            className="forminput"
            type="text"
            placeholder="Title"
            {...register("Title", {
              required: true,
            })}
          />
          {errors.Title && <span className="formerror">Invalid Title.</span>}
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Price</label>
          <input
            className="forminput"
            type="number"
            placeholder="Price"
            {...register("Price", { required: true })}
          />
          {errors.Price && <span className="formerror">Invalid Price.</span>}
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Description</label>
          <textarea
            className="forminput"
            rows={3}
            type="text"
            placeholder="Enter Description"
            {...register("Description", { required: true })}
          />{" "}
          {errors.Description && (
            <span className="formerror">Invalid Description.</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Category</label>
          <select
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
        </div>

        <div className="flex flex-col">
          <label className="formlabel">Prime</label>
          <input
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

export async function getServerSideProps(req) {
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
