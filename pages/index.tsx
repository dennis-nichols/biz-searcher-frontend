import type { NextPage } from "next";
import Head from "next/head";
import Welcome from "../components/Welcome";
import Form from "../components/Form";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const backend_base_url = process.env.NEXT_PUBLIC_BACKEND
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Ivan's Biz Searcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <Welcome />

        <Form />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
