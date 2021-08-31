import { useEffect } from "react";
import UserRegisterHead from "../componets/UserRegisterHead";
import Footer from "../componets/Footer";
import RegisterForm from "../componets/RegisterForm";
import { COMPANY_TITLE } from "../../constants/company";

export async function getServerSideProps({ req }) {
  return {
    props: {
      messages: req.locals?.messages || {},
    },
  };
}
export default function Index({ messages }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "http://www.google.com/recaptcha/api.js?hl=en&amp;render=explicit&amp;onload=recaptchaOnloadCallback";
    script.async = true;
    document.body.appendChild(script);
    const script2 = document.createElement("script");
    script2.src = "/assets/8/8f271511da/cfd4ba49/jquery.js";
    script2.async = true;
    document.body.appendChild(script2);
    const script3 = document.createElement("script");
    script3.src = "/assets/8/8f271511da/2de337b0/vendor/modernizr.custom.js";
    script3.async = true;
    document.body.appendChild(script3);

    const script4 = document.createElement("script");
    script4.src = "/assets/8/8f271511da/2de337b0/vendor/modernizr.custom.js";
    script4.async = true;
    document.body.appendChild(script4);

    const script8 = document.createElement("script");
    script8.src = "/assets/8/8f271511da/32384b8a/js/sweetalert-dev.js";
    script8.async = true;
    document.body.appendChild(script8);
    const script9 = document.createElement("script");
    script9.src = `jQuery(function ($) {jQuery(".password-hide-show").hidePassword(true)});`;
    script9.async = true;
    document.body.appendChild(script9);
  }, []);
  return (
    <div>
      <UserRegisterHead />
      <div className="simple-page bg-oxygen">
        <div id="video-bg">
          <div className="h-90 overflow">
            <div className="simple-page-wrap">
              <div className="simple-page-logo text-dark">
                <a>
                  <h1>{COMPANY_TITLE}</h1>
                </a>
              </div>

              <div className="simple-page-form" id="registration">
                <h1>Sign up for a new account</h1>
                <RegisterForm messages={messages} />
              </div>
              <div className="simple-page-footer">
                <p>
                  <small className="text-dark">Do you have an account ?</small>
                  <a className="text-dark" href="/user/login">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
          <Footer isBottom />
        </div>
      </div>
    </div>
  );
}
