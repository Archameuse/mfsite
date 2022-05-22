import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/layout";
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/Character.module.css'
import { PieChart } from 'react-minimal-pie-chart';
import { Tooltip } from "@mui/material";

export default function character() {
  const router = useRouter()
  const { cid } = router.query

  let { data: character } = useQuery(
    ["character", cid],
    async () =>
      await fetch(
        `/db/characters.json`
      ).then((result) => result.json())
      .then(data => data = data.characters[cid-1])
  );


  let { data: abilities } = useQuery(
    ["abilities", cid],
    async () => abilities = character.abilities,
      {
            enabled: !!character
      }
  );

  return( 
    <Layout>
    <div className={styles.body}>
        <div className={styles.bigimagebox}><img src={`/Characters/Big/${character?.image}.png`} alt={character?.image}/></div>
        <div className={styles.role}><h4>{character?.role}</h4></div>
        <div className={styles.namebar}>
          <h1>{character?.name}</h1>
          <div className={styles.difficultychart}>
            <PieChart
            data={[
              { title: "Сложность: " + character?.difficulty + "/5", value: character?.difficulty, color: '#C13C37' },
              { value: (5 - character?.difficulty), color: '#0' },
            ]}
            />
          </div>
        </div>
        <div className={styles.descr}><h4>{character?.descr}</h4></div>
        <div className={styles.abilities}><h1>Способности</h1></div>
        {abilities?.map((item) => {
          let extension
          if (item.cd !== false && typeof item.cd !== 'string') {
            item.cd = "Перезарядка: " + item.cd + " секунд"
          } 
          if (item.name === "Путь") {extension = "gif"}
          else {extension = "png"}
            return(
              <Tooltip
                key={item.code}
                enterDelay={1000}
                followCursor='true'
                placement='top'
                title={<img className={styles.tooltip} src={`/Characters/abilities/gif/${character?.image}/${item.code}.gif`} alt={character?.image}/>}
              >
                <div className={styles.ability}>
                  <div className={styles.imagebox}>
                    <img src={`/Characters/abilities/${character?.image}/${item.code}.${extension}`} alt={character?.image}/>
                  </div>
                  <div className={styles.textbox}>
                    <h1>{item.name + ' (' + item.code + ') '}</h1>
                    <h2>{item.descr}</h2>
                    <h3>{item.cd}</h3>
                  </div>
                </div>
              </Tooltip>
            )
        })}
                <div className={styles.abilities}><h1>Особый талант: {character?.talent}</h1></div>
    </div>
    </Layout>
  )
}