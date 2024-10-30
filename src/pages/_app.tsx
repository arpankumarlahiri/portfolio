import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../Chakra/theme";
import Layout from "../components/Layout/Layout";
import { RecoilRoot } from "recoil";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const discData = {
    title: "Sengoku Social",
    description: "A personal website by Arpan Kumar Lahiri",
    coverimage: "images/samurailogo.png",
  };

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Head>
          <title>{discData.title}</title>
          <meta name="description" content={discData.description} />
          <meta property="og:image" content={discData.coverimage} />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
