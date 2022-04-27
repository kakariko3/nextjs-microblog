import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from './Layout.module.css';
import utilStyles from '../styles/utils.module.css';

interface Props {
  children: ReactNode;
  home?: boolean;
}

export const siteTitle = 'Next.js blog';
const name = 'Test Code';

const Layout = ({ children, home }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
              alt="プロフィール"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img src="/images/profile.png" className={utilStyles.borderCircle} alt="プロフィール" />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
