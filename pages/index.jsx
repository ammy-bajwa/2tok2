import Head from "next/head";
import Script from "next/script";
export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default function Index({}) {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-param" content="_csrf-frontend" />
        <meta
          name="csrf-token"
          content="JVpbnb_kLlwwqKoaw6LxmSiCcCZDRYxWZXNnVWdT8IsQazDH6IJKE1jq-X_70bXTatFGFAx80zsJGwNkHxaVvw=="
        />
        <title>1Tok1 | 1Tok1</title>

        <link
          rel="shortcut icon"
          href="images/faviconfeac.ico?20200226"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="images/faviconfeac.ico?20200226"
          type="image/vnd.microsoft.icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="images/apple-touch-icon-57x57feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="images/apple-touch-icon-60x60feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="images/apple-touch-icon-72x72feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="images/apple-touch-icon-76x76feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="images/apple-touch-icon-114x114feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="images/apple-touch-icon-120x120feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="images/apple-touch-icon-144x144feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="images/apple-touch-icon-152x152feac.png?20200226"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="images/apple-touch-icon-180x180feac.png?20200226"
        />
        <link
          rel="icon"
          type="image/png"
          href="images/favicon-16x16feac.png?20200226"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="images/favicon-32x32feac.png?20200226"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="images/favicon-96x96feac.html?20200226"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="images/android-chrome-192x192feac.png?20200226"
          sizes="192x192"
        />
        <meta
          name="msapplication-square70x70logo"
          content="images/smalltilefeac.html?20200226"
        />
        <meta
          name="msapplication-square150x150logo"
          content="images/mediumtilefeac.html?20200226"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="images/widetilefeac.html?20200226"
        />
        <meta
          name="msapplication-square310x310logo"
          content="images/largetilefeac.html?20200226"
        />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="index.html" />
        <meta property="og:title" content="CSR.live | 1Tok1" />
        <meta property="og:description" content="1Tok1" />
        <meta name="description" content="1Tok1" />
        <meta name="og:sitename" content="1Tok1" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="index.html" />
        <meta name="og:image" content="images/og_img.html" />
        <link
          href="assets/8/8f271511da/32384b8a/css/sweetalert.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&amp;subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/magnific-popup.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/owl.carousel.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/owl.theme.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/owl.transitions.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/materialdesignicons.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/animate.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/style.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/csrlive-core.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/landing-bootstrap.css"
          rel="stylesheet"
        />
        <link
          href="assets/8/8f271511da/315641f9/css/bootstrap.offcanvas.css"
          rel="stylesheet"
        />
      </Head>
      <div class="">
        {/*<!-- START NAVBAR --> */}
        <nav class="navbar navbar-expand-md fixed-top custom_nav_menu sticky">
          <div class="container">
            {/*<!-- LOGO --> */}
            <a class="navbar-brand logo">
              {/*<!-- <img src="images/csr-live-logo-4.svg" alt="" class="img-fluid logo-light">
                <img src="images/csr-live-logo-4.svg" alt="" class="img-fluid logo-dark"> --> */}
              <h4 style={{ color: "white" }}>1Tok1</h4>
            </a>

            <button
              class="navbar-toggler offcanvas-toggle"
              type="button"
              data-toggle="offcanvas"
              data-target="#js-bootstrap-offcanvas"
              aria-controls="js-bootstrap-offcanvas"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="mdi mdi-menu"></i>
            </button>
            <div
              class="navbar-offcanvas navbar-offcanvas-touch"
              id="js-bootstrap-offcanvas"
            >
              <div class="offcanvas-brand">
                <div class="container">
                  <a class="navbar-brand logo">
                    {/*<!-- <img src="images/csr-live-logo-4.svg" alt="" class="img-fluid logo-light">
                            <img src="images/csr-live-logo-4.svg" alt="" class="img-fluid logo-dark"> --> */}
                    <h4 style={{ color: "white" }}>1Tok1</h4>
                  </a>
                </div>
              </div>
              <ul class="navbar-nav ml-auto landing-navbar-dropdown">
                {/*<!-- <li class="nav-item">
                        <a class="nav-link" href="exchange.html">Markets</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://csrnow.com/" target="_blank">More Info</a>
                    </li> --> */}
                <li class="nav-item">
                  <a class="nav-link" href="/user/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/user/login">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/*<!-- END NAVBAR --> */}
        {/*<!-- Home Section Start--> */}
        <section class="full_height_100vh_home" id="home">
          <div class="home_table_cell absolue-hero-overlay">
            <div class="home_table_cell_center">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="text-center">
                      <h1 class="home_title text-white mx-auto text-capitalize mb-0">
                        <div class="simple-text-rotate">
                          Secure & Easy Way to Trade
                        </div>
                      </h1>
                      <div class="home_text_details">
                        <p class="home_subtitle mt-3 mx-auto mb-0">
                          Unordinary digital agency crafting sophisticated and
                          eccentric stuff that will leave you speechless{" "}
                        </p>
                      </div>
                      <div class="home_btn_manage mt-4">
                        <a
                          class="btn btn-default btn_custom mr-3"
                          href="/user/login"
                        >
                          Login
                        </a>
                      </div>
                      <div class="home_recent_trades mx-auto mb-0 mt-5">
                        <div id="w0" class="grid-view">
                          <table class="table table-dark">
                            <thead>
                              <tr>
                                <th>Symbol</th>
                                <th>
                                  <span class="hidden-sm-down">Last Price</span>
                                  <span class="hidden-md-up">Last</span>
                                </th>
                                <th>
                                  <span class="hidden-sm-down">24H Change</span>
                                  <span class="hidden-md-up">Change</span>
                                </th>
                                <th class="d-none d-md-table-cell">24H High</th>
                                <th class="d-none d-md-table-cell">24H Low</th>
                                <th>
                                  <span class="hidden-sm-down">24H Volume</span>
                                  <span class="hidden-md-up">Volume</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr data-key="0">
                                <td>CSR/CWMEUR</td>
                                <td>€0</td>
                                <td>
                                  <span class="text-success">0.0%</span>
                                </td>
                                <td class="d-none d-md-table-cell">€0</td>
                                <td class="d-none d-md-table-cell">€0.0000</td>
                                <td>€0.0000</td>
                              </tr>
                              <tr data-key="1">
                                <td>CSR/USDT</td>
                                <td>€0</td>
                                <td>
                                  <span class="text-success">0.0%</span>
                                </td>
                                <td class="d-none d-md-table-cell">€0</td>
                                <td class="d-none d-md-table-cell">€0.0000</td>
                                <td>€0.0000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="row recent-trade-row">
                          <div class="col-12 col-lg-4">
                            <div class="recent-trades-item">
                              <div class="recent-trades-volume-data">€0</div>
                              <div class="recent-trades-volume-title">
                                24 Hour Volume
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-lg-4">
                            <div class="recent-trades-item">
                              <div class="recent-trades-volume-data">€0</div>
                              <div class="recent-trades-volume-title">
                                7 Day Volume
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-lg-4">
                            <div class="recent-trades-item">
                              <div class="recent-trades-volume-data">€0</div>
                              <div class="recent-trades-volume-title">
                                30 Day Volume
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll_down">
            <a href="#why" class="scroll">
              <i class="mdi mdi-chevron-double-down text-white"></i>
            </a>
          </div>
        </section>
        {/*<!-- Home Section End--> */}

        {/*<!-- Work Process --> */}
        <section class="section_all bg-light" id="about-us">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <h4 class="section-title" id="why" style={{ fontSize: 44 }}>
                  {" "}
                  Why choose 1Tok1?{" "}
                </h4>
                <div class="section-title-border mx-auto"></div>
                <p class="text-muted pt-2 section-subtitle mx-auto">
                  1Tok1 is a cryptocurrency trading platform focused on
                  Corporate Social Responsibility and the CSR Token for anyone
                  and everyone. We focus on providing the highest level of
                  security, transparency, and customer service.{" "}
                </p>
                <p class="text-muted pt-2 section-subtitle mx-auto">
                  Our aim is to provide our users with a reliable and secure
                  exchange.{" "}
                </p>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-lg-4">
                <div class="how_it_work_box p-4 mt-3">
                  <div class="process_icon text-center">
                    <i class="text_custom mdi mdi-security"></i>
                  </div>
                  <div class="text-center pt-3">
                    <h5 class="text-capitalize font-weight-bold">
                      Security first
                    </h5>
                    <p class="text-muted pt-2">
                      We value your trust and bring you best in class security,
                      including 2FA, cold storage, encrypted wallets, live
                      backups, Captcha and much more.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="how_it_work_box p-4 mt-3">
                  <div class="process_icon text-center">
                    <i class="text_custom mdi mdi-buffer"></i>
                  </div>
                  <div class="text-center pt-3">
                    <h5 class="text-capitalize font-weight-bold">
                      Robust trading
                    </h5>
                    <p class="text-muted pt-2">
                      Trade your precious assets hassel free with our easy to
                      use User-Interface backed by strong battle-hardened,
                      community tested code and encrypted transactions.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="how_it_work_box p-4 mt-3">
                  <div class="process_icon text-center">
                    <i class="text_custom mdi mdi-phone"></i>
                  </div>
                  <div class="text-center pt-3">
                    <h5 class="text-capitalize font-weight-bold">
                      Full-time support
                    </h5>
                    <p class="text-muted pt-2">
                      Get your queries resolved with 24 * 7 365 days support
                      from our team of dedicated experts with a tailor made
                      personalise experience.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-lg-4">
                <div class="how_it_work_box p-4 mt-3">
                  <div class="process_icon text-center">
                    <i class="text_custom mdi mdi-rocket"></i>
                  </div>
                  <div class="text-center pt-3">
                    <h5 class="text-capitalize font-weight-bold">
                      High spending limits
                    </h5>
                    <p class="text-muted pt-2">
                      With high spending limits at 1Tok1 we enable you to put
                      more money on trades hence maximize your chances of
                      profits.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="how_it_work_box p-4 mt-3">
                  <div class="process_icon text-center">
                    <i class="text_custom mdi mdi-clock-fast"></i>
                  </div>
                  <div class="text-center pt-3">
                    <h5 class="text-capitalize font-weight-bold">
                      Fast track verification
                    </h5>
                    <p class="text-muted pt-2">
                      We believe in zero latency when it's about money. We get
                      KYCs verified quickly to let customers trade soon after
                      signing up.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="how_it_work_box p-4 mt-3">
                  <div class="process_icon text-center">
                    <i class="text_custom mdi mdi-apps"></i>
                  </div>
                  <div class="text-center pt-3">
                    <h5 class="text-capitalize font-weight-bold">
                      Simple & lightweight API
                    </h5>
                    <p class="text-muted pt-2">
                      Developers can use our API to integrate trade, volumes and
                      rates from 1Tok1 in their applications and websites.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- Start Footer --> */}
        <footer class="footer_section footer_detail footer_background">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <ul class="list-unstyled footer_menu_list list-inline">
                  <li class="list-inline-item">
                    <a class="nav-link" href="token-sale-agreement.html">
                      Token Sale Agreement
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="nav-link" href="terms-of-use.html">
                      Terms of Use
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="nav-link" href="privacy-policy.html">
                      Privacy Policy
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="nav-link" href="cookie-policy.html">
                      Cookie Policy
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="nav-link" href="disclaimer.html">
                      Disclaimer
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="nav-link" href="support.html">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="text-center">
                  <p class="copy-rights mb-0">
                    {" "}
                    Copyright 1tok1 2021 © All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
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
