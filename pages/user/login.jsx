import { useEffect } from "react";
import UserLoginHead from "../componets/UserLoginHead";
import Footer from "../componets/Footer";

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
  return (
    <div>
      <UserLoginHead />
      <div className="simple-page bg-oxygen">
        <div id="video-bg">
          <div id="container">
            <div className="simple-page-wrap h-100">
              <div className="simple-page-logo text-light">
                <a>
                  <h1>1Tok1</h1>
                </a>
              </div>

              <div className="simple-page-form" id="signup-form">
                <h1 className="text-center mb-20">Login</h1>
                <form id="login-form" method="post" autocomplete="off">
                  <input
                    type="hidden"
                    name="_csrf-frontend"
                    value="1NnNFoTsqxbr5PWnyaUIhmlXmqL_-JWotWVJKkHhR_zh6KZM04rPWYOmpsLx1kzMKwSskLDBysXZDS0bOaQiyA=="
                  />
                  <div className="form-group field-loginform-username required">
                    <input
                      type="email"
                      id="loginform-username"
                      className="form-control"
                      name="email"
                      tabindex="1"
                      placeholder="Email"
                      aria-required="true"
                    />

                    <p className="help-block help-block-error"></p>
                  </div>
                  <div className="form-group field-loginform-password required">
                    <input
                      type="password"
                      id="loginform-password"
                      className="password-hide-show form-control"
                      name="password"
                      tabindex="2"
                      placeholder="Password"
                      aria-required="true"
                    />

                    <p className="help-block help-block-error"></p>
                  </div>
                  <div className="form-group m-b-xl field-loginform-rememberme">
                    <div className="checkbox">
                      <input
                        type="hidden"
                        name="LoginForm[rememberMe]"
                        value="0"
                      />
                      <input
                        type="checkbox"
                        id="loginform-rememberme"
                        name="LoginForm[rememberMe]"
                        value="1"
                      />
                      <label
                        className="control-label"
                        for="loginform-rememberme"
                      >
                        Remember me
                      </label>
                      <p className="help-block help-block-error"></p>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary input-100"
                    name="login-button"
                    value="Log In"
                  ></input>
                </form>
                <div style={{ height: 20 }}></div>
                {messages.error && (
                  <div className="alert alert-danger" role="alert">
                    {" "}
                    {messages.error}{" "}
                  </div>
                )}
              </div>
              <div className="simple-page-footer">
                <p>
                  <a title="Forgot your password? Change it here!">
                    Forgot your password?
                  </a>
                </p>
                <p>
                  <small>Don't have an account ?</small>
                  <a href="/user/register" title="Sign up here!">
                    Sign up here!
                  </a>
                </p>
              </div>
            </div>

            <Footer isBottom />
          </div>
        </div>
      </div>
    </div>
  );
}
