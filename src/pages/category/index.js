import { collection, getDocs } from "firebase/firestore";
import MainTheme from "../../components/theme/MainTheme";
import { db } from "../../firebase/firebase";
import { useRouter } from "next/router";

export default function Category({ categories }) {
  const router = useRouter();
  return (
    <MainTheme>
      <div className="flex items-center justify-between border-b border-gray-500 p-2 md:pb-3">
        <h1 className="text-xl font-semibold">All Category</h1>
      </div>

      <div className="mx-1.5 my-5 flex flex-wrap items-center justify-evenly gap-5 sm:p-5 md:gap-y-10 md:p-10">
        {categories.map((category) => (
          <div className=" rounded-xl bg-white p-2 shadow-2xl md:p-3">
            <div className="group relative cursor-pointer overflow-hidden">
              <div
                onClick={() => router.push(`/category/${category.name}`)}
                className="absolute -z-10 flex h-full w-full scale-100 items-center justify-center bg-black/70 group-hover:z-10 group-hover:scale-100"
              >
                <p className="rounded bg-white/50 px-2.5 py-1.5 text-lg font-semibold text-white">
                  View Products
                </p>
              </div>

              <img
                src={category.image}
                className="h-72 rounded-md object-fill transition-all duration-500 ease-in-out group-hover:scale-125"
              />
            </div>
            <div className="mt-2 text-center text-lg font-semibold capitalize">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </MainTheme>
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
