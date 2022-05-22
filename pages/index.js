import {useRef, useState} from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";



import { Autoplay, EffectFade } from "swiper";


export default function MainPage() {
  
return( 
<Layout>

  <main className={styles.center}>
    <video className={styles.video} autoPlay loop muted>
      <source src='./Videos/mfforsite.mp4'/>
    </video>
  </main>

  <Swiper
        spaceBetween={5}
        effect={"fade"}
        loop={true}
        modules={[EffectFade, Autoplay]}
        allowTouchMove={false}
        centeredSlides={true}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={styles.slider}
      >
        <SwiperSlide style={{ backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div style={{ position: 'relative' }}>
            <h1 className={styles.h1}>Magic Football</h1>
            <p className={styles.p1}>Это динамичная карта для Warcraft III, примите на себя роль одного из более чем 30 уникальных персонажей, список которых всё ещё пополняется, вы можете быть мобильным форвардом, стойким вратарём, или же, игроком поддержки/защиты</p>
            <h1 className={styles.h2}>Более трёх уникальных режима</h1>
            <p className={styles.p2}>Помимо основного режима 5х5 в карте так же присутствуют особые режимы, -OS убирающий из игры вратарей и форвардов, -OF режим который наоборот ограничивает выбор персонажей до вратаря и форвардов и многие другие о которых вы можете узнать в нашем сообществе</p>
            <h1 className={styles.h3}>Присоединяйтесь к нам</h1>
            <p className={styles.p3}>Следите за картой, участвуйте в её развитии и различных турнирах и событиях посвящённых ней в <a href="https://www.discord.gg/HrCrcVV">Discord,</a> <a href="https://vk.com/magicfootball">VK</a> и <a href="https://iccup.com/community/1008-magic_football.html">ICCup</a></p>
            <img src="./vr.png" alt="goalkeepers"/>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div style={{ position: 'relative' }}>
            <h1 className={styles.h1}>Magic Football</h1>
            <p className={styles.p1}>Это динамичная карта для Warcraft III, примите на себя роль одного из более чем 30 уникальных персонажей, список которых всё ещё пополняется, вы можете быть мобильным форвардом, стойким вратарём, или же, игроком поддержки/защиты</p>
            <h1 className={styles.h2}>Более трёх уникальных режима</h1>
            <p className={styles.p2}>Помимо основного режима 5х5 в карте так же присутствуют особые режимы, -OS убирающий из игры вратарей и форвардов, -OF режим который наоборот ограничивает выбор персонажей до вратаря и форвардов и многие другие о которых вы можете узнать в нашем сообществе</p>
            <h1 className={styles.h3}>Присоединяйтесь к нам</h1>
            <p className={styles.p3}>Следите за картой, участвуйте в её развитии и различных турнирах и событиях посвящённых ней в <a href="https://www.discord.gg/HrCrcVV">Discord,</a> <a href="https://vk.com/magicfootball">VK</a> и <a href="https://iccup.com/community/1008-magic_football.html">ICCup</a></p>
            <img src="./sup.png" alt="supports"/>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div style={{ position: 'relative' }}>
            <h1 className={styles.h1}>Magic Football</h1>
            <p className={styles.p1}>Это динамичная карта для Warcraft III, примите на себя роль одного из более чем 30 уникальных персонажей, список которых всё ещё пополняется, вы можете быть мобильным форвардом, стойким вратарём, или же, игроком поддержки/защиты</p>
            <h1 className={styles.h2}>Более трёх уникальных режима</h1>
            <p className={styles.p2}>Помимо основного режима 5х5 в карте так же присутствуют особые режимы, -OS убирающий из игры вратарей и форвардов, -OF режим который наоборот ограничивает выбор персонажей до вратаря и форвардов и многие другие о которых вы можете узнать в нашем сообществе</p>
            <h1 className={styles.h3}>Присоединяйтесь к нам</h1>
            <p className={styles.p3}>Следите за картой, участвуйте в её развитии и различных турнирах и событиях посвящённых ней в <a href="https://www.discord.gg/HrCrcVV">Discord,</a> <a href="https://vk.com/magicfootball">VK</a> и <a href="https://iccup.com/community/1008-magic_football.html">ICCup</a></p>
            <img src="./fw.png" alt="forwards"/>
          </div>
        </SwiperSlide>
    </Swiper>

</Layout>
)}