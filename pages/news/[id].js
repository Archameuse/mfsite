import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Layout from "../../components/layout";
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/Article.module.css'
import BBcode from 'bbcode'
import JsxParser from 'react-jsx-parser'


export default function Article() {

  const router = useRouter()
  const aid= router.query
  let { status, error, data: Article } = useQuery(
    ["Article", aid],
    async () =>
      await fetch(
        `https://infrequent-maroon-prepared.glitch.me/news?_page=${aid.id}&_limit=1`
      ).then((result) => result.json()),
  );

  if (status === 'loading') {
    return <Layout><h1>Loading, if takes too long try refresh page</h1></Layout>
  } else if (status === 'error') {
    return <Layout><h1>Error : {error.message}</h1></Layout>
  }
  return( 
    <Layout>
    <div className={styles.body}>
    {Article?.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <div className={styles.text}>
              <h6>
                <JsxParser jsx={BBcode.parse(item.body)}/>
              </h6>
            </div>
          </div>
        );
      })}
    </div>
    </Layout>
  )
}