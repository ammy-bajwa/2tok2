import { children } from "min-document";
import Head from "next/head";
import Script from "next/script";
import Header from "../partails/header";

export async function getServerSideProps({ req }) {
  return {
    props: {
      userName: req.locals?.userName,
      title: req.locals?.title,
    },
  };
}

export default function Index({ userName, title, children }) {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&amp;subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"
          rel="stylesheet"
        />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></Script>
        <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/vue@2"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></Script>
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></Script>
        <Script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></Script>
      </Head>
      <div>
        <div class="wrapper">
          <Header></Header>
          <div>
            <p style="color: white;">
              <center style="color: white;">Hello {userName}</center>
            </p>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
