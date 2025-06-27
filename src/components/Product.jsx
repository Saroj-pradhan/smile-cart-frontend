import React, { useEffect, useState } from "react";

import { Spinner } from "@bigbinary/neetoui";
import { Typography } from "neetoui";
import { isNotNil, append } from "ramda";

import productsApi from "./apis/products";
import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      const product = await productsApi.show();
      console.log(product);
      setProduct(product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full  items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { name, mrp, description, offerPrice, imageUrls, imageUrl } = product;
  const discountedPrice = mrp - offerPrice;
  const discountedPercentage = ((discountedPrice / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography component="p" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel
                imageUrls={append(imageUrl, imageUrls)}
                title="Infinix Inbook"
              />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography component="p">{description}</Typography>
          <Typography component="p"> MRP: {mrp}</Typography>
          <Typography component="p" weight="semibold">
            Offer price: {product.offerPrice}
          </Typography>
          <Typography
            className="text-green-300"
            component="p"
            weight="semibold"
          >
            {discountedPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
