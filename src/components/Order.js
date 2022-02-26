import moment from "moment";

export default function Order({ order }) {
  console.log(order);
  return (
    <div className="relative rounded-md border">
      <div className="flex space-x-5 bg-gray-200 py-10 text-sm text-gray-600">
        <div>
          <p className="font-semibold">Order Placed</p>
          <p>{moment.unix(order.timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">Total</p>
          <p>
            {order.amount} -Next Day Delivery {order.amountShipping}
          </p>
        </div>
        <p className="flex-1 self-end whitespace-nowrap text-right text-sm text-blue-500 sm:text-xl">
          {order.items.length} Items
        </p>
        <p className="absolute top-2 right-2 w-40 truncate whitespace-nowrap text-xs lg:w-72">
          ORDER #{order.id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
