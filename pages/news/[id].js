import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Layout from "../../components/layout";
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/Article.module.css'
import BBcode from 'bbcode'
import JsxParser from 'react-jsx-parser'


export default function article() {
  const router = useRouter()
  const aid= router.query
  let { data: Article } = useQuery(
    ["Article", aid],
    async () =>
      await fetch(
        `https://infrequent-maroon-prepared.glitch.me/news?_page=${aid.id}&_limit=1`
      ).then((result) => result.json()),
  );
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