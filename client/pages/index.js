import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import Layout from "../layout/layout";
import styles from "../styles/Home.module.css";


const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem("CurrentUser")){
      router.push('/login')
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NEXT-JS WITH Chat APP</title>
        <meta name="description" content="CHAT APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center min-h-screen grid items-center">
        <Layout/>
      </div>
    </div>
  );
};

export default Home;
