import Link from 'next/link';
import Head from 'next/head';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Layout, { siteTitle } from '../components/Layout';
import { getPostsData } from '../lib/post';

import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

type Post = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};

// SSGの場合 (外部からデータを取得)
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getPostsData(); // {id, title, date, thumbnail}
  console.log(allPostsData);

  return {
    props: {
      // コンポーネントに渡すためのprops
      allPostsData,
    },
  };
};

const Home: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>自己紹介欄</p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData!.map(({ id, title, date, thumbnail }: Post) => (
            <article key={id}>
              <Link href={`/posts/${id}`} passHref>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} alt="サムネイル" />
              </Link>
              <Link href={`/posts/${id}`} passHref>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
