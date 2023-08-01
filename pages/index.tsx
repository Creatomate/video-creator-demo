import Head from 'next/head';
import dynamic from 'next/dynamic';

const VideoCreator = dynamic(() => import('../components/VideoCreator'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Video Creator</title>
        <meta name="description" content="Demo of a video creator app for the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VideoCreator />
    </div>
  );
}
