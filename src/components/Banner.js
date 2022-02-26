import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-gray-100 to-transparent" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        stopOnHover={false}
        transitionTime={1000}
        interval={3000}
      >
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/71mAkIfn4uL._SX3000_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/71W-v2R0bAL._SX3000_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/71zjz6cTIeL._SX3000_.jpg"
            alt=""
          />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" alt="" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" alt="" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/7ma" alt="" />
        </div>
      </Carousel>
    </div>
  );
}
