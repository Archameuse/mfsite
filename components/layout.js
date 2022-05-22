import styles from '../styles/layout.module.css'
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
        <Head>
         <title>Magic Football</title>
         <link rel='icon' href='/favicon.ico' />
        </Head>
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>logo</li>
                    <li><Link href="/"><a>главная</a></Link></li>
                    <li><Link href="/characters"><a>персонажи</a></Link></li>
                    <li><Link href="/stats"><a>статистика</a></Link></li>
                    <li><Link href="/news"><a>новости</a></Link></li>
                </ul>
            </nav>
        </header>
        {children}
    </div>
  )
}