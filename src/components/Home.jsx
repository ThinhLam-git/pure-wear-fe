import React from "react";
import Slider from "./common/Slider";
import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";
import Layout from "./common/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Slider />

        <LatestProducts />

        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Home;
