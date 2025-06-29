import React, { useEffect, useState } from "react";

import { Header, PageNotFound, PageLoader } from "components/commons";
import { Typography } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

import productsApi from "../apis/products";

const Product = () => {
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  const fetchProduct = async () => {
    try {
      const product = await productsApi.show(slug);
      console.log(product);
      setProduct(product);
    } catch (error) {
      setIsError(true);
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
      // <div className="flex h-screen w-full  items-center justify-center">
      //   <Spinner />
      // </div>
      <PageLoader />
    );
  }

  if (isError) return <PageNotFound />;
  const { name, mrp, description, offerPrice, imageUrls, imageUrl } = product;
  const discountedPrice = mrp - offerPrice;
  const discountedPercentage = ((discountedPrice / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center">
        {/* <LeftArrow
          className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
          onClick={history.goBack}
        /> */}
        <Header title={name} />
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
