import Head from "next/head";
import { COMPANY_PAGE_TITLE, COMPANY_TITLE } from "../../constants/company";

export default function Index() {
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="csrf-param" content="_csrf-frontend" />
      <meta
        name="csrf-token"
        content="JVpbnb_kLlwwqKoaw6LxmSiCcCZDRYxWZXNnVWdT8IsQazDH6IJKE1jq-X_70bXTatFGFAx80zsJGwNkHxaVvw=="
      />
      <title>{COMPANY_PAGE_TITLE}</title>;
      <link
        rel="shortcut icon"
        href="images/faviconfeac.ico?20200226"
        type="image/x-icon"
      />
      <link
        rel="icon"
        href="images/faviconfeac.ico?20200226"
        type="image/vnd.microsoft.icon"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="images/apple-touch-icon-57x57feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="images/apple-touch-icon-60x60feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="images/apple-touch-icon-72x72feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="images/apple-touch-icon-76x76feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="images/apple-touch-icon-114x114feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="images/apple-touch-icon-120x120feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="images/apple-touch-icon-144x144feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="images/apple-touch-icon-152x152feac.png?20200226"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="images/apple-touch-icon-180x180feac.png?20200226"
      />
      <link
        rel="icon"
        type="image/png"
        href="images/favicon-16x16feac.png?20200226"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="images/favicon-32x32feac.png?20200226"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="images/favicon-96x96feac.html?20200226"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/png"
        href="images/android-chrome-192x192feac.png?20200226"
        sizes="192x192"
      />
      <meta
        name="msapplication-square70x70logo"
        content="images/smalltilefeac.html?20200226"
      />
      <meta
        name="msapplication-square150x150logo"
        content="images/mediumtilefeac.html?20200226"
      />
      <meta
        name="msapplication-wide310x150logo"
        content="images/widetilefeac.html?20200226"
      />
      <meta
        name="msapplication-square310x310logo"
        content="images/largetilefeac.html?20200226"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="index.html" />
      <meta property="og:title" content={`CSR.live | ${COMPANY_TITLE}`} />
      <meta property="og:description" content={COMPANY_TITLE} />
      <meta name="description" content={COMPANY_TITLE} />
      <meta name="og:sitename" content={COMPANY_TITLE} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="index.html" />
      <meta name="og:image" content="images/og_img.html" />
      <link
        href="assets/8/8f271511da/32384b8a/css/sweetalert.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&amp;subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/magnific-popup.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/owl.carousel.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/owl.theme.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/owl.transitions.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/materialdesignicons.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/animate.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/style.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/csrlive-core.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/landing-bootstrap.css"
        rel="stylesheet"
      />
      <link
        href="assets/8/8f271511da/315641f9/css/bootstrap.offcanvas.css"
        rel="stylesheet"
      />
    </Head>
  );
}
