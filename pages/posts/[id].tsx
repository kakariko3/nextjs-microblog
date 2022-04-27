import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { getAllPostIds, getPostData } from '../../lib/post';
import Layout from '../../components/Layout';

import utilStyles from '../../styles/utils.module.css';

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

interface Post {
  blogContentHTML: string;
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}

interface Props {
  postData: Post;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<Params>) => {
  const postData = await getPostData(params!.id);

  return {
    props: {
      postData,
    },
  };
};

const Post: NextPage<Props> = ({ postData }) => {
  console.log(postData);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
};

export default Post;
