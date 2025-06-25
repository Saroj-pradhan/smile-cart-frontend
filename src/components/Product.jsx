import { Typography } from "neetoui";

const Product = () => (
  <div className="px-6 pb-6">
    <div>
      <Typography component="p" style="h1">
        Infinix INBOOK
      </Typography>
      <hr className="border-2 border-black" />
    </div>
    <div className="mt-6 flex gap-4">
      <div className="w-2/5">
        <img
          alt="Product"
          className="h-64 w-10/12"
          src="https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg"
        />
      </div>
      <div className="w-3/5 space-y-4">
        <Typography component="p">
          Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year Warranty.
        </Typography>
        {/* <p>
          Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year Warranty.
        </p> */}
        <Typography component="p"> MRP: $395.97</Typography>
        <Typography component="p" weight="semibold">
          Offer price: $374.43
        </Typography>
        <Typography className="text-green-300" component="p" weight="semibold">
          6% off
        </Typography>
      </div>
    </div>
  </div>
);

export default Product;
