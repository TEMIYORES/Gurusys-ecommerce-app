import React from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

const Home: React.FC = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <ProductList />
    </div>
  );
};

export default Home;
