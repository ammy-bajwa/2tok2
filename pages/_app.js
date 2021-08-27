import NProgress from "nprogress";
import { useEffect } from "react";
import Router from "next/router";
import IdleTime from "./componets/IdleTime";

import "./styles.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

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
