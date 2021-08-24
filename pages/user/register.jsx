import { useEffect } from "react";
import UserRegisterHead from "../componets/UserRegisterHead";
import Footer from "../componets/Footer";

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
      <div className="simple-page bg-oxygen ">
        <div id="video-bg">
          <div className="h-90 overflow">
            <div className="simple-page-wrap">
              <div className="simple-page-logo text-light">
                <a>
                  <h1>1Tok1</h1>
                </a>
              </div>

              <div className="simple-page-form" id="registration">
                <h1>Sign up for a new account</h1>
                <form id="registration-form" method="post" autocomplete="off">
                  <input
                    type="hidden"
                    name="_csrf-frontend"
                    value="NPzieYimaD0zlGsCgmqlkoYbH6aaVmUcLNEzPaDIm14BzYkj38AMclvWOGe6GeHYxEgplNVvOnFAuVcM2I3-ag=="
                  />
                  <div className="form-group field-registrationform-email required">
                    <input
                      type="text"
                      id="registrationform-userName"
                      className="form-control"
                      name="username"
                      placeholder="Full Name"
                      aria-required="true"
                    />
                    <p className="help-block help-block-error"></p>
                  </div>
                  <div className="form-group field-registrationform-email required">
                    <input
                      type="email"
                      id="registrationform-email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      aria-required="true"
                    />
                    <p className="help-block help-block-error"></p>
                  </div>
                  <div className="form-group field-registrationform-password required">
                    <input
                      type="password"
                      id="registrationform-password"
                      className="password-hide-show form-control"
                      name="password"
                      placeholder="Password"
                      aria-required="true"
                    />
                    <p className="help-block help-block-error"></p>
                  </div>
                  <div className="form-group field-registrationform-password_confirm required">
                    <input
                      type="password"
                      id="registrationform-password_confirm"
                      className="password-hide-show form-control"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      aria-required="true"
                    />
                    <p className="help-block help-block-error"></p>
                  </div>
                  <div className="form-group field-registrationform-terms required">
                    <div className="checkbox">
                      <input
                        type="hidden"
                        name="RegistrationForm[terms]"
                        value="0"
                      />
                      <input
                        type="checkbox"
                        id="registrationform-terms"
                        name="RegistrationForm[terms]"
                        value="1"
                        aria-required="true"
                      />
                      <label for="registrationform-terms">
                        I have read and accept the{" "}
                        <a
                          className="underline"
                          href="terms-of-use.html"
                          target="_blank"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                    <p className="help-block help-block-error"></p>
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary input-100 "
                    name="login-button"
                    value="Sign up"
                  ></input>
                  {messages.error && (
                    <div className="alert alert-danger" role="alert">
                      {messages.error}
                    </div>
                  )}
                </form>
              </div>
              <div className="simple-page-footer">
                <p>
                  <small>Do you have an account ?</small>
                  <a href="/user/login">Log in</a>
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
