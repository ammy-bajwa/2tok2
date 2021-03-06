import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserLoginHead from "../componets/UserLoginHead";
import Footer from "../componets/Footer";
import LoginForm from "../componets/LoginForm";
import { sendForgetPasswordEmail } from "../../api/user";
import { COMPANY_TITLE } from "../../constants/company";
import { validateEmail } from "../../helpers/email";

export async function getServerSideProps({ req }) {
  return {
    props: { messages: req.locals?.messages || {} },
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
  const [email, setEmail] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const handleForgetPassword = () => {
    setDisabled(true);
    if (!email || !validateEmail(email)) {
      toast.error("Error No Valid Email !!");
      setDisabled(false);
    } else if (validateEmail(email)) {
      sendForgetPasswordEmail(email)
        .then(({ success, message }) => {
          if (success) {
            toast.success(message);
          } else {
            toast.error("Error in sending password reset email !!");
            setDisabled(false);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error in sending password reset email !!");
          setDisabled(false);
        });
    } else {
      toast.error("Error in sending password reset email!!");
      setDisabled(false);
    }
  };
  return (
    <div>
      <UserLoginHead />
      <div className="simple-page bg-oxygen">
        <div id="video-bg">
          <div className="h-90 overflow">
            <div className="simple-page-wrap h-100">
              <div className="simple-page-logo text-dark">
                <a>
                  <h1>{COMPANY_TITLE}</h1>
                </a>
              </div>

              <div className="simple-page-form" id="login-form">
                <h1 className="text-center mb-20">Login</h1>
                <LoginForm setEmail={setEmail} />
                <div style={{ height: 20 }}></div>
                {messages?.error && (
                  <div className="alert alert-danger" role="alert">
                    {" "}
                    {messages?.error}{" "}
                  </div>
                )}
              </div>
              <div className="simple-page-footer text-dark">
                <p>
                  <span
                    className={`on_hover ${isDisabled && "text-muted"}`}
                    title="Forgot your password? Change it here!"
                    onClick={() => {
                      if (!isDisabled) {
                        handleForgetPassword();
                      }
                    }}
                  >
                    Forgot your password?
                  </span>
                </p>
                <p>
                  <small className="text-dark">Don't have an account ?</small>
                  <a
                    className="text-dark"
                    href="/user/register"
                    title="Sign up here!"
                  >
                    Sign up here!
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
