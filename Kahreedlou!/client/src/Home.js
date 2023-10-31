import React from 'react'
import Services from './components/services';
import Trusted from './components/trusted';
import Footer from './components/footer';
import Feature from './components/feature';
import MediumCarousel from './Caresol';
import OurTeam from './components/OurTeam';
 const Home = () => {
    const data={
        name:'Ostore'
    };
  return (
    <>
    <br/>
    <MediumCarousel />
    <br/>    
    <Feature />
    <br/>
    <Services/>
    <br/>
    <Trusted />
    <br/>
    <OurTeam />
    <br/>
    <Footer />
  
    </>
  )
}
export default Home;