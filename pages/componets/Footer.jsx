export default function Index({ isBottom }) {
  return (
    <footer
      className="footer_section footer_detail footer_background"
      style={{
        bottom: "0px",
        position: isBottom ? "relative" : "absolute",
        width: "100vw",
      }}
    >
      <div className="container">
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
                Copyright 1tok1 2021 © All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
