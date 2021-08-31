import NProgress from "nprogress";
import { useEffect } from "react";
import Router from "next/router";
import IdleTime from "./componets/IdleTime";
import { ToastContainer } from "react-toastify";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <IdleTime {...pageProps} />
      <Component {...pageProps} />
    </>
  );
};
export default App;
