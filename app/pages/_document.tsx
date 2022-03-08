/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="IE=edge"/>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />

          <meta name="copyright" content="© 2021- KHJcode(Hyungjin Kim)" />
          <meta name="theme-color" content="#000000" />
          <meta name="language" content="ko"/>
          <meta name="robots" content="noindex, nofollow"/>

          <meta property="og:email" content="to@khjcode.com" />
          <meta property="og:type" content="music" />

          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,800;0,900;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        <script src={"https://www.youtube.com/iframe_api"}/>
        <script src="https://unpkg.com/type-hangul"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `TypeHangul.type('#recommend_text', { intervalType: 90, humanize: 0.5 })`,
          }}
        />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
