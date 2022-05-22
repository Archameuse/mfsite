import {useRef, useEffect, useState} from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import { useQuery, useQueryClient } from "react-query";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import styles from '../styles/News.module.css'
import Link from 'next/link';

export default function NewsPage() {

  const queryClient = useQueryClient();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  let limit = 4;

  let { status, error, data: maxPages } = useQuery(
    ["maxPages"],
    async () =>
      await fetch(
        `https://infrequent-maroon-prepared.glitch.me/news`
      ).then((result) => result.json())
  );

  maxPages = maxPages?.filter(z => z.tag.includes(`${filter}`))
  let amountArticles = maxPages?.length
  let evaluate = amountArticles-(page*limit)

  let { data: articlesLeft } = useQuery(
    ["articlesL", page, filter],
  async () => articlesLeft = [evaluate + 3, evaluate + 1].map(x=>maxPages[x]).filter(y => y !== undefined),
    {
      enabled: !!maxPages,
      keepPreviousData: true,
    }
  );

  let { data: articlesRight } = useQuery(
    ["articlesR", page, filter],
  async () => articlesRight = [evaluate + 2, evaluate].map(x=>maxPages[x]).filter(y => y !== undefined),
    {
      enabled: !!maxPages,
      keepPreviousData: true,
    }
  );

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`?page=${value}&filter=${filter}`, undefined, { shallow: true });
  }

  useEffect(() => {  
    if (router.query.filter) {
      setFilter(router.query.filter);
    }
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, [router.query.page]);

    var amountPages
    if (maxPages?.length) {
      amountPages = Math.ceil(maxPages?.length / limit)
    }
    else {
      amountPages = 1
    }

    function changelogFilter() {
      setFilter('changelog')
      router.push(`?page=${page}&filter=changelog`, undefined, { shallow: true });
    }
  
    function eventsFilter() {
      setFilter('events')
      router.push(`?page=${page}&filter=events`, undefined, { shallow: true });
    }
  
    function newsFilter() {
      setFilter('news')
      router.push(`?page=${page}&filter=news`, undefined, { shallow: true });
    }
  
    function removeFilter() {
      setFilter('all')
      router.push(`?page=${page}&filter=all`, undefined, { shallow: true });
    }


    
if (status === 'loading') {
  return <Layout><h1>Loading, if takes too long try refresh page</h1></Layout>
} else if (status === 'error') {
  return <Layout><h1>Error : {error.message}</h1></Layout>
}

return( 
<Layout>
  <main>
    <div className="btn-group d-flex" role="group" aria-label="Basic outlined example">
      <button className="btn btn-outline-primary" onClick={changelogFilter}>Изменения</button>
      <button className="btn btn-outline-primary" onClick={eventsFilter}>События</button>
      <button className="btn btn-outline-primary" onClick={newsFilter}>Новости</button>
      <button className="btn btn-outline-primary" onClick={removeFilter}>Убрать фильтр</button>
    </div>
    <div className={styles.center}>

      <div>
        {articlesLeft?.map((item) => {
            return (
              <Link key={item.id} href={`/news/${item.id}`}><a><div className={styles.box}>
                      <h6 className={styles.Heading}>
                        {item.name}
                      </h6>
                      <p className={styles.Description}>
                        {item.descr}
                      </p>
              </div></a></Link>
            );
          })}
        </div>
        <div>
        {articlesRight?.map((item) => {
          return (
            <Link key={item.id} href={`/news/${item.id}`}><a><div className={styles.box}>
                    <h6 className={styles.Heading}>
                      {item.name}
                    </h6>
                    <p className={styles.Description}>
                      {item.descr}
                    </p>
            </div></a></Link>
          );
        })}
        </div>
      </div>
      <div className={styles.paginationblock}>
      <Pagination
        count={amountPages}
        variant='outlined'
        color='primary'
        className='page'
        page={page}
        onChange={handlePaginationChange}
      />
      </div>
  </main>

  

</Layout>
)}