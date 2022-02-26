import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function MainTheme(props) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <div className="min-h-screen w-full bg-gray-200">{props.children}</div>
      <Footer />
    </div>
  );
}
