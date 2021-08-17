import NProgress from "nprogress";
import { useEffect } from "react";
import Router from "next/router";
import "./styles.css";
import IdleTime from "./componets/IdleTime";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <>
      <IdleTime {...pageProps} />
      <Component {...pageProps} />
    </>
  );
};
export default App;
