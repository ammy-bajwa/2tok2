
import Head from "next/head";
import Script from "next/script";
import Header from "./partails/header";
import {useEffect} from 'react';

export default function Index({ userName, title,isAdmin, children }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";
    script.async = true;
    document.body.appendChild(script);
    const script2 = document.createElement("script");
    script2.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    script2.async = true;
    document.body.appendChild(script2);
    const script3 = document.createElement("script");
    script3.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    script3.async = true;
    document.body.appendChild(script3);
    const script1 = document.createElement("script");
    script1.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
    script1.async = true;
    document.body.appendChild(script1);
  },[])
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
      </Head>
      <div>
        <div className="wrapper">
          <Header title={title} isAdmin={isAdmin}></Header>
          <div>
            <p style={{color: '#fff',textAlign:'center',marginTop:20}}>
             Hello {userName}
            </p>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
