import React from "react";
import App, { AppContext } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Menu from "../components/Menu";

const isBrowser = typeof window !== "undefined";

if (!isBrowser) {
  import("isomorphic-fetch");
}

const client = new ApolloClient({
  ssrMode: !isBrowser,
  link: createHttpLink({
    uri: "https://us-central1-portforlio-a9f8c.cloudfunctions.net/apollo"
  }),
  cache: new InMemoryCache()
});

class MyApp extends App {
  static async getInitialProps(ctx: AppContext) {
    return {
      pageProps: ctx.Component.getInitialProps
        ? await ctx.Component.getInitialProps(ctx.ctx)
        : {}
    };
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ApolloProvider client={client}>
          <MenuWrap>
            <Menu />
          </MenuWrap>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default MyApp;

const GlobalStyle = createGlobalStyle`
  ${reset}
  img {
    width: 100%;
  }
`;

const MenuWrap = styled.div`
  position: fixed;
  left: 20px;
  z-index: 99999;
`;
