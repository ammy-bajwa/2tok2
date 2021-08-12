import Head from "next/head";
import Script from "next/script";
import {useEffect} from 'react';
export async function getServerSideProps({ req }) {
  return {
    props: {
      messages: req.locals?.messages || {},
    },
  };
}
export default function Index({messages}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://www.google.com/recaptcha/api.js?hl=en&amp;render=explicit&amp;onload=recaptchaOnloadCallback";
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
    const script1 = document.createElement("script");
    script1.src = "/assets/8/8f271511da/2de337b0/hideShowPassword.js";
    script1.async = true;
    document.body.appendChild(script1);
    const script4 = document.createElement("script");
    script4.src = "/assets/8/8f271511da/2de337b0/vendor/modernizr.custom.js";
    script4.async = true;
    document.body.appendChild(script4);
    const script5 = document.createElement("script");
    script5.src = "/assets/8/8f271511da/2de337b0/hideShowPassword.js";
    script5.async = true;
    document.body.appendChild(script5);
    const script6 = document.createElement("script");
    script6.src = "/assets/8/8f271511da/f91ab1e1/yii.js";
    script6.async = true;
    document.body.appendChild(script6);
    const script7 = document.createElement("script");
    script7.src = "/assets/8/8f271511da/f91ab1e1/yii.activeForm.js";
    script7.async = true;
    document.body.appendChild(script7);
    const script8 = document.createElement("script");
    script8.src = "/assets/8/8f271511da/32384b8a/js/sweetalert-dev.js";
    script8.async = true;
    document.body.appendChild(script8);
    const script9 = document.createElement("script");
    script9.src = `jQuery(function ($) {jQuery(".password-hide-show").hidePassword(true)});`;
    script9.async = true;
    document.body.appendChild(script9);
  },[])
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-param" content="_csrf-frontend" />
        <meta name="csrf-token" content="NPzieYimaD0zlGsCgmqlkoYbH6aaVmUcLNEzPaDIm14BzYkj38AMclvWOGe6GeHYxEgplNVvOnFAuVcM2I3-ag==" />
        <title>Sign Up | 1Tok1</title>
        <link
          rel="shortcut icon"
          href="/images/faviconfeac.ico?20200226"
          type="/image/x-icon"
        />
        <link
          rel="icon"
          href="/images/faviconfeac.ico?20200226"
          type="/image/vnd.microsoft.icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/apple-touch-icon-57x57feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/apple-touch-icon-60x60feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/apple-touch-icon-72x72feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/apple-touch-icon-76x76feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/apple-touch-icon-114x114feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/apple-touch-icon-120x120feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/apple-touch-icon-144x144feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/apple-touch-icon-152x152feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon-180x180feac.png?20200226"
        />
        <link
          rel="icon"
          type="/image/png"
          href="/images/favicon-16x16feac.png?20200226"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="/image/png"
          href="/images/favicon-32x32feac.png?20200226"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="/image/png"
          href="/images/favicon-96x96feac.html?20200226"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="/image/png"
          href="/images/android-chrome-192x192feac.png?20200226"
          sizes="192x192"
        />
        <meta
          name="msapplication-square70x70logo"
          content="/images/smalltilefeac.html?20200226"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/images/mediumtilefeac.html?20200226"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/images/widetilefeac.html?20200226"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/images/largetilefeac.html?20200226"
        />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="og:title" content="1Tok1 | Sign Up" />
        <meta name="og:description" content="Sign Up for 1Tok1" />
        <meta name="og:url" content="sign-up.html" />
        <meta name="description" content="Sign Up for 1Tok1" />
        <meta name="og:sitename" content="1Tok1" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="index.html" />
        <meta name="og:image" content="/images/og_img.html" />
        <link
          href="/assets/8/8f271511da/2de337b0/css/example.wink.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/32384b8a/css/sweetalert.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/material-design-iconic-font.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/animate.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/csrlive-bootstrap.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/csrlive-core.css"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/csrlive-misc.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&amp;subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"
          rel="stylesheet"
        />
        <link
          href="/assets/8/8f271511da/6c976d13/css/footer_style.css"
          rel="stylesheet"
        />
        
      </Head>
      <div className="simple-page bg-oxygen ">
        <div id="video-bg">
          <div id="container">
            <div className="simple-page-wrap">
              <div className="simple-page-logo">
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
            <div className="footer">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <ul className="list-unstyled footer_menu_list list-inline">
                      <li className="list-inline-item">
                        <a className="nav-link" href="token-sale-agreement.html">
                          Token Sale Agreement
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="nav-link" href="terms-of-use.html">
                          Terms of Use
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="nav-link" href="privacy-policy.html">
                          Privacy Policy
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="nav-link" href="cookie-policy.html">
                          Cookie Policy
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="nav-link" href="disclaimer.html">
                          Disclaimer
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="nav-link" href="support.html">
                          Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="text-center">
                      <p className="copy-rights mb-0">
                        {" "}
                        Copyright 1Tok1 2021 © All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
