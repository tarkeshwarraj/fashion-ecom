import React from "react";
import Banner from "../components/Banner";
import Circle from "../components/Circle";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Home = () => {
  return <>
  <Banner />
  <div className="mt-8">
  <Circle/>
  </div>
  <Content />
  <Footer/>
  </>
};

export default Home;
