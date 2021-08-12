import Head from "next/head";
import {useEffect} from 'react';
export async function getServerSideProps({ req }) {
  return {
    props: { messages: req.locals?.messages || {} },
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
        <meta
          name="csrf-token"
          content="1NnNFoTsqxbr5PWnyaUIhmlXmqL_-JWotWVJKkHhR_zh6KZM04rPWYOmpsLx1kzMKwSskLDBysXZDS0bOaQiyA=="
        />
        <title>Login | 1Tok1</title>

        <link
          rel="shortcut icon"
          href="/images/faviconfeac.ico?20200226"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="/images/faviconfeac.ico?20200226"
          type="image/vnd.microsoft.icon"
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
          type="image/png"
          href="/images/favicon-16x16feac.png?20200226"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-32x32feac.png?20200226"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-96x96feac.html?20200226"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
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
        <meta name="og:title" content="1Tok1 | Login" />
        <meta name="og:description" content="Login to 1Tok1" />
        <meta name="og:url" content="login.html" />
        <meta name="description" content="Login to 1Tok1" />
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
      <div className="simple-page bg-oxygen">
        <div id="video-bg">
          <div id="container">
            <div className="simple-page-wrap">
              <div className="simple-page-logo">
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
                      <label className="control-label" for="loginform-rememberme">
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
