import Head from 'next/head';
import PostList from './components/Cards.component'

export default function Home() {
  return (
    <>
    <Head>
      <title>Welcome to my blog!</title>
    </Head>
    <PostList />
    </>
  );
}