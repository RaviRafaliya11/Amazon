import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import AdminTheme from "../../../components/admin/theme/AdminTheme";
import { db, storage } from "../../../firebase/firebase";

export default function AddCategory() {
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (renderEvent) => {
      setSelectedFile(renderEvent.target.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || loading || !name) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "categories"), {
      name: name,
    });
    const imageRef = ref(storage, `categories/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "categories", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setLoading(false);
    router.push("/admin/category");
  };
  return (
    <AdminTheme>
      <div className="flex items-center justify-between border-b border-gray-500 pb-2">
        <h1 className="text-xl font-semibold">Add Category</h1>
        <button
          onClick={() => router.push("/admin/category")}
          className=" cursor-pointer rounded bg-red-400 p-2"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="my-5 mx-auto flex max-w-xl flex-col gap-5"
      >
        <div className="flex flex-col">
          <label className="formlabel">Name</label>
          <input
            type="text"
            className="forminput"
            required
            onChange={(e) => setName(e.target.value.trim())}
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
            required
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
