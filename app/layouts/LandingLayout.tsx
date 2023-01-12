import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants/config";

const LandingLayout: React.FC = ({children}) => (
  <>
    <Global
      styles={css`
        * {
          touch-action: manipulation;
          font-family: "Roboto", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
        }
      `}
    />
    <Head>
      <link href={META.favicon} rel="icon" />
      <link href={META.appleicon} rel="apple-touch-icon" />
      <link href={META.url} rel="canonical" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <title>{META.title}</title>
      <meta content={META.theme} name="theme-color" />
      <meta content={META.description} name="description" />
      <meta content={META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={META.twitter} name="twitter:site" />
      <meta content={META.twitter} name="twitter:creator" />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=G-6TBQVG5P7V`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6TBQVG5P7V');`,
                  }}
      />
      <script
        // dangerouslySetInnerHTML={{
        //   __html: `!function(f,b,e,v,n,t,s)
        //   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        //   n.queue=[];t=b.createElement(e);t.async=!0;
        //   t.src=v;s=b.getElementsByTagName(e)[0];
        //   s.parentNode.insertBefore(t,s)}(window, document,'script',
        //   'https://connect.facebook.net/en_US/fbevents.js');
        //   fbq('init', '${tenant.pixel}');
        //   fbq('track', 'PageView');`,
        // }}
      />
      <noscript
        // dangerouslySetInnerHTML={{
        //   __html: `<img height="1" width="1" style="display:none"
        //   src="https://www.facebook.com/tr?id=${tenant.pixel}&ev=PageView&noscript=1" />`,
        // }}
      />
      <meta content={META.title} name="twitter:title" />
      <meta content={META.description} name="twitter:description" />
      <meta content={META.banner?.url} property="twitter:image" />
      <meta content={META.author} property="og:site_name" />
      <meta content={META.url} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content={META.title} property="og:title" />
      <meta content={META.description} property="og:description" />
      <meta content={META.banner?.url} property="og:image" />
      <meta content={META.banner?.url} property="og:image:url" />
      <meta content={META.banner?.format} property="og:image:type" />
      <meta content={META.banner?.width} property="og:image:width" />
      <meta content={META.banner?.height} property="og:image:height" />
      <meta content={META.title} property="og:image:alt" />
    </Head>
    {children}
  </>
);

export default LandingLayout;
