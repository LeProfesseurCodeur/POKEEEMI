import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";
import Header from "../Components/Header";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          { this.props.emotionStyleTags }
        </Head>
        <body>
          <Header />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}