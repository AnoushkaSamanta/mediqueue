import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import BookYourDoctorSection from '@/components/BookYourDoctorSection';
import FindPharmacySection from '@/components/FindPharmacySection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TextSection from '@/components/HomePageTextSection';
import Footer from '@/components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>MediQueue - Skip the line, not your health</title>
        <meta name="description" content="Book doctor appointments digitally and find pharmacies easily" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar/>
        <HeroSection/>
        <HowItWorksSection/>
        <BookYourDoctorSection/>
        <FindPharmacySection/>
        <WhyChooseUsSection/>
        <TextSection/>
        <Footer/>
      </main>
    </>
  );
};

export default HomePage;