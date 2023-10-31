import React from 'react';
import Footer from './components/footer';
import Header from "./components/Header";
import { useProductContext } from './context/ProductContext'; 

export const About = () => {

  const { myname } = useProductContext(); 
  const data = {
    name: 'KahreedLou!'
  };

  return (
    <>
      {myname}
      <Header mydata={data} />
      <br />
      <Footer />
    </>
  )
}

export default About;
