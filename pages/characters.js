import {useRef, useState, useEffect} from 'react';
import Layout from '../components/layout';
import styles from '../styles/Characters.module.css';
import Link from 'next/link'
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";

export default function CharactersPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [filter, setFilter] = useState('');

  let { data: characters } = useQuery(
    ["characters"],
    async () =>
      await fetch(
        `./db/characters.json`
      ).then((result) => result.json())
      .then(data => data.characters)
  );

  characters = characters?.filter(z => z.role.includes(`${filter}`))

  useEffect(() => {  
    if (router.query.filter) {
      setFilter(router.query.filter);
    }
  }, [router.query.filter]);

  function supFilter() {
    if(filter !== 'Поддержка'){
    setFilter('Поддержка')
    router.push(`?filter=Поддержка`, undefined, { shallow: true });
  }
    else{setFilter(''); router.push(``, undefined, { shallow: true });}
}

  function defFilter() {
    if(filter !== 'Защитник'){
    setFilter('Защитник')
    router.push(`?filter=Защитник`, undefined, { shallow: true });
  }
    else{setFilter(''); router.push(``, undefined, { shallow: true });}
}

return( 
<Layout>
  <main className={styles.center}>
    <div className="btn-group d-flex" role="group" aria-label="Basic outlined example">
      <button className="btn btn-outline-primary" onClick={supFilter}>Поддержка</button>
      <button className="btn btn-outline-primary" onClick={defFilter}>Защитники</button>
    </div>
    <div className={styles.tavern}>
    {characters?.map((item) => {
      return(
        <Link key={item.id} href={`/characters/${item.id}`}><a className={styles.tooltip}><img src={`/Characters/${item.image}.png`} alt={item.image}/><span className={styles.tooltiptext}>{`Сложность: `+item.difficulty}</span></a></Link>
      )
    })}

    </div>
  </main>

  

</Layout>
)}