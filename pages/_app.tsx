import React from 'react';
import App, { AppContext } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

class MyApp extends App {
  static async getInitialProps (ctx: AppContext) {
    return {
      pageProps: ctx.Component.getInitialProps
        ? await ctx.Component.getInitialProps(ctx.ctx)
        : {}
    };
  };

  public render () {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  };
};

export default MyApp;

const GlobalStyle = createGlobalStyle`
  ${reset}
`;
