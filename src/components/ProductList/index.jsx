import { useEffect, useState, useCallback } from "react";

import productsApi from "components/apis/products";
import Header from "components/commons/Header";
import { Spinner } from "neetoui";

import ProductListItem from "./ProductListItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const { products } = await productsApi.fetch();
      setProducts(products);
      console.log(products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // ✅ No warning now

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header shouldShowBackButton={false} title="Smile Cart" />
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
