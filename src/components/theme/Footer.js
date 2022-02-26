import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#131921] text-white">
      <div className="grid grid-cols-1 gap-5 bg-[#232F3E] p-10 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h1 className="footerdiv mb-2 text-lg font-bold"> Get to Know Us </h1>

          <p className="footer_items">About Us</p>
          <p className="footer_items">Careers</p>
          <p className="footer_items">Press Releases</p>
          <p className="footer_items">Amazon Cares</p>
          <p className="footer_items">Gift a Smile</p>
        </div>

        <div>
          <h1 className="mb-3 text-lg font-bold">Connect with Us </h1>

          <p className="footer_items">Facebook</p>
          <p className="footer_items">Twitter</p>
          <p className="footer_items">Instagram</p>
        </div>

        <div>
          <h1 className="mb-3 text-lg font-bold">Make Money with Us </h1>

          <p className="footer_items">Sell on Amazon</p>
          <p className="footer_items">Sell under Amazon Accelerator</p>
          <p className="footer_items">Amazon Global Selling</p>
          <p className="footer_items">Become an Affiliate</p>
          <p className="footer_items">Fulfilment by Amazon</p>
          <p className="footer_items">Advertise Your Products</p>
          <p className="footer_items">Amazon Pay on Merchants</p>
        </div>

        <div>
          <h1 className="mb-3 text-lg font-bold"> Let Us Help You </h1>

          <p className="footer_items">COVID-19 and Amazon</p>
          <p className="footer_items">Your Account</p>
          <p className="footer_items">Returns Centre</p>
          <p className="footer_items">100% Purchase Protection</p>
          <p className="footer_items">Amazon App Download</p>
          <p className="footer_items">Amazon Assistant Download</p>
          <p className="footer_items">Help</p>
        </div>
      </div>
      <div className="my-5 flex items-center justify-center">
        <Image
          src="/AmazonWhite.png"
          width={76}
          height={23}
          objectFit="contain"
          className="cursor-pointer"
        />
      </div>
      <div className="pb-3 text-center text-xs">
        © 2021 Ravi Rafaliya&trade;
      </div>
    </div>
  );
}
