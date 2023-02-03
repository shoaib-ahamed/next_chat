import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const Home = () => {
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
