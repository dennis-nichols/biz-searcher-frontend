import type { NextPage } from "next";
import Head from "next/head";
import Welcome from "../components/Welcome";
import Form from "../components/Form";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <Head>
        <title>Ivan's Biz Searcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <Welcome />

        <Form backendBaseUrl={process.env.NEXT_PUBLIC_BACKEND!} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
