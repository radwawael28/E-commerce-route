import React from 'react';
import styles from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import MainSlider from '../MainSlider/MainSlider';
import CategriesSlider from '../CatigoriesSlider/CategriesSlider';

export default function Home() {



  return <>
  <MainSlider/>
  <CategriesSlider/>
    <FeaturedProducts/>
  </>
}
