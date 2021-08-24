import Script from "next/script";
import { useEffect } from "react";
import MainHead from "./componets/MainHead";
import Navbar from "./componets/Navbar";
import HomeSection from "./componets/HomeSection";
import WorkProcessSection from "./componets/WorkProcessSection";
import Footer from "./componets/Footer";
export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default function Index({}) {
  useEffect(() => {
    fetch("/api/logs/get")
      .then((data) => data.json())
      .then(console.log);
  }, []);

  return (
    <div>
      <MainHead />
      <div>
        <Navbar />
        {/*<!-- Home Section Start--> */}
        <HomeSection />
        {/*<!-- Home Section End--> */}

        {/*<!-- Work Process --> */}
        <WorkProcessSection />
        {/*<!-- Start Footer --> */}
        <Footer />
        {/*<!-- End Footer --> */}

        <Script src="assets/8/8f271511da/cfd4ba49/jquery.js"></Script>
        {/* <Script src="assets/8/8f271511da/f91ab1e1/yii.js"></Script> */}
        <Script src="assets/8/8f271511da/32384b8a/js/sweetalert-dev.js"></Script>
        <Script src="assets/8/8f271511da/315641f9/js/popper.min.js"></Script>
        {/* <Script src="assets/8/8f271511da/315641f9/js/bootstrap.min.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/owl.carousel.min.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/jquery.magnific-popup.min.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/scrollspy.min.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/jquery.easing.min.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/jquery.simple-text-rotator.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/custom.js"></Script> */}
        {/* <Script src="assets/8/8f271511da/315641f9/js/bootstrap.offcanvas.js"></Script> */}
      </div>
    </div>
  );
}
