import React from "react";
import App, { AppContext } from "next/app";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

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
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default MyApp;

const GlobalStyle = createGlobalStyle`
  ${reset}
`;
