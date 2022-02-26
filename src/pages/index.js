import HomePageContent from "./../components/HomePageContent";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import MainTheme from "../components/theme/MainTheme";

export default function Home({ products }) {
  return (
    <MainTheme>
      <HomePageContent products={products} />
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
