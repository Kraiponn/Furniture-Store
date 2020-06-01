import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";

function Home({ products }) {
  // name, price, description, sku, mediaUrl
  return (
    <ProductList products={products} />
  );
}

export const getStaticProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products`
  const response = await axios.get(url);
  // console.log(response.data);

  return {
    props: {
      products: response.data
    }
  };
};

export default Home;
