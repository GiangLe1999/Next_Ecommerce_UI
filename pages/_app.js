import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import CartContextProvider from "@/store/cart-context";
import { createGlobalStyle } from "styled-components";
import Layout from "@/components/Layout/Layout";

const GlobalStyles = createGlobalStyle`
  *{
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  }

  body {
    background-color: #eee;
    padding: 0;
    margin: 0;

    a {
      text-decoration:none;
    }
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyles />
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </SessionProvider>
  );
}
