import React, {useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import Layout from '../components/layout';
import styles from '../styles/Stats.module.css';
import { google } from 'googleapis'


export default function StatsPage({ stats }) {
  function Card({ children }) {
  const ref = useRef();
    const [isHovered, setHovered] = useState(false);
    // The useSpring hook
    const [animatedProps, setAnimatedProps] = useSpring(() => {
      return {
        xys: [0, 0, 1],
        config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 },
      };
    });
    return (
      <animated.div
        ref={ref}
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={({ clientX, clientY }) => {
          const x =
            clientX -
            (ref.current.offsetLeft -
              (window.scrollX || window.pageXOffset || document.body.scrollLeft));
          const y =
            clientY -
            (ref.current.offsetTop -
              (window.scrollY || window.pageYOffset || document.body.scrollTop));
          const dampen = 50; // Lower the number the less rotation
          const xys = [
            -(y - ref.current.clientHeight / 2) / dampen, // rotateX
            (x - ref.current.clientWidth / 2) / dampen, // rotateY
            1.07, // Scale
          ];
          setAnimatedProps({ xys: xys });
        }}
        onMouseLeave={() => {
          setHovered(false);
          setAnimatedProps({ xys: [0, 0, 1] });
        }}
        style={{
          zIndex: isHovered ? 2 : 1,
          transform: animatedProps.xys.to(
            (x, y, s) =>
              `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
          ),
        }}
      >
        {children}
      </animated.div>
    );
  }
  
return( 
<Layout>
  <main className={styles.body}>
  <div className={styles.cardcontainer}>
  {stats?.map((player) => {
      var name = player[0]
      var pts = player[1]
      var games = player[2]
      var wins = player[3]
      var loses = player[4]
      var draws = player[5]
      var winrate = player[6]
      var rank = player[7]
      var club = player[19]
      if (club === '-') {club = false}
      return(
        <Card key={name}>
          <div className={styles.container_season}>
            <h1 className={styles.season}>Season 12</h1>
          </div>
          <div className={styles.container_name}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.container_stats}>
            <h3 className={styles.wins}>Победы: {wins}</h3>
            <h3 className={styles.loses}>Поражения: {loses}</h3>
          </div>
          <div className={styles.container_rank}>
            <h2 className={styles.role}>Ранг: {rank}</h2>
            {club && (<h2 className={styles.club}>Club: {club}</h2>)}
          </div>
        </Card>
      )
    })}
    
  </div>


  </main>

  

</Layout>
)}


export async function getStaticProps() {
  // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.DB_KEY,
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly"
  })

  const client = await auth.getClient();

  const sheets = google.sheets({ version: 'v4', auth: client });

  const range = `User Stats!A1:T54`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.DB_ID,
      range,
    });

    const stats = response.data.values;
    stats.shift()
    return { 
        props: {
            stats
        } 
    }
}